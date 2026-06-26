import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { FaInstagram, FaFacebookF, FaTiktok, FaArrowRight } from 'react-icons/fa';
import logo from "../../assets/logofooter.png"; 

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [footerMsg, setFooterMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      setLoading(true);
      setFooterMsg("");
      const res = await axios.post("http://localhost:8030/api/subscriber/subscribe", { 
        email: newsletterEmail 
      });
      if (res.data.success) {
        setFooterMsg(res.data.message);
        setNewsletterEmail("");
      }
    } catch (err) {
      setFooterMsg(err.response?.data?.message || "Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#070707] text-white pt-20 pb-10 border-t border-neutral-900 select-none w-full">
      {/* 🎯 FIXED WIDTH CONTAINER: 1280px max-w-7xl with balanced padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12 lg:gap-8">
          
          <div className="w-full lg:max-w-md space-y-4">
            <h2 className="text-sm font-mono tracking-[0.25em] uppercase text-[#C19A6B] font-bold">
              // Be The First To Know
            </h2>
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm">
              Subscribe to unlock early access to exclusive collection drops, virtual fitting events, and seasonal lookbooks.
            </p>

            <form onSubmit={handleSubscribe} className="flex border-b border-neutral-800 pb-2 max-w-sm w-full transition-colors focus-within:border-[#C19A6B] group pt-2">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="bg-transparent outline-none w-full text-xs font-mono placeholder:text-neutral-600 text-white disabled:opacity-50"
                disabled={loading}
                required
              />
              <button type="submit" disabled={loading} className="transition-all duration-300 text-neutral-500 hover:text-[#C19A6B] hover:translate-x-1 p-1 disabled:opacity-50">
                <FaArrowRight size={12} />
              </button>
            </form>
            {footerMsg && <p className="text-[11px] font-mono text-[#C19A6B] tracking-wide pt-1">{footerMsg}</p>}
          </div>

          <div className="flex flex-col items-start lg:items-end w-full lg:w-auto space-y-6">
            <Link to="/" className="flex items-center transition-transform duration-500 hover:scale-[1.02]">
              <img src={logo} alt="Logo" className="h-16 w-auto object-contain bg-transparent" />
            </Link>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 border border-neutral-800/80 rounded-full text-neutral-400 flex items-center justify-center hover:bg-white hover:text-black transition-all"><FaInstagram size={13} /></a>
              <a href="#" className="w-9 h-9 border border-neutral-800/80 rounded-full text-neutral-400 flex items-center justify-center hover:bg-white hover:text-black transition-all"><FaTiktok size={13} /></a>
              <a href="#" className="w-9 h-9 border border-neutral-800/80 rounded-full text-neutral-400 flex items-center justify-center hover:bg-white hover:text-black transition-all"><FaFacebookF size={13} /></a>
            </div>
          </div>
        </div>

        {/* MIDDLE GRID LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 pt-12 border-t border-neutral-900">
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">// Shop</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/shop" className="hover:text-[#C19A6B] transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?productType=featured" className="hover:text-[#C19A6B] transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">// Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/shippingpolicy" className="hover:text-[#C19A6B] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returnexchange" className="hover:text-[#C19A6B] transition-colors">Returns & Exchanges</Link></li>
             
              <li><Link to="/faqs" className="hover:text-[#C19A6B] transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">// Our Story</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/Aboutus" className="hover:text-[#C19A6B] transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#C19A6B] transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div className="bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/40 backdrop-blur-sm space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-200 font-semibold">// Contact</h4>
            <p className="text-[11px] font-light text-neutral-400">+92 311 1100439</p>
            <p className="text-[11px] font-mono text-[#C19A6B] underline">support@me.com</p>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-900 gap-4">
          <p className="text-[10px] text-neutral-600 font-mono tracking-widest text-center">
            © {new Date().getFullYear()} TRYLO CLOTHING CO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;