import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Clock, HelpCircle, Mail, Phone } from 'lucide-react';

function Returnexchange() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-neutral-900 w-full overflow-x-hidden">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b border-neutral-100 py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-medium uppercase tracking-widest text-neutral-950">
          Returns & Exchanges
        </h1>
        <p className="mt-6 text-sm text-neutral-500 max-w-lg mx-auto font-light">
          We want you to love your purchase. If you need to return or exchange an item, we are here to help make it easy for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        
        {/* 2. POLICY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Clock, title: "7 Days", desc: "You have 7 days after delivery to request a return or exchange." },
            { icon: ShieldCheck, title: "Unused Items", desc: "Items must be unworn, unwashed, and have their original tags." },
            { icon: Truck, title: "Easy Pickup", desc: "We arrange pickup for you in major cities. It's very simple." },
            { icon: RefreshCw, title: "Fast Process", desc: "Once we receive your item, we process your request in 3-4 days." }
          ].map((item, idx) => (
            <div key={idx} className="border border-neutral-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-neutral-100 text-[#C19A6B] mb-6 rounded-full">
                <item.icon size={22} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest">{item.title}</h3>
              <p className="mt-3 text-xs text-neutral-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3. DETAILS & CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-l-2 border-[#C19A6B] pl-4">Policy Rules</h2>
              <ul className="space-y-4 text-sm text-neutral-600 font-light list-none">
                <li className="flex gap-3"><span>•</span> You can return or exchange any item within 7 days of receiving it.</li>
                <li className="flex gap-3"><span>•</span> Sale items can be exchanged, but we do not offer monetary refunds.</li>
                <li className="flex gap-3"><span>•</span> Please keep all tags and the original packaging.</li>
                <li className="flex gap-3"><span>•</span> If you received a damaged item, we will pay for the return shipping.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-8 border-l-2 border-[#C19A6B] pl-4">How to start</h2>
              <div className="space-y-6">
                {[
                  { n: "01", t: "Contact Us", d: "Message our support team with your order number." },
                  { n: "02", t: "Send it back", d: "We will arrange a pickup or guide you on how to ship it to us." },
                  { n: "03", t: "Get your item", d: "Once we check the item, we will send your exchange or process the request." }
                ].map((step) => (
                  <div key={step.n} className="flex gap-6 items-start">
                    <span className="text-lg font-mono text-[#C19A6B] font-bold">{step.n}</span>
                    <div>
                      <h4 className="font-bold text-neutral-900">{step.t}</h4>
                      <p className="text-sm text-neutral-500 mt-1 font-light">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT SIDEBAR */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-8 space-y-8 rounded-sm">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-[#C19A6B]" size={24} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Need Help?</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-neutral-800 pb-6">
                <Mail size={20} className="text-[#C19A6B]" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-400 tracking-wider">Email Us</p>
                  <p className="text-sm mt-1">support@trylo.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#C19A6B]" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-400 tracking-wider">Call or WhatsApp</p>
                  <p className="text-sm mt-1">+92 311 1100439</p>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-neutral-500 italic">Available: Mon-Sat (10am - 6pm)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returnexchange;