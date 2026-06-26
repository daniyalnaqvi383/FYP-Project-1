import React, { useEffect, useState } from "react";
import { Menu, X, Search, User, Plus, Minus, ChevronDown, ShoppingBag, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, openCart, closeCart, addToCart } from "../../redux/cartSlice.js"; 
import logo from "../../assets/logo.png"; 
import { FaWhatsapp } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  // USER API
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);
    try {
      const res = await axios.get("http://localhost:8030/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 404) {
        localStorage.removeItem("token");
      }
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    const syncUser = () => fetchUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8030/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log(err);
    }
    localStorage.removeItem("token");
    setUser(null);
    setDropdown(false);
    setIsOpen(false);
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleDecreaseQuantity = (index, currentQty) => {
    if (currentQty <= 1) {
      dispatch(removeFromCart(index));
    } else {
      dispatch({ type: "cart/decreaseQuantity", payload: index });
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        setShowSearch(false); 
        setSearchQuery(""); 
      }
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between h-20 items-center">

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>

          {/* LOGO */}
          <Link to="/" className="flex items-center h-full py-2">
            <img 
              src={logo} 
              alt="TryLo Logo" 
              className="h-25 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-800 relative">

            <Link
              to="/"
              className="relative group transition duration-300 hover:text-[#C19A6B]"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#C19A6B] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* MEN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#C19A6B] transition">
                Men
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute top-10 left-0 w-64 bg-white shadow-2xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <div className="mb-5">
                  <h3 className="font-bold text-gray-900 mb-3 uppercase text-sm tracking-wider">
                    Eastern
                  </h3>
                  <Link to="/shop?category=men&styleType=eastern&subcategory=kurta" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Men Kurta
                  </Link>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 uppercase text-sm tracking-wider">
                    Western
                  </h3>
                  <Link to="/shop?category=men&styleType=western&subcategory=polo" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Men Polo
                  </Link>
                  <Link to="/shop?category=men&styleType=western&subcategory=shirt" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Men Shirt
                  </Link>
                  <Link to="/shop?category=men&styleType=western&subcategory=jeans" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Men Jeans
                  </Link>
                </div>
              </div>
            </div>

            {/* WOMEN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#C19A6B] transition">
                Women
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute top-10 left-0 w-64 bg-white shadow-2xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <div className="mb-5">
                  <h3 className="font-bold text-gray-900 mb-3 uppercase text-sm tracking-wider">
                    Eastern
                  </h3>
                  <Link to="/shop?category=women&styleType=eastern&subcategory=suit" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Women Suit
                  </Link>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 uppercase text-sm tracking-wider">
                    Western
                  </h3>
                  <Link to="/shop?category=women&styleType=western&subcategory=polo" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Women Polo
                  </Link>
                  <Link to="/shop?category=women&styleType=western&subcategory=shirt" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                    Women Shirt
                  </Link>
                </div>
              </div>
            </div>

            {/* KIDS */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#C19A6B] transition">
                Kids
                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute top-10 left-0 w-56 bg-white shadow-2xl rounded-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <Link to="/shop?category=kids&subcategory=boys" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                  Boys Collection
                </Link>
                <Link to="/shop?category=kids&subcategory=girls" className="block py-2 text-gray-600 hover:text-[#C19A6B]">
                  Girls Collection
                </Link>
              </div>
            </div>

            {/* SALE */}
            <Link to="/shop?productType=trending" className="text-red-500 font-semibold hover:text-red-600 transition">
              Sales
            </Link>

            {/* RETURN */}
            <Link to="/returnexchange" className="hover:text-[#C19A6B] transition">
              Return & Exchange
            </Link>

            {/* ⚡ DESKTOP LINK BUTTON: TRY ON CLOTH */}
            <Link to="/virtual-room" className="hover:text-[#C19A6B] transition font-bold text-[#C19A6B]">
              Try On Cloth
            </Link>

          </div>

          {/* ICONS */}
          <div className="flex items-center space-x-3 md:space-x-5">

            {/* SEARCH CONTAINER (Stays visible on top for both mobile & desktop) */}
            <div className="relative">
              <button onClick={() => setShowSearch(!showSearch)} className="flex items-center justify-center p-1">
                <Search size={22} />
              </button>
              {showSearch && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit} 
                  className="absolute top-12 right-0 border border-gray-200 px-4 py-2 rounded-full w-48 sm:w-64 bg-white text-sm text-black focus:outline-none focus:ring-1 focus:ring-[#C19A6B] placeholder-gray-400 shadow-lg"
                  placeholder="Search products..."
                  autoFocus
                />
              )}
            </div>

            {/* USER PORTAL DESKTOP ONLY */}
            <div className="hidden md:block">
              {!user ? (
                <Link to="/signup"><User size={22} /></Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="w-8 h-8 bg-gray-800 text-white rounded-full"
                  >
                    {user.name?.charAt(0)}
                  </button>
                  {dropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl p-2 z-50">
                      <p className="px-2 text-sm">{user.name}</p>
                      <button onClick={handleLogout} className="text-[#C19A6B] px-2 py-2">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CART ICON */}
            <button className="relative" onClick={() => dispatch(openCart())}>
              <ShoppingBag size={22} />
              <span className="absolute -top-1 -right-1 bg-[#C19A6B] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
              </span>
            </button>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/923484236919?text=Hi%20I%20want%20to%20know%20more%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: '15px', color: '#25D366', fontSize: '30px' }}
              className="flex items-center"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* CART SIDEBAR (SCROLLABLE AREA) */}
      <div
        className={`fixed inset-0 z-[100] ${isCartOpen ? "bg-black/50" : "hidden"}`}
        onClick={() => dispatch(closeCart())}
      >
        <div
          className={`fixed right-0 top-0 h-full w-[360px] bg-white flex flex-col transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h1 className="text-lg font-medium tracking-wide uppercase text-gray-800">Cart</h1>
            <button className="text-gray-400 hover:text-black transition" onClick={() => dispatch(closeCart())}>
              <X size={20} />
            </button>
          </div>

          <div className="p-5 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center mt-8 text-sm">Your cart is currently empty.</p>
            ) : (
              cartItems.map((item, index) => {
                const itemQty = item.quantity || 1;
                return (
                  <div key={index} className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <img src={item.image} className="w-20 h-24 object-cover bg-gray-50" alt={item.name} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-normal text-gray-800 tracking-tight leading-tight pr-4">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">Size: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 h-7 rounded bg-white">
                          <button 
                            onClick={() => handleDecreaseQuantity(index, itemQty)}
                            className="px-2 text-gray-400 hover:text-black transition flex items-center justify-center h-full border-r border-gray-100"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-normal w-7 text-center select-none text-gray-800">
                            {itemQty}
                          </span>
                          <button 
                            onClick={() => handleIncreaseQuantity(item)}
                            className="px-2 text-gray-400 hover:text-black transition flex items-center justify-center h-full border-l border-gray-100"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          Rs.{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="w-full p-5 border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            {cartItems.length > 0 && (
              <div className="flex justify-between mb-5 font-medium text-xs uppercase tracking-wider text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-800 font-semibold text-sm">Rs.{totalAmount.toFixed(0)}</span>
              </div>
            )}
            <Link to="/Checkout" onClick={() => dispatch(closeCart())}>
              <button className="w-full bg-black text-white py-3.5 font-medium tracking-widest text-xs uppercase transition duration-300 hover:bg-opacity-90">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 📥 RESPONSIVE MOBILE MENU DRAWER (WHITE BACKGROUND) */}
      <div
        className={`fixed inset-0 bg-black/50 md:hidden ${isOpen ? "visible" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`bg-white w-[280px] h-full p-5 flex flex-col justify-between transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 overflow-y-auto flex-1">
            <div className="flex justify-between mb-5 items-center">
              <h2 className="font-bold text-black uppercase tracking-wider text-sm">Menu</h2>
              <X onClick={() => setIsOpen(false)} className="text-black cursor-pointer" />
            </div>

            {/* 👤 RESPONSIVE USER PORTAL ACCENT INSIDE MOBILE DRAWER */}
            <div className="border-b border-gray-100 pb-4 mb-2">
              {user ? (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 text-white font-bold rounded-full flex items-center justify-center text-xs">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="text-red-500 text-xs font-semibold hover:underline">
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-800 hover:text-[#C19A6B]"
                >
                  <User size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Login / Register</span>
                </Link>
              )}
            </div>

            {/* LINK MATRIX */}
            <div className="flex flex-col gap-4 text-black font-medium">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

              {/* ⚡ MOBILE BUTTON: TRY ON CLOTH */}
              <Link to="/virtual-room" onClick={() => setIsOpen(false)} className="font-bold text-[#C19A6B]">
                Try On Cloth
              </Link>

              {/* MEN */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "men" ? "" : "men")}
                  className="flex items-center justify-between w-full font-medium"
                >
                  Men
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdown === "men" ? "rotate-180" : ""}`} />
                </button>

                {mobileDropdown === "men" && (
                  <div className="pl-3 mt-2 flex flex-col gap-2 text-sm text-gray-600">
                    <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Eastern</p>
                    <Link to="/shop?category=men&styleType=eastern&subcategory=kurta" onClick={() => setIsOpen(false)}>Kurta</Link>

                    <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider mt-2">Western</p>
                    <Link to="/shop?category=men&styleType=western&subcategory=polo" onClick={() => setIsOpen(false)}>Polo</Link>
                    <Link to="/shop?category=men&styleType=western&subcategory=shirt" onClick={() => setIsOpen(false)}>Shirt</Link>
                    <Link to="/shop?category=men&styleType=western&subcategory=jeans" onClick={() => setIsOpen(false)}>Jeans</Link>
                  </div>
                )}
              </div>

              {/* WOMEN */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "women" ? "" : "women")}
                  className="flex items-center justify-between w-full font-medium"
                >
                  Women
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdown === "women" ? "rotate-180" : ""}`} />
                </button>

                {mobileDropdown === "women" && (
                  <div className="pl-3 mt-2 flex flex-col gap-2 text-sm text-gray-600">
                    <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Eastern</p>
                    <Link to="/shop?category=women&styleType=eastern&subcategory=suit" onClick={() => setIsOpen(false)}>Suit</Link>

                    <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider mt-2">Western</p>
                    <Link to="/shop?category=women&styleType=western&subcategory=polo" onClick={() => setIsOpen(false)}>Polo</Link>
                    <Link to="/shop?category=women&styleType=western&subcategory=shirt" onClick={() => setIsOpen(false)}>Shirt</Link>
                  </div>
                )}
              </div>

              {/* KIDS */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === "kids" ? "" : "kids")}
                  className="flex items-center justify-between w-full font-medium"
                >
                  Kids
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdown === "kids" ? "rotate-180" : ""}`} />
                </button>

                {mobileDropdown === "kids" && (
                  <div className="pl-3 mt-2 flex flex-col gap-2 text-sm text-gray-600">
                    <Link to="/shop?category=kids&subcategory=boys" onClick={() => setIsOpen(false)}>Boys Collection</Link>
                    <Link to="/shop?category=kids&subcategory=girls" onClick={() => setIsOpen(false)}>Girls Collection</Link>
                  </div>
                )}
              </div>

              <Link to="/shop?productType=trending" onClick={() => setIsOpen(false)} className="text-red-500 font-semibold">
                Sale
              </Link>

              
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;