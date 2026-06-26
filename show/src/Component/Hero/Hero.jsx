import React, { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Catagories from "../../Pages/Catagories.jsx";
import Trending from "../../Pages/Trending.jsx";
import Timer from "../../Pages/Timer.jsx";
import Feature from "../../Pages/Feature .jsx";
import VirtualTryOnPromo from "../../Pages/VirtualTryOnPromo.jsx";
// import pics from "../../assets/hero-pics"; // Assuming you have a separate file for images
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider2 from "../../assets/slider 2.png";




function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🎯 DYNAMIC EDITORIAL DATA FOR EACH SLIDE
  const slides = [
    {
      id: 1,
      tag: "Premium AI Fitting",
      title: "The Smart Way\nTo Dress Better",
      subtitle: "Experience the virtual trial revolution live.",
      btnText: "Explore Studio",
      link: "/virtual-room",
      image: slider2,
    },
    {
      id: 2,
      tag: "Summer Collections 2026",
      title: "Minimal Design\nMaximum Vibe",
      subtitle: "Bespoke lightweight wear with up to 50% seasonal discount.",
      btnText: "Shop Collection",
      link: "/shop",
      image: "https://kumo-shreethemes.netlify.app/assets/banner-11-lO2D7fxO.png",
    },
    {
      id: 3,
      tag: "Exclusive Fabrics Line",
      title: "From Raw Bolt\nTo Finished Masterpiece",
      subtitle: "Crafted details engineered for absolute comfort.",
      btnText: "View Products",
      link: "/shop",
      image: "https://kumo-shreethemes.netlify.app/assets/banner-7-D32H2fF0.png",
    },
  ];

  // PREMIUM MINIMALIST NAV ARROWS
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30
      w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-lg
      flex items-center justify-center text-neutral-800
      hover:bg-black hover:text-white hover:border-black duration-500 ease-in-out transition-all"
    >
      <ChevronLeft size={18} strokeWidth={1.5} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30
      w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-lg
      flex items-center justify-center text-neutral-800
      hover:bg-black hover:text-white hover:border-black duration-500 ease-in-out transition-all"
    >
      <ChevronRight size={18} strokeWidth={1.5} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: (dots) => (
      <div style={{ bottom: "30px" }}>
        <ul className="flex justify-center items-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <button className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-[#C19A6B] scale-125 w-6' : 'bg-neutral-300'}`}>
        {""}
      </button>
    )
  };

  return (
    <>
      <div className="overflow-hidden relative w-full">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="outline-none">
              {/* SLIDE HERO MAIN BLOCK */}
              <section className="relative w-full h-[500px] sm:h-[600px] md:h-[calc(100vh-80px)] min-h-[550px] bg-neutral-100 overflow-hidden flex items-center">
                
                {/* 1️⃣ HIGH-CONTRAST IMAGE PACK BACKPLANE */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-[5000ms] ease-out scale-100"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform: currentSlide === index ? "scale(1.04)" : "scale(1)"
                  }}
                >
                  {/* Subtle Gradient Fog Layer over image for dynamic text depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-10 w-full md:w-[70%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent z-10" />
                </div>

                {/* 2️⃣ TYPOGRAPHY BLOCK LAYER */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-20">
                  <div className="max-w-[650px] flex flex-col items-start space-y-4 md:space-y-6">
                    
                    {/* Minimal Monospace Tag */}
                    {currentSlide === index && (
                      <p className="text-[#C19A6B] text-xs md:text-sm font-mono tracking-[0.3em] uppercase opacity-0 translate-y-[15px]"
                         style={{ animation: "slideUpText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: "0.2s" }}>
                        // {slide.tag}
                      </p>
                    )}

                    {/* Editorial Main Title */}
                    {currentSlide === index && (
                      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.1] whitespace-pre-line opacity-0 translate-y-[25px]"
                          style={{ animation: "slideUpText 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: "0.4s" }}>
                        {slide.title}
                      </h1>
                    )}

                    {/* Script Subtext Element */}
                    {currentSlide === index && (
                      <p className="text-neutral-600 text-sm sm:text-base md:text-xl font-light max-w-md opacity-0 translate-y-[15px]"
                         style={{ animation: "slideUpText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: "0.6s" }}>
                        {slide.subtitle}
                      </p>
                    )}

                    {/* Premium Interactive Button */}
                    {currentSlide === index && (
                      <div className="opacity-0 translate-y-[15px]"
                           style={{ animation: "slideUpText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: "0.8s" }}>
                        <Link to={slide.link}>
                          <button className="flex items-center gap-3 px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#C19A6B] hover:shadow-[0_10px_25px_rgba(193,154,107,0.3)]">
                            <span>{slide.btnText}</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </button>
                        </Link>
                      </div>
                    )}

                  </div>
                </div>

              </section>
            </div>
          ))}
        </Slider>

        {/* ⚡ ENGINE ANIMATION LAYERS OVERRIDE */}
        <style>
          {`
            .slick-slider, .slick-list, .slick-track, .slick-slide > div {
              height: 100%;
            }
            .slick-dots li {
              margin: 0 !important;
              width: auto !important;
              height: auto !important;
            }
            .slick-dots li button {
              display: none !important;
            }
            @keyframes slideUpText {
              from {
                opacity: 0;
                transform: translateY(25px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>

      {/* LOWER PAGES CONTAINER PARAMS */}
      <Catagories />
      <VirtualTryOnPromo />
      <Trending />
      <Timer />
      <Feature />
    </>
  );
}

export default Hero;