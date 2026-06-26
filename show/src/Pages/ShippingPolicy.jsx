import React from 'react';
import { Truck, MapPin, CheckCircle, AlertCircle, Clock, Globe } from 'lucide-react';

function ShippingPolicy() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-neutral-900 w-full overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <div className="bg-white border-b border-neutral-100 py-16 sm:py-24 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-950 uppercase">
          Shipping & Delivery
        </h1>
        <p className="mt-6 text-sm sm:text-base text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
          We partner with reliable courier services to ensure your orders reach you quickly, safely, and in perfect condition.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        
        {/* 2. LOGISTICS METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Clock, title: "Delivery Time", desc: "Local orders arrive in 2-3 days, national orders take 3-5 working days." },
            { icon: Truck, title: "Free Shipping", desc: "Enjoy free standard shipping on all orders over PKR 3,000." },
            { icon: MapPin, title: "Real-time Tracking", desc: "Once dispatched, you will receive a tracking link via email or SMS." }
          ].map((item, idx) => (
            <div key={idx} className="border border-neutral-100 bg-white p-8 hover:border-[#C19A6B] transition-all shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 text-[#C19A6B] mb-6 rounded-full">
                <item.icon size={22} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-xs text-neutral-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3. POLICY DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-8 border-l-2 border-[#C19A6B] pl-4">Order Processing</h2>
              <ul className="space-y-4 text-sm text-neutral-600 font-light list-none">
                <li className="flex gap-3"><span>•</span> Orders placed before 2:00 PM are dispatched on the same day.</li>
                <li className="flex gap-3"><span>•</span> Sunday and public holiday orders are processed the next working day.</li>
                <li className="flex gap-3"><span>•</span> During big sales, please allow an extra 24-48 hours for processing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-8 border-l-2 border-[#C19A6B] pl-4">Payment & Delivery Rules</h2>
              <ul className="space-y-4 text-sm text-neutral-600 font-light list-none">
                <li className="flex gap-3"><span>•</span> <b>Cash on Delivery (COD):</b> Available nationwide. Payment must be made at the time of delivery.</li>
                <li className="flex gap-3"><span>•</span> <b>Prepaid Orders:</b> Securely processed through our trusted payment gateways.</li>
                <li className="flex gap-3"><span>•</span> <b>Failed Deliveries:</b> Couriers attempt delivery twice; after that, the package returns to us.</li>
              </ul>
            </div>
          </div>

          {/* SECURITY SIDEBAR */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-8 rounded-sm space-y-8 sticky top-28">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-[#C19A6B]" size={24} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Delivery Safety</h3>
            </div>
            
            <div className="space-y-6 text-xs font-light text-neutral-300">
              <div className="flex gap-4">
                <CheckCircle size={16} className="text-[#C19A6B] shrink-0" />
                <p>We use moisture-resistant packaging to keep your clothes safe during transit.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle size={16} className="text-[#C19A6B] shrink-0" />
                <p>Please do not accept the package if the security tape appears tampered with.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle size={16} className="text-[#C19A6B] shrink-0" />
                <p>Ensure your contact details are accurate to avoid delivery delays.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
                <Globe size={14} /> National Shipping Network
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;