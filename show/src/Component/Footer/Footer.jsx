import React, { useState } from 'react'; // 👈 Updated with useState integration hook
import { Link } from 'react-router-dom'; 
import axios from 'axios'; // 👈 Imported axios for asynchronous database logging
import { FaInstagram, FaFacebookF, FaTiktok, FaArrowRight } from 'react-icons/fa';
import logo from "../../assets/logofooter.png"; // 👈 Logo image import

const Footer = () => {
  // ============================================
  // NEWSLETTER TRACKING STATES
  // ============================================
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [footerMsg, setFooterMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================================
  // DISPATCH SUBSCRIPTION EVENT HANDLER
  // ============================================
  // Footer.jsx ke andar handleSubscribe function ko is sahi URL par map karein:
const handleSubscribe = async (e) => {
  e.preventDefault();
  if (!newsletterEmail) return;

  try {
    setLoading(true);
    setFooterMsg("");

    // 💡 FIX: Added '/subscriber' in the path to match index.js exactly
    const res = await axios.post("http://localhost:8030/api/subscriber/subscribe", { 
      email: newsletterEmail 
    });

    if (res.data.success) {
      setFooterMsg(res.data.message);
      setNewsletterEmail("");
    }
  } catch (err) {
    if (err.response && err.response.data) {
      setFooterMsg(err.response.data.message);
    } else {
      setFooterMsg("Subscription failed. Please try again later.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            TOP SECTION: NEWSLETTER & BRANDING MATRIX
           ======================================================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10">
          <div className="w-full lg:max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tighter mb-3 italic text-[#C19A6B]">
              BE THE FIRST TO KNOW
            </h2>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>

            {/* 💡 SYNCHRONIZED INTERACTIVE FORM HANDLER BLOCK */}
            <form onSubmit={handleSubscribe} className="flex border-b border-zinc-700 pb-2 group max-w-sm">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500 text-white disabled:opacity-50"
                disabled={loading}
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="hover:translate-x-1 transition-transform duration-300 text-gray-400 hover:text-white disabled:opacity-50"
              >
                <FaArrowRight size={14} />
              </button>
            </form>

            {/* Dynamic Status Response Log Layer */}
            {footerMsg && (
              <p className="text-xs text-[#C19A6B] mt-2 font-medium tracking-wide animate-fadeIn">
                {footerMsg}
              </p>
            )}
          </div>

          {/* Social Profiles container block */}
          <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
            <Link to="/" className="flex items-center h-full py-2">
  <img 
    src={logo} 
    alt="TryLo Logo" 
    className="h-25 w-auto object-contain transition-transform duration-300 hover:scale-105 bg-black" 
  />
</Link>
             <div className="flex space-x-4">
                <a href="#" className="p-2 border border-zinc-700 rounded-full text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"><FaInstagram size={15} /></a>
                <a href="#" className="p-2 border border-zinc-700 rounded-full text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"><FaTiktok size={15} /></a>
                <a href="#" className="p-2 border border-zinc-700 rounded-full text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"><FaFacebookF size={15} /></a>
             </div>
          </div>
        </div>

        {/* ========================================================
            MIDDLE SECTION: FLUID DYNAMIC LINKS GRID LAYOUT
           ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16 pt-10 border-t border-zinc-900">
          
          {/* COLUMN 1: SHOP NAVIGATION LINKS */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-gray-300">Shop</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li><Link to="/shop" className="hover:text-[#C19A6B] transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?productType=featured" className="hover:text-[#C19A6B] transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?category=men" className="hover:text-[#C19A6B] transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?category=women" className="hover:text-[#C19A6B] transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-[#C19A6B] transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* COLUMN 2: CUSTOMER CARE */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-gray-300">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
             
              
              <li><Link to="/shippingpolicy" className="hover:text-[#C19A6B] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returnexchange" className="hover:text-[#C19A6B] transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faqs" className="hover:text-[#C19A6B] transition-colors">FAQs</Link></li>
              
            </ul>
          </div>

          {/* COLUMN 3: BRAND STORY */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-gray-300">Our Story</h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li><Link to="/Aboutus" className="hover:text-[#C19A6B] transition-colors">About Us</Link></li>
           
              <li><Link to="/careers" className="hover:text-[#C19A6B] transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT US CARD HOUSING */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-900/80">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-3 text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400 text-xs leading-relaxed">
                Need help? Our team is available <br/> 
                <span className="font-semibold text-zinc-300 italic">Mon-Sat (10am - 6pm)</span>
              </p>
              <p className="font-bold text-base text-white tracking-wide">+92 311 1100439</p>
              <p className="text-xs underline underline-offset-4 cursor-pointer text-[#C19A6B] hover:text-white transition-colors break-all">
                support@me.com
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM SECTION: COPYRIGHTS & CREDITS MAPPING
           ======================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 gap-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center md:text-left">
            © 2026 Trylo CLOTHING CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 opacity-40 text-gray-400 select-none">
             <span className="text-[9px] font-bold tracking-wider">VISA</span>
             <span className="text-[9px] font-bold tracking-wider">MASTERCARD</span>
             <span className="text-[9px] font-bold tracking-wider">APPLE PAY</span>
             <span className="text-[9px] font-bold tracking-wider">CASH ON DELIVERY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;