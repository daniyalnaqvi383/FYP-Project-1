import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineZoomIn, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai"; // 👈 Added zoom and heart icons for exact match
import { X, SlidersHorizontal } from "lucide-react"; 
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../redux/cartSlice.js"; 

export default function ProductGrid() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); 
  const [hoveredId, setHoveredId] = useState(null); // 👈 Added hover tracking state for the exact icon animations

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const styleParam = searchParams.get("styleType") || "";
  const subcatParam = searchParams.get("subcategory") || "";
  const typeParam = searchParams.get("productType") || "";

  // ============================================
  // FETCH PRODUCTS MATRIX
  // ============================================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let queryUrl = `http://localhost:8030/api/product?${searchParams.toString()}`;
      const res = await fetch(queryUrl);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error("Matrix compilation lookup crash:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // ============================================
  // FILTER TOGGLE HANDLERS (URL UPDATERS)
  // ============================================
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "") {
      newParams.delete(key); 
    } else {
      newParams.set(key, value);
    }
    if (key === "category") {
      newParams.delete("subcategory");
    }
    setSearchParams(newParams);
  };

  // ============================================
  // DISPATCH TO REDUX CART
  // ============================================
  const handleAddToCart = (e, item) => {
    e.preventDefault();
    dispatch(
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.images?.[0],
        size: item.sizes?.[0]?.size || "M",
        quantity: 1,
      })
    );
    dispatch(openCart());
  };

  // Reusable Filter Element
  const FilterElements = () => (
    <>
      {/* 1. CLOTHING STYLE TYPE FILTER */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-[2px]">
          Product Style
        </h4>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-black transition select-none">
            <input 
              type="radio" 
              name="styleType" 
              checked={styleParam === ""} 
              onChange={() => handleFilterChange("styleType", "")} 
              className="accent-[#C19A6B] w-4 h-4 rounded-full border-gray-300" 
            /> <span className={styleParam === "" ? "font-semibold text-black" : ""}>All Styles</span>
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-black transition select-none">
            <input 
              type="radio" 
              name="styleType" 
              checked={styleParam === "eastern"} 
              onChange={() => handleFilterChange("styleType", "eastern")} 
              className="accent-[#C19A6B] w-4 h-4 rounded-full border-gray-300" 
            /> <span className={styleParam === "eastern" ? "font-semibold text-black" : ""}>Eastern Wear</span>
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-black transition select-none">
            <input 
              type="radio" 
              name="styleType" 
              checked={styleParam === "western"} 
              onChange={() => handleFilterChange("styleType", "western")} 
              className="accent-[#C19A6B] w-4 h-4 rounded-full border-gray-300" 
            /> <span className={styleParam === "western" ? "font-semibold text-black" : ""}>Western Wear</span>
          </label>
        </div>
      </div>

      {/* 2. CATEGORY FILTER */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-[2px]">
          Category
        </h4>
        <div className="flex flex-col gap-3">
          {["", "men", "women", "kids", "accessories"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer capitalize hover:text-black transition select-none">
              <input 
                type="radio" 
                name="category" 
                checked={categoryParam === cat} 
                onChange={() => handleFilterChange("category", cat)} 
                className="accent-[#C19A6B] w-4 h-4 rounded-full border-gray-300" 
              /> <span className={categoryParam === cat ? "font-semibold text-black" : ""}>{cat === "" ? "All Categories" : cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Subcategory Feedback */}
      {subcatParam && (
        <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-4 mt-6">
          <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block mb-1.5">Active Tag Context:</span>
          <span className="text-xs bg-[#C19A6B] text-white px-2.5 py-1 rounded-md capitalize font-semibold shadow-sm inline-block">{subcatParam}</span>
          <button 
            onClick={() => handleFilterChange("subcategory", "")}
            className="text-xs text-red-500 block mt-3 hover:text-red-700 font-bold transition"
          >
            Clear Subcategory Filter
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-10 sm:px-6 lg:px-12 min-h-screen bg-white">
      
      {/* MOBILE FLOATING STICKY BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-black text-white text-xs font-bold tracking-[2px] uppercase px-6 py-3.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md bg-opacity-90 active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={14} className="text-[#C19A6B]" /> Filter & Sort
        </button>
      </div>

      <div className="flex gap-10">
        
        {/* DESKTOP SIDEBAR PANEL */}
        <div className="hidden lg:block w-[240px] shrink-0 border-r border-gray-100 pr-6 sticky top-28 h-fit">
          <FilterElements />
        </div>

        {/* RIGHT VIEWPORT CONTAINER */}
        <div className="flex-1">
          
          <div className="mb-6 flex justify-between items-center text-xs text-gray-400 font-medium tracking-wide uppercase">
            <p>Collection Registry ({products.length} articles found)</p>
            {typeParam && <span className="bg-gray-100 border text-gray-800 px-2 py-0.5 rounded font-bold">{typeParam} view</span>}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-3">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#C19A6B] rounded-full animate-spin"></div>
              <p className="text-gray-400 font-medium text-sm tracking-wider">Synchronizing Display Engine...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
              {products.map((item) => (
                <div 
                  key={item._id} 
                  className="group relative"
                  onMouseEnter={() => setHoveredId(item._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  
                  {/* CARD CLICK → PRODUCT DETAIL */}
                  <Link to={`/product/${item._id}`}>
                    
                    {/* PICTURE MAPPING DISPLAY HOUSING SYSTEM (TRENDING MATCH STYLING) */}
                    <div className="relative overflow-hidden bg-[#f7f3ee]">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-[1.05]"
                      />
                      
                      {/* Vertical Ribbon badge style exact sync */}
                      {item.status && item.status !== "normal" && (
                        <span
                          className="absolute top-0 left-3 bg-[#C19A6B] text-white text-[10px] uppercase font-semibold tracking-[1px] px-[6px] py-[10px] z-10"
                          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                        >
                          {item.status}
                        </span>
                      )}

                      {/* Interactive floating action menu panel block sync */}
                      <div
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-md transition-all duration-300 z-20
                        ${hoveredId === item._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                      >
                        {/* QUICK VIEW */}
                        <button type="button" className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                          <AiOutlineZoomIn className="text-[18px]" />
                        </button>

                        {/* WISHLIST */}
                        <button type="button" className="w-[42px] h-[42px] flex items-center justify-center border-r border-gray-200 hover:bg-black hover:text-white transition-all duration-300">
                          <AiOutlineHeart className="text-[18px]" />
                        </button>

                        {/* CART */}
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-[42px] h-[42px] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                        >
                          <AiOutlineShoppingCart className="text-[18px]" />
                        </button>
                      </div>
                    </div>
                  </Link>

                  {/* CARD TEXT VIEW PORT */}
                  <div className="pt-4">
                    <h3 className="text-[15px] text-gray-800 font-medium mb-1 truncate hover:text-[#C19A6B] transition duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-semibold text-gray-900">
                        Rs {item.price}
                      </span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          Rs {item.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed rounded-2xl bg-gray-50/50 border-gray-200 text-gray-400 font-medium">
              No clothing articles match your requested filters matrix.
            </div>
          )}
        </div>

      </div>

      {/* MOBILE FLOATING DRAWER PANEL SHEET */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end animate-fadeIn" onClick={() => setIsMobileFilterOpen(false)}>
          <div 
            className="bg-white w-full rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto transform transition-transform shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-[#C19A6B]" /> Filter Configuration
              </h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="py-2">
              <FilterElements />
            </div>

            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl mt-4"
            >
              Apply Filter Parameters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}