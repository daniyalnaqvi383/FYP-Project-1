import React from 'react';
import { Truck, Navigation, CheckCircle, ShieldAlert, Clock, Globe } from 'lucide-react';

function ShippingPolicy() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800 w-full overflow-x-hidden">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Shipping & Delivery Policy
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          At **TryLo**, we partner with premium logistics networks to ensure your premium wardrobe staples 
          reach your doorstep swiftly, safely, and in pristine condition.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        
        {/* 2. CORE LOGISTICS METRICS (GRID SYSTEM) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#C19A6B] mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Delivery Timelines</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              * **Local Deliveries:** 2 to 3 working days.
              * **National Shipments:** 3 to 5 working days across Pakistan.
            </p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <Truck size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Shipping Tariffs</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              We provide **Free Standard Shipping** on all orders above **PKR 3,000**. For orders below this threshold, a flat rate applies.
            </p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Navigation size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Real-Time Tracking</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              As soon as your shipment is dispatched, a tracking tracking code is routed to your registered phone number/email.
            </p>
          </div>

        </div>

        {/* 3. POLICY IN-DEPTH GUIDELINES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Detailed Guidelines Block */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Order Processing & Fulfillment</h2>
              <div className="h-1 w-12 bg-[#C19A6B] mb-6"></div>
              
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed list-disc pl-5">
                <li>All orders placed before **02:00 PM** (Monday to Saturday) are routed into our sorting facility and dispatched on the exact same business day.</li>
                <li>Orders registered on Sundays or national gazetted public holidays will be systemically processed on the next subsequent working day.</li>
                <li>During high-volume seasonal campaigns, grand flash sales, or festive drops, processing intervals can stretch slightly up to 48 hours.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Payment & Delivery Rules</h2>
              <div className="h-1 w-12 bg-[#C19A6B] mb-6"></div>
              
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed list-disc pl-5">
                <li>**Cash on Delivery (COD):** Available all across Pakistan. Please note that packages cannot be opened before payment execution to our courier partners.</li>
                <li>**Prepaid Shipments:** For safety protocols, digital transactions via Credit/Debit cards or integrated mobile banking gateways undergo automated fraud analysis.</li>
                <li>**Unclaimed Consignments:** Courier channels attempt delivery up to 2 times. Unclaimed packages are automatically routed back to our central warehouse as cancelled.</li>
              </ul>
            </div>
          </div>

          {/* 4. DISPATCH WARNINGS & SECURITY SIDEBAR */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-gray-900">
              <ShieldAlert className="text-[#C19A6B]" size={22} />
              <h3 className="text-lg font-bold tracking-tight">Delivery Safety Protocols</h3>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              To keep your dynamic virtual fits secure, please ensure you or an authorized representative are available to verify ownership parameters at the given shipping metrics.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-gray-600">
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p>Packages are thoroughly sealed using premium moisture-resistant wrap sheets to preserve fabric textures.</p>
              </div>
              <div className="flex items-start gap-3 text-xs text-gray-600">
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p>Please do not accept the package if the signature security seal tape of TryLo is visibly broken or modified.</p>
              </div>
              <div className="flex items-start gap-3 text-xs text-gray-600">
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <p>Address changes or modifications cannot be updated onto tracking routes once the package leaves the sorting center.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200/60 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <Globe size={14} /> National Distribution Network Active
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ShippingPolicy;