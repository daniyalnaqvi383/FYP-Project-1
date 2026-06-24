import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, MapPin, CreditCard, ShoppingBag, ArrowRight, ShieldAlert } from "lucide-react"; // 👈 FIXED: Imported ShieldAlert here to resolve compile/crash layout error

function OrderConfirmation() {
  const location = useLocation();
  // Checkout page se forwarded data read karna safely
  const orderData = location.state?.order;

  // Fallback state control check agar user direct access karne ki koshish kare
  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-600 font-sans p-4">
        <ShieldAlert size={40} className="text-amber-500 mb-2" />
        <h2 className="font-bold text-lg text-gray-900">No active transaction summary found</h2>
        <Link to="/" className="text-xs text-[#1e2d4a] underline mt-4 font-semibold uppercase tracking-widest">
          Return to catalog homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 font-sans antialiased py-10 lg:py-16">
      <div className="max-w-[780px] mx-auto px-4">
        
        {/* HEADER BLOCK NOTIFICATION SUCCESS BRAND */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center justify-center text-emerald-600 bg-emerald-50 p-3 rounded-full mb-2 shadow-sm border border-emerald-100">
            <CheckCircle size={36} />
          </div>
          <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Order Authenticated</p>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Your tracking lifecycle sequence has been activated. A stylized invoice receipt dashboard has been compiled.
          </p>
          
          {/* MASTER DATABASE TRANSACTION TRACK ID */}
          <div className="inline-block bg-[#1e2d4a] text-white text-xs font-mono font-bold px-4 py-2 rounded-md shadow-md tracking-wider mt-2">
            REFERENCE MASTER ID: #{orderData._id.toString().toUpperCase()}
          </div>
        </div>

        {/* TWO-COLUMN LOWER BILL DETAILS WRAPPER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT INNER COMPONENT BLOCK: LOGISTICS METRICS */}
          <div className="md:col-span-7 bg-white rounded-xl border border-gray-200 p-5 space-y-6 shadow-sm">
            
            {/* User Info & Sizing Parameters Display */}
            <div className="space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wide text-[10px] text-gray-400">
                Logistics Customer Profile
              </h3>
              <p className="font-bold text-gray-900 text-sm">
                {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
              </p>
              <p className="text-gray-500 font-mono">{orderData.customerInfo.email}</p>
              <p className="text-gray-700 font-medium">{orderData.customerInfo.phone}</p>
            </div>

            {/* Complete Targeted Shipping Destinations */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wide text-[10px] text-gray-400 flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-400" /> Shipping Destination Address
              </span>
              <p className="text-gray-700 leading-relaxed font-medium">
                {orderData.customerInfo.address}, {orderData.customerInfo.city} ({orderData.customerInfo.postalCode})
              </p>
            </div>

            {/* Targeted Dynamic Billing Blocks Layout Context Match */}
            {orderData.billingAddress && (
              <div className="pt-4 space-y-2 text-xs bg-gray-50/50 p-3 rounded-lg border border-dashed border-gray-200">
                <span className="font-bold uppercase tracking-wide text-[10px] text-gray-400">
                  Billing Reconciliation Registry
                </span>
                <p className="font-semibold text-gray-900">
                  {orderData.billingAddress.firstName} {orderData.billingAddress.lastName}
                </p>
                <p className="text-gray-600 leading-tight">
                  {orderData.billingAddress.address}, {orderData.billingAddress.city} ({orderData.billingAddress.postalCode})
                </p>
              </div>
            )}

            {/* Gate Transaction Pipeline Methods */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-semibold uppercase tracking-wide text-[10px] flex items-center gap-1.5">
                <CreditCard size={12} /> Payment Pipeline
              </span>
              <span className="font-bold text-gray-800 text-[11px] bg-gray-100 border px-2 py-0.5 rounded">
                {orderData.paymentMethod}
              </span>
            </div>

          </div>

          {/* RIGHT INNER COMPONENT BLOCK: CHECKOUT ITEMS METRICS */}
          <div className="md:col-span-5 bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
            <h3 className="font-bold uppercase tracking-wide text-[10px] text-gray-400 flex items-center gap-1.5">
              <ShoppingBag size={12} /> Package Items ({orderData.items.length})
            </h3>
            
            {/* Products Data Lists Submap Rendering Loop */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs border-b border-gray-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="relative shrink-0 select-none">
                    <img src={item.image} className="w-10 h-13 object-cover rounded bg-gray-50 border border-gray-200 shadow-sm" alt="" />
                    <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 leading-tight tracking-tight truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">Size: {item.size}</p>
                  </div>
                  <span className="font-semibold text-gray-800 shrink-0">
                    Rs. {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Gross Summary Valuation Invoicing Layout */}
            <div className="border-t border-gray-200 pt-3 text-xs space-y-1.5 text-gray-600 font-medium">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-gray-900">Rs. {orderData.totalAmount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Operations</span>
                <span className="text-emerald-600 text-[10px] font-bold tracking-wider uppercase">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100 items-baseline">
                <span>Gross Paid Bill</span>
                <span className="text-base font-black text-[#1e2d4a]">
                  Rs. {orderData.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BACK TO SHOP REDIRECT CATALYST CTA */}
        <div className="text-center mt-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-[#1e2d4a] text-white px-6 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase shadow hover:bg-opacity-95 transition"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;