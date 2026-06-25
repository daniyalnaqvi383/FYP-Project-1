import React from 'react';
import { Link } from 'react-router-dom';
import tryOnVideo from '../assets/Videos/tryon.mp4'; 

const VirtualTryOnPromo = () => {
  return (
    <section className="w-full min-h-screen bg-[#070707] text-white flex items-center justify-center overflow-hidden relative py-24 px-4 sm:px-8 md:px-16 lg:px-24 select-none">

      {/* 1️⃣ BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        
        {/* Adjusted Overlays: Left side par gradient rakha hai text readability ke liye, baki video ko clear chhoda hai */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-[#070707]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-[#070707]/40 z-10" />
        
        {/* Opacity ko kam kiya hai taake video properly visible ho */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* Cinematic Background Video */}
        <video
          src={tryOnVideo} 
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/western_fallback.jpg" 
          className="w-full h-full object-cover scale-100 transition-all duration-1000 ease-out object-center"
        />
      </div>

      {/* 2️⃣ FOREGROUND LAYER */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-20 items-center gap-12">
        <div className="col-span-1 lg:col-span-8 flex flex-col text-center lg:text-left items-center lg:items-start space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-neutral-800/80 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c5a880] font-mono font-semibold">
              AI Virtual Engine v2.0
            </span>
          </div>

          {/* Text par soft drop-shadow lagayi hai taake video ke upar text clear read ho sake */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-neutral-100 leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            See It On Yourself. <br />
            <span className="italic font-light text-neutral-300 bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-500 bg-clip-text text-transparent">Before You Buy.</span>
          </h2>

          <p className="text-neutral-200 text-sm md:text-base font-light leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-justify lg:text-left basic-shadow">
            Welcome to the future of retail apparel shopping. Upload your picture, select any outfit, and our smart AI system will instantly project exactly how the clothes look on your body.
          </p>

          <div className="pt-6 w-full sm:w-auto">
            <Link to="/virtual-room">
              <button className="w-full sm:w-auto px-12 py-4 bg-black/40 border border-[#c5a880] text-xs tracking-[0.3em] uppercase text-[#c5a880] font-mono font-medium rounded-sm hover:bg-[#c5a880] hover:text-black transition-all duration-500 ease-in-out backdrop-blur-md cursor-pointer relative group overflow-hidden shadow-lg">
                <span className="relative z-10">Launch Studio Live</span>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VirtualTryOnPromo;