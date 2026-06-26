import React from 'react';
import { Sparkles, Shirt, Eye, Target, Camera, Cpu, Layers } from 'lucide-react';

function AboutUS() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-neutral-900 w-full overflow-x-hidden selection:bg-[#C19A6B] selection:text-white">
      
      {/* 1. HERO VISION BLOCK */}
      <div className="relative py-24 sm:py-32 px-6 text-center border-b border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C19A6B] mb-4 block">
            // The Future of Retail
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight text-neutral-950 uppercase mb-8 leading-[1.1]">
            Tailoring <br/>
            <span className="italic font-light">Digital Perfection.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed font-light">
            At <span className="font-semibold text-neutral-900">TryLo</span>, we are bridging the gap between bespoke craftsmanship and digital precision. We make high-end fashion intuitive, fast, and uniquely yours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* 2. ⚡ VIRTUAL TRY-ON DEPLOYMENT SHOWCASE */}
        <div className="bg-[#070707] text-white rounded-sm p-8 sm:p-16 mb-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C19A6B] opacity-5 rounded-full blur-[128px] -mr-20 -mt-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C19A6B] flex items-center gap-2">
                <Cpu size={14} /> AI-Powered Engine
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white uppercase leading-tight">
                Preview the fit <br/>
                <span className="italic font-light">before the buy.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                Forget size charts and guessing. TryLo's <span className="text-white font-medium">2D Photorealistic AI Assistant</span> projects garments onto your profile with pixel-perfect accuracy. See exactly how the fabric falls, drapes, and adjusts to your physique in real-time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-neutral-800">
                {[
                  { icon: Camera, t: "1. Upload Photo", d: "A simple front-facing snapshot." },
                  { icon: Shirt, t: "2. Choose Style", d: "Select from our premium catalog." },
                  { icon: Layers, t: "3. See Result", d: "Instant realistic simulation." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 rounded-sm bg-neutral-800 text-[#C19A6B]"><step.icon size={18}/></div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">{step.t}</p>
                      <p className="text-[10px] text-neutral-500 mt-1">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Interactive Block */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="border border-neutral-800 bg-neutral-900/50 p-8 rounded-sm w-full max-w-sm text-center space-y-6">
                <div className="w-full h-48 bg-neutral-800 rounded-sm flex flex-col items-center justify-center text-neutral-500">
                  <Camera size={32} className="mb-2 opacity-50"/>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">Virtual Room Ready</p>
                </div>
                <button className="w-full bg-[#C19A6B] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-sm transition hover:bg-[#b08759]">
                  Activate Try-On
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CORE COMMITMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          {[
            { icon: Target, title: "Our Commitment", desc: "Specializing in high-end Eastern Wash & Wear and Western smart-casuals. We provide premium cloth lines engineered for a modern lifestyle." },
            { icon: Eye, title: "Precision Standard", desc: "Every piece undergoes strict textile strength and stitching audits. TryLo means flawless fits and long-lasting fabric integrity." }
          ].map((item, i) => (
            <div key={i} className="space-y-6 border-l-2 border-[#C19A6B] pl-8">
              <item.icon className="text-[#C19A6B]" size={28} />
              <h3 className="text-2xl font-serif font-medium tracking-tight text-neutral-950">{item.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 4. BRAND PILLARS */}
        <div className="border-t border-neutral-100 pt-20">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-[0.3em] text-center mb-16">The Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shirt, title: "Luxury Textiles", desc: "Sourcing only the finest cottons and breathable blends for maximum comfort." },
              { icon: Sparkles, title: "AI Wardrobe Guidance", desc: "Tech-native assistants to help you find your perfect fit and style combinations." },
              { icon: Layers, title: "Zero-Risk Policy", desc: "Clear fitting data paired with our 7-day hassle-free return and exchange security." }
            ].map((p, i) => (
              <div key={i} className="p-8 bg-neutral-50 border border-neutral-100 rounded-sm hover:border-[#C19A6B] transition-colors">
                <div className="text-[#C19A6B] mb-6"><p.icon size={24} /></div>
                <h4 className="font-bold text-neutral-950 text-sm mb-3 uppercase tracking-wider">{p.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUS;