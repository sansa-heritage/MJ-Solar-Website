"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Learn() {
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
    <section className="max-w-7xl mx-auto my-16 p-8 md:p-12 overflow-hidden" ref={sectionRef}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text Content */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          {/* Label */}
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-wide animate-fade-in" style={{ animationDelay: '0.1s' }}>
            About Us
          </span>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mt-2 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            About Maa Jogaamaya Energy
          </h2>
          
          {/* Description */}
          <p className="text-orange-500 text-2xl leading-relaxed mb-4 font-semibold animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Maa Jogaamaya Energy is a subsidiary company of Maa Jogaamaya Groups.
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            We specialize in delivering end-to-end solar energy solutions including engineering, 
            procurement, installation and maintenance. With a strong focus on innovation, 
            quality and sustainability, we help homes, businesses and industries transition 
            towards clean and renewable energy.
          </p>
          
          {/* Button */}
          <Link 
            href="#"
            className="group inline-block bg-[#6E4EA9] hover:bg-[#6D51A9] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            <span className="flex items-center gap-2">
              Learn More About Us
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
        
        {/* Right Side - Image with Float & Zoom */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl group">
            <Image 
              src="/images/aboutHero/learn.png"
              alt="MAA JOGAAMAYA ENERGY PVT. LTD"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay with gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Subtle floating badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="text-[#6E4EA9] font-semibold text-sm">⚡ Clean Energy</span>
            </div>
          </div>
        </div>
        
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}