"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Explore() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const leftItems = ["Construction", "Real Estate", "Hospitality"];
  const rightItems = ["Energy", "Infrastructure", "Trading & More"];

  return (
    <section className="py-16 px-4 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#6D4BC3] to-[#7B5ACD] rounded-[24px] p-8 lg:p-12 overflow-hidden relative">
          {/* Decorative background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 animate-pulse-slow delay-1000"></div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div
              className={`text-center lg:text-left transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <h4 className="text-white text-xl font-semibold mb-3 animate-fade-in">
                Part of a Strong Foundation
              </h4>

              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 animate-slide-up">
                Maa Jogaamaya Groups
              </h2>

              <p className="text-white text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 animate-slide-up animation-delay-200">
                Being a subsidiary of Maa Jogaamaya Groups gives us a strong
                foundation of trust, expertise and resources. This enables us to
                take on bigger challenges and deliver greater value to our
                customers.
              </p>

              <button className="group bg-[#E9F7EF] text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center lg:justify-start gap-3 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 mx-auto lg:mx-0 animate-slide-up animation-delay-400">
                Explore Our Group
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Right Diagram */}
            <div
              className={`flex justify-center items-center transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
                {/* Left Cards */}
                <div className="flex flex-row sm:flex-col gap-5">
                  {leftItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl px-6 py-3 w-[130px] sm:w-[150px] lg:w-[170px] text-center text-sm font-semibold text-gray-900 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 animate-float-card"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Connector Area */}
                <div className="relative w-[200px] sm:w-[260px] lg:w-[320px] h-[160px] sm:h-[190px] lg:h-[220px]">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 320 220"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Animated dashed lines with stroke-dasharray */}
                    <g className="animate-draw-lines">
                      <line
                        x1="40"
                        y1="40"
                        x2="110"
                        y2="40"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="40"
                        y1="110"
                        x2="110"
                        y2="110"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="40"
                        y1="180"
                        x2="110"
                        y2="180"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="110"
                        y1="40"
                        x2="110"
                        y2="180"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="110"
                        y1="40"
                        x2="130"
                        y2="70"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="110"
                        y1="110"
                        x2="130"
                        y2="110"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="110"
                        y1="180"
                        x2="130"
                        y2="150"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="190"
                        y1="70"
                        x2="210"
                        y2="40"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="190"
                        y1="110"
                        x2="210"
                        y2="110"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="190"
                        y1="150"
                        x2="210"
                        y2="180"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="210"
                        y1="40"
                        x2="210"
                        y2="180"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="210"
                        y1="40"
                        x2="280"
                        y2="40"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="210"
                        y1="110"
                        x2="280"
                        y2="110"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                      <line
                        x1="210"
                        y1="180"
                        x2="280"
                        y2="180"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-80"
                      />
                    </g>

                    {/* Pulsing dots */}
                    <circle cx="110" cy="40" r="4" fill="white" className="animate-pulse-dot" />
                    <circle cx="110" cy="110" r="4" fill="white" className="animate-pulse-dot animation-delay-200" />
                    <circle cx="110" cy="180" r="4" fill="white" className="animate-pulse-dot animation-delay-400" />
                    <circle cx="210" cy="40" r="4" fill="white" className="animate-pulse-dot animation-delay-300" />
                    <circle cx="210" cy="110" r="4" fill="white" className="animate-pulse-dot animation-delay-500" />
                    <circle cx="210" cy="180" r="4" fill="white" className="animate-pulse-dot animation-delay-600" />
                  </svg>

                  {/* Center Logo with scale animation */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-white border-[8px] sm:border-[10px] border-[#1F1F1F] flex items-center justify-center shadow-lg animate-pulse-logo">
                      <Image
                        src="/images/logo/Logo.png"
                        alt="MAA JOGOMAYA ENERGY"
                        width={80}
                        height={80}
                        className="object-contain w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] lg:w-[70px] lg:h-[70px]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="flex flex-row sm:flex-col gap-5">
                  {rightItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl px-6 py-3 w-[130px] sm:w-[150px] lg:w-[170px] text-center text-sm font-semibold text-gray-900 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 animate-float-card"
                      style={{ animationDelay: `${(index + leftItems.length) * 0.2}s` }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Entrance animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }

        /* Float animation for cards */
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }

        /* Pulsing dots */
        @keyframes pulseDot {
          0%, 100% { r: 4; opacity: 0.8; }
          50% { r: 6; opacity: 1; }
        }
        .animate-pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-600 { animation-delay: 600ms; }

        /* Pulsing logo */
        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 30px 10px rgba(255,255,255,0.1); }
        }
        .animate-pulse-logo {
          animation: pulseLogo 3s ease-in-out infinite;
        }

        /* Slow pulse for background elements */
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }

        /* Draw lines animation (optional subtle effect) */
        @keyframes drawLines {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-draw-lines {
          animation: drawLines 1.2s ease-out forwards;
          opacity: 0;
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          .animate-float-card {
            animation-duration: 3s;
          }
          .animate-pulse-logo {
            animation-duration: 2s;
          }
        }
      `}</style>
    </section>
  );
}