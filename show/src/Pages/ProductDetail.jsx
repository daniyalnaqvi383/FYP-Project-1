import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import {
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { Sparkles } from "lucide-react"; 
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice.js"; 
import TryOnModal from "./TryOnModal"; 

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8030/api/product/${id}`);
      const data = await res.json();
      if (data.success && data.product) {
        const p = data.product;
        setProduct(p);
        setMainImage(p.images?.[0] || "");
        setSelectedSize(p.sizes?.[0]?.size || "");
        fetchRelatedProducts(p.category);
      }
    } catch (error) { console.log(error); }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await fetch(`http://localhost:8030/api/product?category=${category}`);
      const data = await res.json();
      if (data.success) setRelatedProducts(data.products || []);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      size: selectedSize,
      quantity: quantity,
    }));
    dispatch(openCart());
  };

  if (!product) return <div className="h-screen flex items-center justify-center bg-white">Loading...</div>;

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-16">
      
      {/* 🎯 RESPONSIVE GRID SYSTEM */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* 🅰️ LEFT: GALLERY (Desktop 7, Mobile 12) */}
        <div className="w-full lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-28">
          <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 pb-2 md:pb-0 shrink-0 custom-scrollbar">
            {product.images?.filter(Boolean).map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`border cursor-pointer rounded-lg overflow-hidden w-16 h-16 sm:w-20 sm:h-20 shrink-0 transition-all ${mainImage === img ? "border-black shadow-sm scale-95" : "border-gray-200"}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-[#f8f5f0] rounded-2xl overflow-hidden w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px]">
            <img src={mainImage || product.images?.[0]} alt={product.name} className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* 🅱️ RIGHT: CONTENT (Desktop 5, Mobile 12) */}
        <div className="w-full lg:col-span-5 flex flex-col">
          <p className="uppercase text-xs tracking-[3px] text-[#C19A6B] mb-2 font-medium">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">Rs {product.price}</span>
            {product.oldPrice && <span className="text-lg text-gray-400 line-through">Rs {product.oldPrice}</span>}
          </div>
          <p className="text-gray-600 leading-7 mb-8">{product.description}</p>
          
          {/* SIZES */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((item, index) => (
                <button key={index} onClick={() => setSelectedSize(item.size)} className={`border px-6 py-2 rounded-md ${selectedSize === item.size ? "bg-black text-white" : "bg-white"}`}>
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center border w-fit rounded-md overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"><AiOutlineMinus /></button>
              <span className="w-14 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"><AiOutlinePlus /></button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button onClick={handleAddToCart} className="flex-[2] bg-black text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              <AiOutlineShoppingCart className="text-xl" /> Add To Cart
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-[#C19A6B] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#a88255] transition font-bold uppercase">
              <Sparkles size={16} /> Try On Cloth
            </button>
          </div>

          {/* DETAILS */}
          <div className="border-t pt-6 text-sm text-gray-600 space-y-2">
            <p><strong>Style:</strong> {product.styleType || "Eastern"}</p>
            <p><strong>Category:</strong> {product.subcategory}</p>
            <p><strong>Stock:</strong> {product.sizes?.reduce((a, s) => a + (s.stock || 0), 0)} Units</p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20 border-t pt-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Related Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts?.filter(i => i._id !== product._id).slice(0, 4).map(item => (
            <div key={item._id}>
              <Link to={`/product/${item._id}`}>
                <div className="bg-[#f7f3ee] rounded-lg overflow-hidden aspect-[3/4]">
                  <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
              </Link>
              <h3 className="text-sm font-medium mt-3 truncate">{item.name}</h3>
              <p className="font-bold">Rs {item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <TryOnModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </section>
  );
}