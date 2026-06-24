import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import {
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice.js"; 
import TryOnModal from "./TryOnModal"; // 👈 Integrated TryOnModal file trigger context here

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // 💡 STATE MANAGER FOR HANDLING THE VITON-HD MODAL TOGGLE
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8030/api/product/${id}`);
      const data = await res.json();

      if (data.success && data.product) {
        const p = data.product;
        setProduct(p);
        const firstImg = p.images?.find((img) => img) || "";
        setMainImage(firstImg);
        setSelectedSize(p.sizes?.[0]?.size || "");
        fetchRelatedProducts(p.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // RELATED PRODUCTS
  const fetchRelatedProducts = async (category) => {
    try {
      const res = await fetch(
        `http://localhost:8030/api/product?category=${category}`
      );
      const data = await res.json();
      if (data.success) {
        setRelatedProducts(data.products || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  //  REDUX ADD TO CART
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: selectedSize,
        quantity: quantity,
      })
    );
    dispatch(openCart());
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT IMAGES */}
        <div className="flex flex-col-reverse md:flex-row gap-4">

          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
            {product.images?.filter(Boolean).map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`border cursor-pointer rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 transition
                ${mainImage === img ? "border-black" : "border-gray-200"}`}
              >
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 bg-[#f8f5f0] rounded-2xl overflow-hidden">
            <img
              src={mainImage || product.images?.[0]}
              alt={product.name}
              className="w-full h-[400px] sm:h-[500px] lg:h-[650px] object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center">

          <p className="uppercase text-sm tracking-[3px] text-[#C19A6B] mb-2">
            {product.category}
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-black">
              Rs {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                Rs {product.oldPrice}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-7 mb-8">
            {product.description}
          </p>

          {product.status !== "normal" && (
            <div className="mb-6">
              <span className="bg-[#C19A6B] text-white px-4 py-2 rounded-md uppercase text-sm tracking-wide">
                {product.status}
              </span>
            </div>
          )}

          {/* SIZES */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item.size)}
                  className={`border px-5 py-2 rounded-md transition font-medium
                  ${
                    selectedSize === item.size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center border w-fit rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
              >
                <AiOutlineMinus />
              </button>
              <span className="w-14 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          {/* ⚡ UPDATED BUTTONS BLOCK CONFIGURATION */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Reduced flex properties slightly to accommodate structured side balance */}
            <button
              onClick={handleAddToCart}
              className="flex-[2] bg-black text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition text-sm font-semibold tracking-wide"
            >
              <AiOutlineShoppingCart className="text-xl" />
              Add To Cart
            </button>

            {/* 👗 REPLACED HEART BUTTON WITH THE AI VIRTUAL TRY-ON CALL ACTION */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-[#C19A6B] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a88255] transition text-sm font-bold tracking-wider uppercase shadow-md shadow-amber-700/10 active:scale-[0.99]"
            >
              👕 Virtual Try-On
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="border-t pt-6 flex flex-col gap-3 text-gray-600 text-sm">
            <p>
              <span className="font-semibold text-black">Style Type:</span>{" "}
              <span className="capitalize">{product.styleType || "Eastern"}</span>
            </p>
            <p>
              <span className="font-semibold text-black">Subcategory:</span>{" "}
              {product.subcategory}
            </p>
            <p>
              <span className="font-semibold text-black">Product Type:</span>{" "}
              {product.productType}
            </p>
            <p>
              <span className="font-semibold text-black">Available Stock:</span>{" "}
              {product.sizes?.reduce((acc, s) => acc + (s.stock || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20">
        <div className="text-center mb-10 relative">
          <p className="text-gray-100 text-5xl sm:text-6xl font-bold absolute left-1/2 -translate-x-1/2 -top-5 hidden sm:block">
            Related
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 relative z-10">
            Related Products
          </h2>
          <div className="w-16 h-[2px] bg-gray-800 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {relatedProducts
            ?.filter((item) => item._id !== product._id)
            ?.slice(0, 4)
            ?.map((item) => (
              <div key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <div className="overflow-hidden bg-[#f7f3ee] rounded-lg">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </div>
                </Link>
                <div className="pt-4">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="text-[15px] font-medium truncate text-gray-800 hover:text-[#C19A6B] transition">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-gray-900">Rs {item.price}</span>
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        Rs {item.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 🔮 LAZMI INJECT IN INTERFACE TREE BOUNDS AT THE BOTTOM LAYER */}
      <TryOnModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </section>
  );
}