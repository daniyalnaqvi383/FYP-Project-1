import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Clock, HelpCircle, Mail, Phone } from 'lucide-react';

function Returnexchange() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800 w-full overflow-x-hidden">
      
      {/* 1. HERO ACCENT HEADER */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
          Returns & Exchanges
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          We want your **TryLo** experience to be absolutely flawless. If you experience any sizing issues or change your mind, our hassle-free policy is designed to support you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        
        {/* 2. CORE POLICY FAST-TRACK CARDS (GRID SYSTEM) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="border border-gray-100 rounded-2xl p-6 text-center bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#C19A6B] mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">7-Day Window</h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Customers have a dedicated window of **7 days** from the delivery date to initiate an exchange or return claim.
            </p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 text-center bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">100% Pristine</h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Products must remain completely unworn, unwashed, and intact with all original brand tags attached.
            </p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 text-center bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
              <Truck size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Reverse Logistics</h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              We arrange reverse pickup services in major domestic cities, or you can ship back via any authorized courier.
            </p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-6 text-center bg-white shadow-sm hover:shadow-md transition duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Swift Processing</h3>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Once verified at our fulfillment center, claims are completely processed within **3 to 4 working days**.
            </p>
          </div>

        </div>

        {/* 3. POLICY IN-DEPTH INFORMATION DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Detailed Terms block */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Terms & Conditions</h2>
              <div className="h-1 w-12 bg-[#C19A6B] mb-6"></div>
              
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed list-disc pl-5">
                <li>A comprehensive **7-day exchange and return policy** applies to any verified manufacturing defects or dynamic sizing misfits.</li>
                <li>Items purchased under **Sales or Promotional Campaigns** are eligible for exchange tracking metrics, while standard monetary refunds remain restricted.</li>
                <li>Product structural conditions must be original. Product containers, safety tags, barcodes, and invoices are mandatory verification components.</li>
                <li>In cases where a faulty article, wrong sizing layout, or damaged piece was dispatched from our end, all reverse logistics charges will be fully covered by **TryLo**.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">How to Request an Exchange?</h2>
              <div className="h-1 w-12 bg-[#C19A6B] mb-6"></div>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="font-mono text-xs font-bold bg-black text-white rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Logistics Registration:</span> Get in touch with our consumer support helpdesk with your authentic Order ID and verified parameters.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="font-mono text-xs font-bold bg-black text-white rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Quality Control Audit:</span> Our dedicated audit cell evaluates the package upon arrival to confirm factory deployment compliance standards.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="font-mono text-xs font-bold bg-black text-white rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Fresh Dispatch Allocation:</span> Your freshly processed exchange selection item is triggered into transit pipelines without any extra charge overheads.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. HELP & INSTANT CONTACT SIDEBAR INFODESK */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-gray-900">
              <HelpCircle className="text-[#C19A6B]" size={22} />
              <h3 className="text-lg font-bold tracking-tight">Need Instant Assistance?</h3>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              If you run into any systematic errors while raising a replacement or exchange pipeline, contact our dedicated support networks immediately.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-blue-600 bg-blue-50 p-2.5 rounded-lg">
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Email Support</p>
                  <p className="text-sm font-semibold text-gray-900 font-mono truncate">support@trylo.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-emerald-600 bg-emerald-50 p-2.5 rounded-lg">
                  <Phone size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">WhatsApp Helpline</p>
                  <p className="text-sm font-semibold text-gray-900 font-mono">+92 300 1234567</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200/60 text-[11px] text-gray-400 text-center leading-normal">
              Timings: 10:00 AM to 06:00 PM (Monday - Saturday)
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Returnexchange;