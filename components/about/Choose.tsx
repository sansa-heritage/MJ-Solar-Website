"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Choose() {
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
      { threshold: 0.15 }
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

  const features = [
    {
      title: "Quality Assured",
      description: "We use high-quality equipment and follow international standards.",
      icon: "/images/aboutHero/mdi_shield-tick-outline.png",
      alt: "Quality Assured",
    },
    {
      title: "Expert Engineering",
      description: "Our skilled team ensures efficient and safe project execution.",
      icon: "/images/aboutHero/ic_outline-engineering.png",
      alt: "Expert Engineering",
    },
    {
      title: "Turnkey Solutions",
      description: "From consultation to commissioning, we handle everything.",
      icon: "/images/aboutHero/fluent-mdl2_repair.png",
      alt: "Turnkey Solutions",
    },
    {
      title: "Reliable Support",
      description: "We provide 24/7 support and maintenance for hassle-free operations.",
      icon: "/images/aboutHero/streamline-plump_customer-support-3.png",
      alt: "Reliable Support",
    },
    {
      title: "Sustainable Future",
      description: "We are committed to reducing carbon footprint and building a cleaner future.",
      icon: "/images/aboutHero/garden_leaf-stroke-16.png",
      alt: "Sustainable Future",
    },
  ];

  return (
    <section className="py-20 px-4 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <h3 className="text-orange-500 font-bold text-md uppercase tracking-wider mb-2">
            WHY CHOOSE US
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Delivery Excellence In Every Project
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const delay = index * 150;
            return (
              <div
                key={index}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 text-center border border-gray-100 hover:border-orange-400 relative overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0 animate-float' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${delay}ms`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-100/0 group-hover:from-orange-50/80 group-hover:via-orange-50/40 group-hover:to-orange-100/30 transition-all duration-700"></div>

                {/* Icon */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-orange-400 bg-white mb-4 transition-all duration-500 group-hover:border-orange-500 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  <Image
                    src={feature.icon}
                    alt={feature.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  />
                </div>

                <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-orange-500">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">
                  {feature.description}
                </p>

                {/* Decorative dot */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-orange-200/20 group-hover:bg-orange-400/30 transition-all duration-500 group-hover:scale-150"></div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: floatCard 6s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 4s;
          }
        }
      `}</style>
    </section>
  );
}