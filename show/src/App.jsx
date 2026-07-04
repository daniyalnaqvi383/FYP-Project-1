import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './Component/Hero/Hero';
import Login from './Component/Login/Login';
import Navbar from './Component/Navbar/Navbar';
import SignUP from './Component/Sign/signUP';
import { Route, Routes } from "react-router-dom";
import ProductDetail from './Pages/ProductDetail';
import Cartpage from './Pages/Cartpage';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import ProductGrid from './Pages/ProductGrid';
import Chatbot from './Component/Chatbot/Chatbot';
import Footer from './Component/Footer/Footer';
import Returnexchange from './Pages/Returnexchange';
import AboutUS from './Pages/AboutUS';
import ShippingPolicy from './Pages/ShippingPolicy';
import FAQs from './Pages/FAQs';
import Careers from './Pages/Careers';
import ScrollToTop from './ScrollToTop';
import TryOnModal from './Pages/TryOnModal';

function App() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");
    if (!hasLoadedBefore) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("hasLoadedBefore", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#070707] flex flex-col items-center justify-center text-white select-none">
        {/* Radial subtle gold background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#c5a880]/5 blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col items-center space-y-8 animate-pulse duration-1000">
          <div className="relative text-center">
            <h1 className="text-4xl md:text-5xl font-serif tracking-[0.25em] uppercase text-neutral-100 font-light">
              Try<span className="text-[#c5a880] font-normal">Lo</span>
            </h1>
            <span className="block text-[8px] font-mono tracking-[0.4em] text-neutral-500 uppercase mt-2.5">
              Premium Storefront
            </span>
          </div>

          {/* Premium Loader Ring */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-neutral-800/80"></div>
            <div className="absolute inset-0 rounded-full border border-t-[#c5a880] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[9px] font-mono tracking-[0.3em] text-[#c5a880]/80 uppercase">
              Initializing Studio
            </span>
            <div className="w-20 h-[1.5px] bg-neutral-900 overflow-hidden relative rounded-full">
              <div className="absolute top-0 bottom-0 left-0 bg-[#c5a880] w-1/3 animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar/>

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
         <Route path="/CartPage" element={<Cartpage/>} />
         <Route path="/Checkout" element={<Checkout/>} />
         <Route path="/shop" element={<ProductGrid />} />
         <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/returnexchange" element={<Returnexchange/>} />
        <Route path="/Aboutus" element={<AboutUS/>} />
        <Route path="/ShippingPolicy" element={<ShippingPolicy/>} />
      
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/careers" element={<Careers/>} />
       // ⚡ Space saaf karke clean lowercase path lagayein
<Route path="/virtual-room" element={<TryOnModal isOpen={true} onClose={() => window.history.back()} product={{}} />} />

       

      







      </Routes>
      <Chatbot/>
      <Footer/>
    </>
  );
}

export default App; 
