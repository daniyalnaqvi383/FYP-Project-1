import React from 'react';
import { Sparkles, Code, Target, Heart, Mail, ShieldCheck, Briefcase, Cpu, Palette, ExternalLink } from 'lucide-react';

function Careers() {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-800 w-full overflow-x-hidden">
      
      {/* 1. PREMIUM HERO SECTION WITH GRID BACKGROUND BACKGROUND */}
      <div className="bg-gradient-to-b from-gray-50 via-gray-50/50 to-white py-20 px-4 sm:px-6 md:px-8 text-center relative border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C19A6B] bg-amber-50 px-3 py-1 rounded-full inline-block">
            Work With TryLo
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 uppercase leading-tight">
            Shape The Future Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#C19A6B] to-gray-700">
              AI Fashion & Retail
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We are building a revolutionary ecosystem where luxury apparel meets smart technology. 
            At TryLo, you will collaborate with cross-functional teams to engineer seamless shopping, 
            photorealistic cloth simulations, and elegant wardrobe styles.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 space-y-24">
        
        {/* 2. CORE DEPARTMENTS SECTIONS */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Our Core Divisions</h2>
            <p className="text-xs sm:text-sm text-gray-400">The functional engine structures fueling TryLo's daily growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50/40 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Cpu size={20} /></div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-base">Engineering & AI Research</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Scaling up our MERN stack, database connection pools optimization, and refining 2D photorealistic rendering Python computer vision models.</p>
              </div>
            </div>

            <div className="p-6 border border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50/40 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-[#C19A6B] rounded-xl shrink-0"><Palette size={20} /></div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-base">Creative & Textile Design</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Curating premium Eastern Wash & Wear variants, Western casual slim-fit lines, pattern styling vectors, and visual digital branding asset logs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. APPLICATION SEAMLESS PROCESS TIMELINE */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Application Pipeline</h2>
            <p className="text-xs sm:text-sm text-gray-400">How we evaluate talent transparently from inbox submission to final onboarding.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="space-y-2 relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-black text-white rounded-full h-7 w-7 flex items-center justify-center shadow">01</span>
                <h4 className="font-bold text-gray-900 text-sm">Resume Screening</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-10">Drop your resume and GitHub link. Our tech lead evaluates your core stack proficiency metrics manually within 48 hours.</p>
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-[#C19A6B] text-white rounded-full h-7 w-7 flex items-center justify-center shadow">02</span>
                <h4 className="font-bold text-gray-900 text-sm">Technical Review</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-10">A quick casual dynamic code-review session mapping state optimizations, MERN logic loops, or creative portfolio specs.</p>
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold bg-emerald-600 text-white rounded-full h-7 w-7 flex items-center justify-center shadow">03</span>
                <h4 className="font-bold text-gray-900 text-sm">Onboarding Spot</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-10">Lock down your paid internship or junior engineer track placement with immediate mentorship logs and platform ownership.</p>
            </div>
          </div>
        </div>

        {/* 4. PROFESSIONAL DIRECT APPLICATION HUB */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C19A6B] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 border border-gray-800 text-[#C19A6B] shadow-inner">
              <Briefcase size={22} />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Join Our Global Talent Pool
            </h2>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              We do not track rigid seasonal hiring boundaries. We welcome self-driven innovators ready to take 
              absolute ownership. If you want to contribute to the **TryLo** architecture, your profile belongs here.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-gray-300">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#C19A6B]" /> Paid Internship Metrics</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#C19A6B]" /> Junior Stack Tracks</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#C19A6B]" /> Hybrid Agile Frameworks</span>
            </div>

            {/* Action Card Button Link */}
            <div className="pt-6 border-t border-gray-800 max-w-md mx-auto space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Submit Portfolio Parameters</p>
              
              <a 
                href="mailto:careers@trylo.com"
                className="flex items-center justify-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-md group hover:border-[#C19A6B] transition duration-300 cursor-pointer"
              >
                <div className="p-2 bg-black text-[#C19A6B] rounded-xl"><Mail size={18} /></div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Recruitment Network Inbox</p>
                  <p className="text-sm font-semibold text-white font-mono truncate">careers@trylo.com</p>
                </div>
                <ExternalLink size={16} className="text-gray-500 group-hover:text-[#C19A6B] transition shrink-0 ml-2" />
              </a>
              
              <p className="text-[11px] text-gray-500 italic">
                *Please state your core stack metrics (MERN / Python UI) clearly inside the subject layout.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Careers;