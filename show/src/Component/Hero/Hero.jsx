import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Catagories from "../../Pages/Catagories.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trending from "../../Pages/Trending.jsx";
import Timer from "../../Pages/Timer.jsx";
import Feature from "../../Pages/Feature .jsx";
import Footer from "../Footer/Footer.jsx";
import CartPage from "../../Pages/Cartpage.jsx";
import VirtualTryOnPromo from "../../Pages/VirtualTryOnPromo.jsx";

function Hero() {
  const slides = [
    {
      id: 1,
      image:
        "https://kumo-shreethemes.netlify.app/assets/banner-25-Bw4FRMQD.png",
    },
    {
      id: 2,
      image:
        "https://kumo-shreethemes.netlify.app/assets/banner-11-lO2D7fxO.png",
    },
    {
      id: 3,
      image:
        "https://kumo-shreethemes.netlify.app/assets/banner-7-D32H2fF0.png",
    },
  ];

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-3 sm:left-5 md:left-8 top-1/2 -translate-y-1/2 z-30
      w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-xl
      flex items-center justify-center
      hover:bg-black hover:text-white duration-300"
    >
      <ChevronLeft size={20} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-3 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 z-30
      w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-xl
      flex items-center justify-center
      hover:bg-black hover:text-white duration-300"
    >
      <ChevronRight size={20} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
    <div className="overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            {/* HERO SECTION */}
            <section className="relative w-full h-[450px] sm:h-[520px] md:h-screen bg-[#efefea] overflow-hidden">

              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>

              {/* CONTENT */}
              <div className="relative z-10 h-[450px] sm:h-[520px] md:h-screen flex items-center">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-20 w-full">
                  <div className="max-w-[580px]">

                    <p className="text-[#C19A6B] text-[10px] sm:text-xs md:text-sm tracking-[3px] mb-3 sm:mb-4 uppercase animateFade">
                      Summer Collection
                    </p>

                    <h1 className="text-[26px] sm:text-[34px] md:text-[72px]  font-semibold leading-[1] text-black mb-4 sm:mb-5 animateFade delay200">
                       Summer
                      <br />
                      Collections 2026 up to 50% off
                    </h1>

                    <p
  className="text-[#1f2a44] text-[14px] sm:text-[16px] md:text-[28px] mb-6 sm:mb-8 animateFade delay400"
  style={{ fontFamily: "Kaushan Script, cursive" }}
>
  There’s nothing like trend
</p>

                    <button className="border border-black px-4 sm:px-5 md:px-8 py-2 md:py-3 text-xs sm:text-sm md:text-lg hover:bg-black hover:text-white duration-300 animateFade delay500">
                      Shop Now →
                    </button>

                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </Slider>

      {/* CUSTOM CSS */}
      <style>
        {`
          .slick-slider,
          .slick-list,
          .slick-track,
          .slick-slide > div {
            height: 100%;
          }

          .slick-slide {
            height: auto !important;
          }

          .slick-dots {
            bottom: 12px;
          }

          .slick-dots li button:before {
            font-size: 8px;
            color: #999;
            opacity: 1;
          }

          .slick-dots li.slick-active button:before {
            color: black;
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animateFade {
            opacity: 0;
            animation: fadeUp 1s ease forwards;
          }

          .delay200 { animation-delay: .2s; }
          .delay400 { animation-delay: .4s; }
          .delay500 { animation-delay: .5s; }
        `}
      </style>
    </div>
    <Catagories />
    <VirtualTryOnPromo/>
    <Trending/>
    
    <Timer/>
    <Feature/>
  
    

    </>
   

    
  );
 
}

export default Hero;