import React from 'react';
import { Sparkles, Shirt, Eye, Target, Camera, Cpu, Layers } from 'lucide-react';

function AboutUS() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-900 w-full overflow-x-hidden">
      
      {/* 1. HERO VISION BLOCK */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 md:px-8 text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C19A6B] bg-amber-50 px-3 py-1 rounded-full inline-block mb-4">
            The Future of Fashion is Here
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 uppercase mb-6 leading-tight">
            Smart Tailoring. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#C19A6B] to-gray-700">
              Virtual Perfection.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            At **TryLo**, we are breaking the traditional boundaries of e-commerce. We fuse high-end 
            craftsmanship with innovative technology to make clothing intuitive, fast, and precisely personalized.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-20">
        
        {/* 2. ⚡ BRAND FLAGSHIP FEATURE: VIRTUAL TRY-ON DEPLOYMENT SHOWCASE */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 md:p-16 mb-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C19A6B] opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Text Grid Area */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C19A6B] flex items-center gap-2">
                <Cpu size={14} /> AI-Powered Innovation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                See How It Fits Before You Buy
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                No more guessing games with size charts or worrying about returns. TryLo introduces a sophisticated 
                **2D Photorealistic AI Virtual Try-On Assistant**. By projecting advanced cloth rendering frameworks directly 
                onto your uploaded picture, you see exactly how the garment falls, drapes, and adjusts to your physique.
              </p>

              {/* Try-On Step Flow Vectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800/80">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-gray-900 text-[#C19A6B] border border-gray-800"><Camera size={16}/></div>
                  <div className="text-xs"><p className="font-bold">1. Upload Photo</p><p className="text-gray-500">Snap a quick picture</p></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-gray-900 text-[#C19A6B] border border-gray-800"><Shirt size={16}/></div>
                  <div className="text-xs"><p className="font-bold">2. Choose Article</p><p className="text-gray-500">Pick Eastern or Western</p></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-gray-900 text-[#C19A6B] border border-gray-800"><Layers size={16}/></div>
                  <div className="text-xs"><p className="font-bold">3. Live Simulation</p><p className="text-gray-500">Instant realistic check</p></div>
                </div>
              </div>
            </div>

            {/* Visual Interactive Block Mockup Area */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="border border-gray-800 bg-gray-900/60 p-6 rounded-2xl w-full max-w-sm text-center space-y-4 shadow-inner">
                <div className="w-full h-48 bg-gray-800 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500 p-4">
                  <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-[#C19A6B] mb-2"><Camera size={20}/></div>
                  <p className="text-xs font-bold text-white">Virtual Fitting Room</p>
                  <p className="text-[10px] text-gray-500 mt-1">Upload your standard front-facing profile image</p>
                </div>
                <button type="button" className="w-full bg-[#C19A6B] hover:bg-opacity-90 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition">
                  Activate Try-On
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CORE MISSION & VALUE STATEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#C19A6B]">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Our Core Commitment</h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              We specialize in offering high-end Eastern Wash & Wear Kurtas and structural Western smart-casual polos. 
              Our priority is simple: provide boutique premium standard cloth lines engineered dynamically for the modern lifestyle.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900">
              <Eye size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">The Precision Standard</h3>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Every sample undergoes strict textile strength metrics and stitching evaluation pipelines. TryLo stands 
              for flawless drop fits, premium long-lasting colors, and maximum breathing fiber metrics.
            </p>
          </div>
        </div>

        {/* 4. THREE BRAND METRIC PILLARS */}
        <div className="border-t border-gray-100 pt-16">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 uppercase tracking-tight text-center mb-12">
            The TryLo Product Architecture
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[#C19A6B] mb-3"><Shirt size={22} /></div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Luxury Source Fabrics</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Curating fine Egyptian cotton, high-density interlock polo blends, and flawless fall wash-and-wear structures.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[#C19A6B] mb-3"><Sparkles size={22} /></div>
              <h4 className="font-bold text-gray-900 text-base mb-2">AI Wardrobe Guidance</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Integrating personalized digital assistants to evaluate your perfect sizes, styling aesthetics, and combo matchings.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="text-[#C19A6B] mb-3"><Layers size={22} /></div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Zero-Risk Purchase</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Pairing virtual fitting clarity with our standard 7-day hassle-free replacement or reverse return security claims.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUS;