import React, { useEffect, useState } from "react";
import { AiOutlineZoomIn, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice.js";

export default function Trending() {
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const dispatch = useDispatch();

  // ============================================
  // FETCH TRENDING PRODUCTS (UPDATED WITH UNIVERSAL QUERY)
  // ============================================
  const fetchTrending = async () => {
    try {
      // 💡 Sub-route (/trending) ki bajaye ab universal filter query parameter use kiya hai
      const res = await fetch("http://localhost:8030/api/product?productType=trending");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchTrending(); }, []);

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    dispatch(addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.images?.[0],
      size: item.sizes?.[0]?.size || "",
      quantity: 1,
    }));
    dispatch(openCart());
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="text-center mb-10 relative">
        <p className="text-gray-100 text-5xl sm:text-6xl font-bold absolute left-1/2 -translate-x-1/2 -top-5 select-none pointer-events-none hidden sm:block">
          Trending
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 relative z-10">
          Trending Products
        </h2>
        <div className="w-16 h-[2px] bg-gray-800 mx-auto mt-2" />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
          {products.map((item) => (
            <div
              key={item._id}
              className="group relative"
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* CARD CLICK → PRODUCT DETAIL */}
              <Link to={`/product/${item._id}`}>
                <div className="relative overflow-hidden bg-[#f7f3ee]">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-[1.05]"
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
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-md transition-all duration-300
                    ${hoveredId === item._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  >
                    {/* QUICK VIEW */}
                    <button className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                      <AiOutlineZoomIn className="text-[18px]" />
                    </button>

                    {/* WISHLIST */}
                    <button className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                      <AiOutlineHeart className="text-[18px]" />
                    </button>

                    {/* CART */}
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="w-[42px] h-[42px] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <AiOutlineShoppingCart className="text-[18px]" />
                    </button>
                  </div>
                </div>
              </Link>

              {/* PRODUCT INFO */}
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
      ) : (
        <p className="text-center text-gray-400 py-16">No trending products found</p>
      )}
    </section>
  );
}