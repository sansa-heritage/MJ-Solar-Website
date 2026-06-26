// components/home/Benefits.js - Optimized Heights with Stunning Animations
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-12 md:py-8 overflow-hidden">
      <div className="container-main">
        <div className={`flex flex-col lg:flex-row gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* LEFT CARD - Card with Slide & Float */}
          <div className="group bg-[#F8EBFF] p-6 md:p-8 rounded-[24px] flex-1 flex flex-col min-h-[400px] md:min-h-[440px] relative overflow-hidden card-float-left">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FE4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Decorative Orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#7B3FE4]/5 group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="flex-1 flex flex-col relative z-10">
              <p className="text-[#0D0050] text-[20px] md:text-[20px] font-semibold uppercase animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                REDUCE ELECTRICITY BILLS
              </p>
              <h2 className="text-[38px] md:text-[38px] font-bold mt-3 md:mt-4 leading-tight animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                Generate Your Own
                <br />
                Clean Energy
              </h2>
              <p className="mt-3 md:mt-4 text-[#666] text-sm md:text-base animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                Switch to solar and reduce electricity bills by up to 90%.
              </p>
              <button className="mt-4 md:mt-6 bg-[#6B46E5] text-white px-4 md:px-5 py-2 md:py-3 rounded-lg text-sm md:text-base w-fit group-hover:bg-[#7B3FE4] transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-left pulse-btn" style={{ animationDelay: '0.4s' }}>
                Apply Now →
              </button>
            </div>
            <div className="mt-auto pt-4 md:pt-6 flex justify-end relative z-10">
              <div className="animate-float-slow">
                <Image
                  src="/images/benefits/Frame.svg"
                  alt="graph"
                  width={232}
                  height={238}
                  className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] object-contain group-hover:scale-110 transition-transform duration-700"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>

          {/* CENTER IMAGE - Zoom & Scale on Hover */}
          <div className="rounded-[24px] overflow-hidden flex-1 min-h-[400px] md:min-h-[440px] relative group image-zoom-container">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <Image
              src="/images/benefits/benefits1.png"
              alt="solar worker"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
              priority
            />
            {/* Glow overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#7B3FE4]/20 via-transparent to-transparent z-10"></div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 flex-1">
            {/* TOP CARD - Slide & Glow */}
            <div className="group bg-[#FEEFE1] rounded-[24px] p-5 md:p-6 flex-1 flex flex-col min-h-[180px] md:min-h-[200px] relative overflow-hidden card-float-right">
              {/* Animated Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="flex-1 relative z-10">
                <p className="text-[#0D0050] text-[10px] md:text-sm font-semibold uppercase tracking-wider animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  ECO FRIENDLY SOLUTION
                </p>
                <h2 className="text-[20px] md:text-[32px] font-bold text-[#15153D] mt-1 md:mt-2 leading-tight animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                  A Greener Way
                  <br />
                  to a Better Future
                </h2>
                <p className="text-[#666] mt-1 md:mt-2 leading-5 text-sm md:text-[20px] animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                  Clean, renewable energy for a sustainable planet.
                </p>
              </div>
              <div className="mt-3 md:mt-4 flex justify-end relative z-10">
                <div className="border-2 border-[#A84600] rounded-lg p-2 md:p-3 inline-flex items-center justify-center group/leaf hover:border-[#7B3FE4] transition-all duration-300 hover:shadow-lg animate-float-icon" style={{ animationDelay: '0.4s' }}>
                  <Image
                    src="/images/benefits/leaf-icon.png"
                    alt="Leaf icon"
                    width={35}
                    height={35}
                    className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] object-contain group-hover/leaf:scale-110 group-hover/leaf:rotate-12 transition-transform duration-500"
                    quality={100}
                  />
                </div>
              </div>
            </div>
            
            {/* BOTTOM IMAGE - Parallax & Scale */}
            <div className="rounded-[24px] overflow-hidden min-h-[200px] md:min-h-[220px] lg:min-h-[240px] relative group image-zoom-container-bottom">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <Image
                src="/images/benefits/1st image.png"
                alt="solar team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-5px]"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
              />
              {/* Animated overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent z-20">
                <p className="text-white text-sm font-medium">Solar Energy for Everyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* === ENTRANCE ANIMATIONS === */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          opacity: 0;
          animation: slideInLeft 0.7s ease-out forwards;
        }

        .animate-slide-in-right {
          opacity: 0;
          animation: slideInRight 0.7s ease-out forwards;
        }

        /* === FLOATING ANIMATIONS === */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }

        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .animate-float-icon {
          animation: floatIcon 4s ease-in-out infinite;
        }

        /* === CARD FLOATING (Staggered) === */
        .card-float-left {
          animation: cardFloatLeft 6s ease-in-out infinite;
        }

        .card-float-right {
          animation: cardFloatRight 6s ease-in-out infinite;
        }

        @keyframes cardFloatLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-0.5deg); }
        }

        @keyframes cardFloatRight {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }

        /* === PULSE BUTTON === */
        @keyframes pulseBtn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(107, 70, 229, 0.4); }
          50% { box-shadow: 0 0 0 15px rgba(107, 70, 229, 0); }
        }

        .pulse-btn {
          animation: pulseBtn 2s ease-in-out infinite;
        }

        /* === IMAGE ZOOM CONTAINER === */
        .image-zoom-container {
          overflow: hidden;
        }

        .image-zoom-container-bottom {
          overflow: hidden;
        }

        /* === RESPONSIVE ADJUSTMENTS === */
        @media (max-width: 768px) {
          .card-float-left,
          .card-float-right {
            animation: none;
          }
          
          .animate-float-slow {
            animation-duration: 3s;
          }
          
          .animate-float-icon {
            animation-duration: 3s;
          }
        }

        /* === HOVER GLOW EFFECTS === */
        .group:hover .hover-glow {
          opacity: 1;
        }

        /* === SHIMMER EFFECT === */
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}