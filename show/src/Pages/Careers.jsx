import React from 'react';
import { Sparkles, Shirt, Eye, Target, Camera, Cpu, Layers, ShieldCheck, Briefcase, Mail, ExternalLink } from 'lucide-react';

function Careers() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased text-neutral-900 w-full overflow-x-hidden selection:bg-[#C19A6B] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative py-24 px-6 text-center border-b border-neutral-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C19A6B] bg-neutral-100 px-4 py-1.5 rounded-sm inline-block">
            // Work With TryLo
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight text-neutral-950 uppercase leading-[1.1]">
            Shape the Future of <br />
            <span className="italic font-light">AI Fashion & Retail</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* 2. CORE DEPARTMENTS */}
        <div className="mb-24">
          <h2 className="text-[11px] font-bold text-neutral-900 uppercase tracking-[0.3em] mb-12 text-center">// Our Core Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-8 bg-white border border-neutral-100 rounded-sm hover:border-[#C19A6B] transition-all shadow-sm">
              <div className="text-[#C19A6B] mb-6"><div className="p-3 bg-neutral-50 w-fit rounded-sm"><Cpu size={20} /></div></div>
              <h4 className="font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">Engineering & AI</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">Scaling MERN stack, database connection pooling, and refining 2D photorealistic rendering engines.</p>
            </div>

            <div className="p-8 bg-white border border-neutral-100 rounded-sm hover:border-[#C19A6B] transition-all shadow-sm">
              <div className="text-[#C19A6B] mb-6"><div className="p-3 bg-neutral-50 w-fit rounded-sm"><Sparkles size={20} /></div></div>
              <h4 className="font-bold text-neutral-900 text-sm mb-3 uppercase tracking-wider">Design & Textile</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">Curating premium fabrics, pattern styling, and digital asset branding for global aesthetics.</p>
            </div>

          </div>
        </div>

        {/* 3. APPLICATION PIPELINE */}
        <div className="mb-24">
          <h2 className="text-[11px] font-bold text-neutral-900 uppercase tracking-[0.3em] mb-16 text-center">// Application Pipeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="font-mono text-xl text-[#C19A6B] font-bold block">01</span>
              <h4 className="font-bold text-neutral-900 text-sm">Resume Screening</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">Tech lead evaluates your stack and GitHub portfolio.</p>
            </div>
            <div className="space-y-4">
              <span className="font-mono text-xl text-[#C19A6B] font-bold block">02</span>
              <h4 className="font-bold text-neutral-900 text-sm">Technical Review</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">A casual session mapping logic, state, and creativity.</p>
            </div>
            <div className="space-y-4">
              <span className="font-mono text-xl text-[#C19A6B] font-bold block">03</span>
              <h4 className="font-bold text-neutral-900 text-sm">Onboarding</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">Lock in your internship or junior track placement.</p>
            </div>
          </div>
        </div>

        {/* 4. HIRING HUB */}
        <div className="bg-[#070707] text-white rounded-sm p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C19A6B] opacity-5 rounded-full blur-[128px] -mr-16 -mt-16"></div>
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-[#C19A6B]">
              <Briefcase size={22} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium uppercase tracking-tight">Join Our Global Pool</h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              We look for self-driven innovators ready to take absolute ownership.
            </p>
            <div className="pt-8 border-t border-neutral-800 max-w-sm mx-auto">
              <a href="mailto:careers@trylo.com" className="flex items-center justify-center gap-4 bg-neutral-900 p-4 rounded-sm hover:border-[#C19A6B] border border-neutral-800 transition-all">
                <Mail size={18} className="text-[#C19A6B]" />
                <span className="text-sm font-mono">careers@trylo.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;