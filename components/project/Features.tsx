"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Import custom icons
import CleanIcon from "@/public/images/project/hugeicons_renewable-energy.png";
import CostIcon from "@/public/images/project/fluent-emoji-high-contrast_leafy-green.png";
import EfficiencyIcon from "@/public/images/project/stash_sun.png";
import EcoIcon from "@/public/images/project/game-icons_butterfly-flower.png";

export default function Features() {
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
      icon: CleanIcon,
      alt: "Clean & Renewable",
      title: "Clean & Renewable",
      description: "100% Clean energy generation",
    },
    {
      icon: CostIcon,
      alt: "Cost Effective",
      title: "Cost Effective",
      description: "Reduced Energy cost for long term",
    },
    {
      icon: EfficiencyIcon,
      alt: "High Efficiency",
      title: "High Efficiency",
      description: "Latest technology for maximum output",
    },
    {
      icon: EcoIcon,
      alt: "Eco Friendly",
      title: "Eco Friendly",
      description: "Zero emissions, better tomorrow",
    },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`bg-[#f5f5f2] rounded-lg px-8 py-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className={`group flex items-center gap-5 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } hover:scale-[1.02] hover:bg-white/50 hover:rounded-xl hover:p-4 hover:-m-2`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon Circle with Orange Border - with float & hover animations */}
                <div className="w-16 h-16 rounded-full border-2 border-orange-500 flex items-center justify-center flex-shrink-0 bg-white transition-all duration-500 group-hover:border-orange-600 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-black text-lg transition-colors duration-300 group-hover:text-orange-500">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mt-1 transition-colors duration-300 group-hover:text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}