"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function AboutHero() {
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

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden" ref={sectionRef}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/aboutHero/solar.png"
          alt="Solar energy"
          fill
          className="object-cover brightness-90 transition-transform duration-[8000ms] hover:scale-110"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        
        {/* Animated decorative glow */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full py-20">
        <div className="container-main max-w-7xl mx-auto px-4">
          {/* Heading with animation effect */}
          <div className="max-w-4xl">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Powering a Sustainable Future with <span className="text-[#EA6301] mt-2">Clean Energy</span>
            </h1>
            
            <div className={`w-24 h-1 bg-orange-500 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`} style={{ transformOrigin: 'left' }}></div>
            
            <p className={`text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              MAA JOGOMAYA ENERGY is committed to providing reliable, affordable 
              and innovative solar energy solutions for a greener tomorrow.
            </p>
            
            {/* Buttons with hover animations */}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                <span className="flex items-center gap-2">
                  Explore Our Services
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              {/* <button className="group bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                <span className="flex items-center gap-2">
                  Get Free Quote
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}