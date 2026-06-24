import React, { useEffect, useRef, useState } from "react";
import { AiOutlineZoomIn, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice.js"; // apna path adjust karo
import { Link } from "react-router-dom";

function Feature() {
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  // ============================================
  // FETCH FEATURED PRODUCTS (UPDATED WITH UNIVERSAL QUERY)
  // ============================================
  const fetchFeatured = async () => {
    try {
      // 💡 Sub-route (/featured) ki bajaye ab universal filter query parameter use kiya hai
      const res = await fetch("http://localhost:8030/api/product?productType=featured");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchFeatured(); }, []);

  const slideLeft = () => sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const slideRight = () => sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.images?.[0],
      size: item.sizes?.[0]?.size || "",
      quantity: 1,
    }));
    dispatch(openCart()); // auto open
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-16 bg-white overflow-hidden">
      <div className="text-center mb-10 relative">
        <p className="text-gray-100 text-5xl sm:text-6xl font-bold absolute left-1/2 -translate-x-1/2 -top-5 select-none pointer-events-none hidden sm:block">
          Featured
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 relative z-10">
          Featured Products
        </h2>
        <div className="w-16 h-[2px] bg-gray-800 mx-auto mt-2" />
      </div>

      {products.length > 0 ? (
        <div className="relative">
          <button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition duration-300"
          >
            <AiOutlineLeft className="text-[18px]" />
          </button>
          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition duration-300"
          >
            <AiOutlineRight className="text-[18px]" />
          </button>

          <div ref={sliderRef} className="flex gap-6 overflow-x-auto scroll-smooth scroll-smooth check scrollbar-hide px-12">
            {products.map((item) => (
              <div
                key={item._id}
                className="group relative min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0"
                onMouseEnter={() => setHoveredId(item._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link to={`/product/${item._id}`}>
                <div className="relative overflow-hidden bg-[#f7f3ee] rounded-md">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-[380px] object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  {item.status && item.status !== "normal" && (
                    <span
                      className="absolute top-0 left-3 bg-[#C19A6B] text-white text-[10px] uppercase font-semibold tracking-[1px] px-[6px] py-[10px]"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {item.status}
                    </span>
                  )}
                  <div
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-lg transition-all duration-300
                    ${hoveredId === item._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  >
                    <button className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                      <AiOutlineZoomIn className="text-[18px]" />
                    </button>
                    <button className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                      <AiOutlineHeart className="text-[18px]" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-[42px] h-[42px] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <AiOutlineShoppingCart className="text-[18px]" />
                    </button>
                  </div>
                </div>
                </Link>
                <div className="pt-4">
                  <h3 className="text-[15px] text-gray-800 font-medium mb-1 truncate hover:text-[#C19A6B] transition">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-gray-900">Rs {item.price}</span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">Rs {item.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-16">No featured products found</p>
      )}
    </section>
  );
}

export default Feature;