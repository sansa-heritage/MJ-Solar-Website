"use client";

import Image from 'next/image';
import { LuLeaf } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";

export default function Commitment() {
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
    <section className="py-12 md:py-20 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h5 className="text-orange-500 uppercase text-xs md:text-md font-bold tracking-wider mb-2 animate-fade-in">
            Our Commitment
          </h5>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 animate-slide-up">
            Guided by Values, Driven by Purpose
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side - Mission, Vision, Values */}
          <div className="relative">
            {/* Vertical Line - Draw from top to bottom */}
            <div className={`absolute left-[30px] md:left-[38px] top-[30px] bottom-[30px] w-[3px] bg-gradient-to-b from-orange-400 via-orange-500 to-orange-400 rounded-full transition-all duration-1000 ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`} style={{ transformOrigin: 'top' }}></div>
            
            <div className="space-y-6 md:space-y-8">
              
              {/* Mission */}
              <div className={`flex items-start gap-4 md:gap-6 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`} style={{ transitionDelay: '100ms' }}>
                {/* Connector dot with pulse */}
                <div className="absolute left-[27px] md:left-[35px] top-[20px] w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-md animate-pulse-dot"></div>
                
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0 bg-white shadow-md z-10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-6">
                  <Image
                    src="/images/aboutHero/tabler_target-arrow.png"
                    alt="Our Mission"
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:rotate-12"
                  />
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-orange-500">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    To deliver innovation and sustainable solar energy solutions
                    that empower communities and protect the planet.
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="ml-8 md:ml-10 h-6 md:h-8"></div>

              {/* Vision */}
              <div className={`flex items-start gap-4 md:gap-6 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="absolute left-[27px] md:left-[35px] top-[20px] w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-md animate-pulse-dot" style={{ animationDelay: '0.3s' }}></div>
                
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0 bg-white shadow-md z-10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:-rotate-6">
                  <Image
                    src="/images/aboutHero/f7_eye.png"
                    alt="Our Vision"
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:-rotate-12"
                  />
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-orange-500">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    To be a leading renewable energy company recognized for
                    excellence, innovation and sustainability.
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="ml-8 md:ml-10 h-6 md:h-8"></div>

              {/* Values */}
              <div className={`flex items-start gap-4 md:gap-6 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`} style={{ transitionDelay: '500ms' }}>
                <div className="absolute left-[27px] md:left-[35px] top-[20px] w-3 h-3 rounded-full bg-orange-500 border-2 border-white shadow-md animate-pulse-dot" style={{ animationDelay: '0.6s' }}></div>
                
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0 bg-white shadow-md z-10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-12">
                  <Image
                    src="/images/aboutHero/famicons_diamond-outline.png"
                    alt="Our Values"
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-9 md:h-9 object-contain transition-transform duration-500 group-hover:rotate-6"
                  />
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-orange-500">
                    Our Values
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Integrity, quality, customer satisfaction and sustainability
                    are at the core of everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Overlay Card */}
          <div className={`relative flex justify-center mt-10 lg:mt-0 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Image with float & scale on hover */}
              <div className="group relative rounded-lg overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl">
                <Image
                  src="/images/aboutHero/commitment.png"
                  alt="MAA JOGOMAYA ENERGY Commitment to Solar Excellence"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Overlay Card - slides up and floats */}
              <div className="absolute -left-3 sm:-left-6 bottom-4 sm:bottom-8 bg-gradient-to-r from-[#6654D9] to-[#7B63E8] rounded-xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center gap-3 sm:gap-5 shadow-2xl animate-float-card">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center bg-white/10 transition-all duration-500 hover:scale-110 hover:bg-white/20">
                  <LuLeaf className="text-white text-xl sm:text-2xl md:text-3xl transition-transform duration-500 hover:rotate-12" />
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base md:text-lg leading-tight font-semibold">
                    Committed to a
                  </h4>
                  <h4 className="text-white text-sm sm:text-base md:text-lg font-semibold">
                    Greener Tomorrow
                  </h4>
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
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
        }

        /* Pulse dot continuous */
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .animate-pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }

        /* Float card continuous */
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }

        /* Scale the vertical line */
        .scale-y-0 {
          transform: scaleY(0);
        }
        .scale-y-100 {
          transform: scaleY(1);
        }

        /* Hover shadow 3xl */
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          .animate-float-card {
            animation-duration: 3s;
          }
          .animate-pulse-dot {
            animation-duration: 1.5s;
          }
        }
      `}</style>
    </section>
  );
}