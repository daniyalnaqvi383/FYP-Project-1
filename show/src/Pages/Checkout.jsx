import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/cartSlice.js"; 
// Toastify Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("payfast");
  const [billingAddress, setBillingAddress] = useState("same");
  const [discountCode, setDiscountCode] = useState("");
  
  // Shipping Address Form State
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    emailOffers: true,
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  // Different Billing Address Form State
  const [billingFormData, setBillingFormData] = useState({
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  const shippingCost = 0; 
  const totalAmount = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is currently empty!", { position: "top-right" });
      return;
    }

    let dynamicPaymentLabel = "";
    if (paymentMethod === "cod") {
      dynamicPaymentLabel = "Cash on Delivery (COD)";
      toast.info("Processing Order... Registering COD Request.", { position: "top-right", autoClose: 2000 });
    } else {
      dynamicPaymentLabel = "Visa / Debit Card (PayFast Authorized)";
      toast.info("Connecting to Secure Payment Server...", { position: "top-right", autoClose: 2000 });
    }

    const finalBillingAddress = billingAddress === "same" 
      ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode || "54000",
          phone: formData.phone,
        }
      : {
          firstName: billingFormData.firstName,
          lastName: billingFormData.lastName,
          address: billingFormData.address,
          city: billingFormData.city,
          postalCode: billingFormData.postalCode || "54000",
          phone: billingFormData.phone,
        };

    const orderPayload = {
      customerInfo: {
        email: formData.emailOrPhone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode || "54000",
        phone: formData.phone,
      },
      billingAddress: finalBillingAddress, 
      items: cartItems.map((item) => ({
        productId: item._id, 
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        size: item.size || "M", // 👈 Synced payload execution parameters safely
        image: item.image,
      })),
      totalAmount: totalAmount,
      paymentMethod: dynamicPaymentLabel,
    };

    try {
      const response = await axios.post("http://localhost:8030/api/orders/create", orderPayload);

      if (response.data.success) {
        if (paymentMethod === "cod") {
          toast.success("🎉 Order successfully placed via COD!", { position: "top-right" });
        } else {
          toast.success("💳 Transaction Authorized! Order successfully placed.", { position: "top-right" });
        }
        
        const savedOrderDetails = response.data.order; 

        setTimeout(() => {
          dispatch(clearCart()); 
          navigate("/order-confirmation", { state: { order: savedOrderDetails } }); 
        }, 2000);
      }
    } catch (error) {
      console.error("CHECKOUT SUBMIT ERROR =>", error);
      toast.error(error.response?.data?.message || "Gateway Timeout. Please try again.", { position: "top-right" });
    } 
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
      
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* LEFT COLUMN: CUSTOMER INPUT INFO */}
        <div className="col-span-1 lg:col-span-7 px-4 sm:px-8 lg:px-14 py-8 lg:py-12 lg:border-r border-gray-200">
          
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold tracking-widest text-[#1e2d4a] uppercase select-none">
              FITTED
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. CONTACT SECTION */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h2 className="text-base font-medium text-gray-900 tracking-tight">Contact</h2>
                <button type="button" className="text-xs text-gray-500 underline hover:text-black">
                  Sign in
                </button>
              </div>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Email or mobile phone number"
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                required
              />
              <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="emailOffers"
                  checked={formData.emailOffers}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 accent-black w-4 h-4 cursor-pointer"
                />
                Email me with news and offers
              </label>
            </div>

            {/* 2. DELIVERY/SHIPPING ADDRESS SECTION */}
            <div className="space-y-3">
              <h2 className="text-base font-medium text-gray-900 tracking-tight">Delivery</h2>
              
              <div className="relative border border-gray-300 rounded bg-white px-3 pt-4 pb-1 focus-within:ring-1 focus-within:ring-black focus-within:border-black">
                <label className="absolute top-1 left-3 text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                  Country/Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-sm focus:outline-none text-gray-800 appearance-none pt-0.5 cursor-pointer"
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="International">International</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name (optional)"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                  required
                />
              </div>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal code (optional)"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm placeholder-gray-400 pr-10"
                  required
                />
                <HelpCircle size={15} className="absolute right-3 top-3 text-gray-400 cursor-help" />
              </div>

              <label className="flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 accent-black w-4 h-4 cursor-pointer"
                />
                Save this information for next time
              </label>
            </div>

            {/* 3. SHIPPING METHOD DISPLAY SECTION */}
            <div className="space-y-2">
              <h2 className="text-base font-medium text-gray-900 tracking-tight">Shipping method</h2>
              <div className="w-full px-4 py-3.5 border border-black rounded bg-gray-50/50 flex justify-between items-center text-xs font-medium">
                <span className="text-gray-800">Free Delivery</span>
                <span className="text-gray-900 font-semibold tracking-wider text-[11px]">FREE</span>
              </div>
            </div>

            {/* 4. PAYMENT SYSTEMS GATEWAY */}
            <div className="space-y-2">
              <div>
                <h2 className="text-base font-medium text-gray-900 tracking-tight">Payment</h2>
                <p className="text-xs text-gray-400 mt-0.5">All transactions are secure and encrypted.</p>
              </div>

              <div className="border border-gray-300 rounded overflow-hidden bg-white">
                <div 
                  className={`p-3.5 flex justify-between items-center cursor-pointer border-b border-gray-200 transition-colors ${paymentMethod === "payfast" ? "bg-gray-50/80" : "bg-white"}`}
                  onClick={() => setPaymentMethod("payfast")}
                >
                  <label className="flex items-center gap-3 text-xs font-medium text-gray-700 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="paymentMethodGroup"
                      checked={paymentMethod === "payfast"}
                      onChange={() => setPaymentMethod("payfast")}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    PAYFAST(Pay via Debit/Credit/Wallet/Bank Account)
                  </label>
                  <div className="flex gap-1 shrink-0 text-[8px] font-bold text-white scale-90 select-none">
                    <span className="bg-blue-600 px-1 py-0.5 rounded shadow-sm">VISA</span>
                    <span className="bg-red-500 px-1 py-0.5 rounded shadow-sm">MC</span>
                    <span className="bg-emerald-600 px-1 py-0.5 rounded shadow-sm">UP</span>
                  </div>
                </div>

                {paymentMethod === "payfast" && (
                  <div className="p-5 bg-gray-50 text-center text-xs text-gray-500 border-b border-gray-200 leading-relaxed">
                    You'll be redirected to PAYFAST(Pay via Debit/Credit/Wallet/Bank Account) to complete your purchase.
                  </div>
                )}

                <div 
                  className={`p-3.5 flex justify-between items-center cursor-pointer border-b border-gray-200 transition-colors ${paymentMethod === "baadmay" ? "bg-gray-50/80" : "bg-white"}`}
                  onClick={() => setPaymentMethod("baadmay")}
                >
                  <label className="flex items-center gap-3 text-xs font-medium text-gray-700 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="paymentMethodGroup"
                      checked={paymentMethod === "baadmay"}
                      onChange={() => setPaymentMethod("baadmay")}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    BaadMay | Buy Now. Pay Later
                  </label>
                  <div className="flex gap-1 shrink-0 text-[8px] font-bold text-white scale-90 select-none">
                    <span className="bg-blue-500 px-1 py-0.5 rounded shadow-sm">VISA</span>
                    <span className="bg-red-400 px-1 py-0.5 rounded shadow-sm">MC</span>
                  </div>
                </div>

                <div 
                  className={`p-3.5 flex items-center cursor-pointer transition-colors ${paymentMethod === "cod" ? "bg-gray-50/80" : "bg-white"}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <label className="flex items-center gap-3 text-xs font-medium text-gray-700 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="paymentMethodGroup"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
            </div>

            {/* 5. BILLING ADDRESS REPLICATE AREA */}
            <div className="space-y-2">
              <h2 className="text-base font-medium text-gray-900 tracking-tight">Billing address</h2>
              <div className="border border-gray-300 rounded overflow-hidden bg-white">
                
                <div 
                  className={`p-3.5 flex items-center border-b border-gray-200 cursor-pointer transition-colors ${billingAddress === "same" ? "bg-gray-50/80" : "bg-white"}`}
                  onClick={() => setBillingAddress("same")}
                >
                  <label className="flex items-center gap-3 text-xs font-medium text-gray-700 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="billingAddressGroup"
                      checked={billingAddress === "same"}
                      onChange={() => setBillingAddress("same")}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Same as shipping address
                  </label>
                </div>

                <div 
                  className={`p-3.5 flex items-center cursor-pointer transition-colors ${billingAddress === "different" ? "bg-gray-50/80" : "bg-white"}`}
                  onClick={() => setBillingAddress("different")}
                >
                  <label className="flex items-center gap-3 text-xs font-medium text-gray-700 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="billingAddressGroup"
                      checked={billingAddress === "different"}
                      onChange={() => setBillingAddress("different")}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    Use a different billing address
                  </label>
                </div>

                {billingAddress === "different" && (
                  <div className="p-4 bg-gray-50/50 border-t border-gray-200 space-y-3 animate-fadeIn">
                    <div className="relative border border-gray-300 rounded bg-white px-3 pt-4 pb-1">
                      <label className="absolute top-1 left-3 text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                        Country/Region
                      </label>
                      <select
                        name="country"
                        value={billingFormData.country}
                        onChange={handleBillingInputChange}
                        className="w-full bg-transparent text-sm focus:outline-none text-gray-800 appearance-none pt-0.5 cursor-pointer"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="International">International</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        value={billingFormData.firstName}
                        onChange={handleBillingInputChange}
                        placeholder="First name (optional)"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 bg-white"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={billingFormData.lastName}
                        onChange={handleBillingInputChange}
                        placeholder="Last name"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 bg-white"
                        required={billingAddress === "different"}
                      />
                    </div>

                    <input
                      type="text"
                      name="address"
                      value={billingFormData.address}
                      onChange={handleBillingInputChange}
                      placeholder="Address"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 bg-white"
                      required={billingAddress === "different"}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="city"
                        value={billingFormData.city}
                        onChange={handleBillingInputChange}
                        placeholder="City"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 bg-white"
                        required={billingAddress === "different"}
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={billingFormData.postalCode}
                        onChange={handleBillingInputChange}
                        placeholder="Postal code (optional)"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 bg-white"
                      />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={billingFormData.phone}
                        onChange={handleBillingInputChange}
                        placeholder="Phone (optional)"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none text-sm placeholder-gray-400 pr-10 bg-white"
                      />
                      <HelpCircle size={15} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* MAIN TRANSACTION CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1e2d4a] text-white py-4 font-semibold tracking-widest text-xs uppercase rounded transition duration-300 hover:bg-opacity-95 shadow"
              >
                Pay now
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: STICKY ORDER METRICS */}
        <div className="col-span-1 lg:col-span-5 px-4 sm:px-8 lg:px-10 py-8 lg:py-12 bg-gray-50/60 border-t lg:border-t-0 border-gray-200">
          <div className="sticky top-8 space-y-5">
            
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-xs font-medium">
                  <div className="relative shrink-0 select-none pt-1.5 pr-1.5">
                    <img src={item.image} className="w-16 h-20 object-cover rounded-md border border-gray-200 bg-white" alt="" />
                    <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-black/80 text-white font-semibold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm z-10">
                      {item.quantity || 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 font-normal tracking-tight text-xs leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">{item.size || "M"}</p>
                  </div>

                  <span className="text-gray-700 font-medium shrink-0">
                    Rs {(parseFloat(item.price) * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 border-t border-gray-200 pt-4">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded focus:outline-none bg-white text-xs placeholder-gray-400"
              />
              <button type="button" className="px-4 bg-gray-100 text-gray-400 text-xs font-medium rounded border border-gray-200">Apply</button>
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4 text-xs font-medium text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900">Rs {subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-gray-900 text-[10px] font-semibold tracking-wider">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-gray-200 pt-4">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-[9px] text-gray-400 mr-2 font-semibold uppercase tracking-wider">PKR</span>
                <span className="text-lg font-bold text-gray-900 tracking-tight">Rs {totalAmount.toLocaleString()}.00</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;