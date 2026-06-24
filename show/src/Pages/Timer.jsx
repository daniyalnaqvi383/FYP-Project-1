import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

function Timer() {
  const initialTime = 7 * 60 * 60; // 7 hours in seconds

  const [leftTime, setLeftTime] = useState(() => {
    const storeTime = localStorage.getItem("remainingTime");
    return storeTime && parseInt(storeTime, 10) > 0
      ? parseInt(storeTime, 10)
      : initialTime;
  });

  // =========================
  // TIMER LOGIC (FIXED)
  // =========================
  useEffect(() => {
    if (leftTime <= 0) return;

    const interval = setInterval(() => {
      setLeftTime((prev) => {
        if (prev <= 1) {
          localStorage.setItem("remainingTime", 0);
          clearInterval(interval);
          return 0;
        }

        const updated = prev - 1;
        localStorage.setItem("remainingTime", updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [leftTime]);

  // =========================
  // FORMAT TIME (FIXED)
  // =========================
  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { days, hours, minutes, seconds } = formatTime(leftTime);

  return (
    <section className="w-full bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[520px]">

          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="https://ecomtw.baseecom.com/main-files/assets/images/homepage-2/offerThumb2_1.png"
              alt="offer"
              className="w-full max-w-[600px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-center lg:text-left py-8">

            <p className="text-white font-semibold text-[15px] mb-4 uppercase tracking-wide">
              Clearing Sale
            </p>

            <h1 className="text-[32px] sm:text-[44px] lg:text-[54px] font-bold text-white leading-tight">
              “<span className="text-[#C19A6B]">50% Sale</span> On Selected Products”
            </h1>

            <p className="text-white text-[15px] leading-7 mt-5 max-w-[520px] mx-auto lg:mx-0">
              Consectetur adipiscing elit. Integer nunc viverra laoreet est,
              a pretium metus aliquam eget.
            </p>

            {/* TIMER */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

              <div className="w-[85px] h-[85px] rounded-full bg-white shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">{days}</h2>
                <span className="text-gray-500 text-xs">Day</span>
              </div>

              <div className="w-[85px] h-[85px] rounded-full bg-white shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">{hours}</h2>
                <span className="text-gray-500 text-xs">Hour</span>
              </div>

              <div className="w-[85px] h-[85px] rounded-full bg-white shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">{minutes}</h2>
                <span className="text-gray-500 text-xs">Min</span>
              </div>

              <div className="w-[85px] h-[85px] rounded-full bg-white shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">{seconds}</h2>
                <span className="text-gray-500 text-xs">Sec</span>
              </div>

            </div>

            <button className="mt-10 bg-[#C19A6B] hover:bg-white transition text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105">
              Shop Now
              <ArrowRight size={16} className="inline-block ml-2" />
            </button>

            <p className="mt-8 text-[15px] text-white font-medium">
              Limited Time Offer. Deal ends soon!
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Timer;