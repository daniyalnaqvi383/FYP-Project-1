import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Mail, Phone, MapPin, Check, ChevronRight, ArrowUp, Send } from 'lucide-react';
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-[#070707] text-white pt-16 pb-8 border-t border-neutral-900 select-none w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* TOP BRAND & NEWSLETTER CARD */}
        <div className="bg-[#0a0a0a]/90 border border-neutral-800/50 rounded-2xl p-6 md:p-10 mb-16 flex flex-col lg:flex-row justify-between items-stretch gap-10 lg:gap-0">
          
          {/* Newsletter Segment */}
          <div className="flex-grow lg:pr-12 flex flex-col justify-between space-y-6 lg:space-y-0">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#c5a880] font-semibold block mb-3">
                // BE THE FIRST TO KNOW
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-neutral-100 mb-4">
                Stay Ahead. Shop First.
              </h2>
              <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-xl">
                Subscribe to unlock early access to exclusive drops, virtual fitting events, and seasonal lookbooks.
              </p>
            </div>
            
            <div className="space-y-3 pt-4">
              <form onSubmit={handleSubscribe} className="flex items-center bg-[#070707] border border-neutral-800 rounded-xl overflow-hidden max-w-md w-full focus-within:border-[#c5a880] transition-colors">
                <div className="pl-4 text-neutral-500">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="bg-transparent outline-none w-full text-xs font-light px-3 py-4 placeholder:text-neutral-600 text-white disabled:opacity-50"
                  disabled={loading}
                  required
                />
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-[#c5a880] hover:bg-[#b0946f] text-white text-xs font-medium px-6 py-4 flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <span>Subscribe</span>
                  <Send size={11} className="text-white" />
                </button>
              </form>
              
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span className="text-[#c5a880]">
                  <Check size={13} />
                </span>
                <span>No spam. Unsubscribe anytime.</span>
              </div>
              {footerMsg && (
                <p className="text-[11px] font-mono text-[#c5a880] tracking-wide pt-1">{footerMsg}</p>
              )}
            </div>
          </div>
          
          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] bg-neutral-800/40 self-stretch my-2 mx-8"></div>
          
          {/* Logo & Social Links Segment */}
          <div className="w-full lg:w-60 flex flex-col justify-center items-center text-center shrink-0">
            <Link to="/" className="mb-4 block transition-transform duration-500 hover:scale-[1.03]">
              <img src={logo} alt="TryLo Logo" className="h-16 w-auto object-contain bg-transparent" />
            </Link>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4 block font-mono">
              Follow Us
            </span>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#070707] border border-neutral-800/80 rounded-full text-neutral-300 flex items-center justify-center hover:bg-[#c5a880] hover:text-black hover:border-[#c5a880] transition-all">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#070707] border border-neutral-800/80 rounded-full text-neutral-300 flex items-center justify-center hover:bg-[#c5a880] hover:text-black hover:border-[#c5a880] transition-all">
                <FaTiktok size={14} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#070707] border border-neutral-800/80 rounded-full text-neutral-300 flex items-center justify-center hover:bg-[#c5a880] hover:text-black hover:border-[#c5a880] transition-all">
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>
          
        </div>

        {/* MIDDLE SECTION - NAVIGATION LINKS & GET IN TOUCH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#c5a880] font-bold">
              SHOP
            </h4>
            <div className="w-6 h-[2px] bg-[#c5a880]"></div>
            <ul className="space-y-3 pt-2">
              <li className="group">
                <Link to="/shop" className="flex justify-between items-center text-neutral-400 hover:text-[#c5a880] transition-colors py-1 text-xs sm:text-sm font-light">
                  <span>New Arrivals</span>
                  <ChevronRight size={13} className="text-neutral-600 group-hover:text-[#c5a880] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </li>
              <li className="group">
                <Link to="/shop?productType=featured" className="flex justify-between items-center text-neutral-400 hover:text-[#c5a880] transition-colors py-1 text-xs sm:text-sm font-light">
                  <span>Best Sellers</span>
                  <ChevronRight size={13} className="text-neutral-600 group-hover:text-[#c5a880] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </li>
              <li className="group">
                <Link to="/shop" className="flex justify-between items-center text-neutral-400 hover:text-[#c5a880] transition-colors py-1 text-xs sm:text-sm font-light">
                  <span>Sale</span>
                  <ChevronRight size={13} className="text-neutral-600 group-hover:text-[#c5a880] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </li>
              <li className="group">
                <Link to="/shop" className="flex justify-between items-center text-neutral-400 hover:text-[#c5a880] transition-colors py-1 text-xs sm:text-sm font-light">
                  <span>Gift Cards</span>
                  <ChevronRight size={13} className="text-neutral-600 group-hover:text-[#c5a880] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Col 2: Customer Care */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#c5a880] font-bold">
              CUSTOMER CARE
            </h4>
            <div className="w-6 h-[2px] bg-[#c5a880]"></div>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-400 font-light">
              <li>
                <Link to="/shippingpolicy" className="hover:text-[#c5a880] transition-colors block py-1">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returnexchange" className="hover:text-[#c5a880] transition-colors block py-1">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#c5a880] transition-colors block py-1">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#c5a880] transition-colors block py-1">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Col 3: Our Story */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#c5a880] font-bold">
              OUR STORY
            </h4>
            <div className="w-6 h-[2px] bg-[#c5a880]"></div>
            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-400 font-light">
              <li>
                <Link to="/Aboutus" className="hover:text-[#c5a880] transition-colors block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#c5a880] transition-colors block py-1">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/Aboutus" className="hover:text-[#c5a880] transition-colors block py-1">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#c5a880] transition-colors block py-1">
                  Lookbooks
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Col 4: Get In Touch (Card Layout) */}
          <div className="bg-[#0a0a0a]/90 border border-neutral-800/60 p-6 rounded-2xl space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#c5a880] font-bold">
              GET IN TOUCH
            </h4>
            <div className="w-6 h-[2px] bg-[#c5a880]"></div>
            
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#c5a880] shrink-0" />
                <span>+92 311 1100439</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#c5a880] shrink-0" />
                <a href="mailto:support@me.com" className="hover:text-[#c5a880] transition-colors truncate">
                  support@me.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-[#c5a880] shrink-0" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* BOTTOM COPYRIGHT, PAYMENT BADGES, SCROLL UP */}
        <div className="border-t border-neutral-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left copyright */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs text-neutral-500 font-mono tracking-wider">
              © {new Date().getFullYear()} TryLo. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-neutral-500 font-mono">
              <Link to="/shippingpolicy" className="hover:text-[#c5a880] transition-colors">Privacy Policy</Link>
              <span className="text-neutral-800">|</span>
              <Link to="/returnexchange" className="hover:text-[#c5a880] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
          
          {/* Center payment method badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs text-neutral-500 font-mono tracking-wider">We Accept</span>
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="bg-white px-2 py-1 rounded flex items-center justify-center h-6 w-9 border border-neutral-800/40 select-none">
                <span className="text-[#1A1F71] font-bold italic text-[9px] tracking-tight font-serif">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="bg-white px-2 py-1 rounded flex items-center justify-center h-6 w-9 border border-neutral-800/40 select-none">
                <div className="flex items-center gap-0">
                  <div className="w-3.5 h-3.5 bg-[#EB001B] rounded-full z-10"></div>
                  <div className="w-3.5 h-3.5 bg-[#F79E1B] rounded-full -ml-2.5"></div>
                </div>
              </div>
              {/* PayPal */}
              <div className="bg-white px-2 py-1 rounded flex items-center justify-center h-6 w-9 border border-neutral-800/40 select-none">
                <span className="text-[#003087] font-extrabold italic text-[7.5px] tracking-tight">Pay<span className="text-[#0079C1]">Pal</span></span>
              </div>
              {/* JazzCash */}
              <div className="bg-[#1c1c1c] px-2 py-1 rounded flex items-center justify-center h-6 w-9 border border-neutral-800/40 select-none">
                <span className="text-[#f1b317] font-black text-[6.5px] tracking-wide">Jazz<span className="text-white">Cash</span></span>
              </div>
              {/* Apple Pay */}
              <div className="bg-white px-2 py-1 rounded flex items-center justify-center h-6 w-9 border border-neutral-800/40 select-none">
                <div className="flex items-center gap-0.5 text-black font-semibold text-[7px]">
                  <span className="text-[9px] leading-none -mt-0.5"></span>
                  <span className="font-bold tracking-tight">Pay</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Scroll to Top Button */}
          <div>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 bg-[#c5a880] hover:bg-[#b0946f] text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(197,168,128,0.2)]"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="text-white" />
            </button>
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;