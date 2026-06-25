import React from 'react';
import { Link } from 'react-router-dom';

const VirtualTryOnPromo = () => {
  return (
    <section className="w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      
      {/* 1️⃣ BACKGROUND LAYER: VIDEO / IMAGE CONTAINER */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />

        {/* Cinematic Background Video */}
        <video
          src="/assets/videos/tryon_demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/western_fallback.jpg" 
          className="w-full h-full object-cover grayscale-[10%] scale-105"
        />
      </div>

      {/* 2️⃣ FOREGROUND LAYER: FLOATING CONTENT */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-20 items-center">
        
        {/* SIMPLE & CLEAR ENGLISH COPYWRITING */}
        <div className="col-span-1 lg:col-span-8 flex flex-col text-center lg:text-left items-center lg:items-start">
          
          <span className="text-xs uppercase tracking-[0.4em] text-[#c5a880] font-semibold block mb-4 drop-shadow-md">
            AI Fashion Technology
          </span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-neutral-100 leading-[1.15] mb-6 drop-shadow-lg">
            See It On Yourself. <br />
            <span className="italic font-normal text-neutral-400">Before You Buy.</span>
          </h2>
          
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed max-w-xl mb-12 drop-shadow-sm">
            Welcome to the future of shopping. Upload your picture, select any outfit, and our smart AI system will instantly show you exactly how the clothes look on your body. No more fitting room hassle.
          </p>

          {/* TWO SIMPLE BENEFIT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl text-left border-t border-neutral-800 pt-8 bg-black/30 backdrop-blur-md p-5 rounded-xl border border-neutral-900">
            <div className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] mt-2 shrink-0"></div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase mb-1">Instant Results</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">Our fast servers process your photo in less than 20 seconds for an accurate trial.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] mt-2 shrink-0"></div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase mb-1">Perfect Details</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">The AI automatically matches fabric textures, shadows, and sizes to your body shape.</p>
              </div>
            </div>
          </div>

          {/* LAUNCH BUTTON */}
    <div className="mt-12">
  <Link to="/virtual-room">
    <button className="px-10 py-4 bg-transparent border border-[#c5a880] text-xs tracking-[0.25em] uppercase text-[#c5a880] font-medium rounded-sm hover:bg-[#c5a880] hover:text-black transition-all duration-500 ease-in-out shadow-2xl backdrop-blur-md cursor-pointer">
      Try It Live Now
    </button>
  </Link>
</div>

        </div>
      </div>
    </section>
  );
};

export default VirtualTryOnPromo;