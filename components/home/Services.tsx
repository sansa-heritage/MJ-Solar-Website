"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: "/images/services/hugeicons_solar-panel-05.svg",
    alt: "Rooftop Solar",
    title: "Rooftop Solar",
    description: "Residential rooftop solar solutions.",
  },
  {
    icon: "/images/services/add_business.svg",
    alt: "Commercial Solar",
    title: "Commercial Solar",
    description: "Solar solutions for business & industries.",
  },
  {
    icon: "/images/services/construction.svg",
    alt: "Solar Maintenance",
    title: "Solar Maintenance",
    description: "AMC & maintenance for long life.",
  },
  {
    icon: "/images/services/electric_bolt.svg",
    alt: "Solar Consultation",
    title: "Solar Consultation",
    description: "Expert advice for the best solar solution.",
  },
  {
    icon: "/images/services/solar_power.svg",
    alt: "Net Metering",
    title: "Net Metering",
    description: "Save more with net metering service.",
  },
  {
    icon: "/images/services/subsidy 1.svg",
    alt: "Subsidy Assistance",
    title: "Subsidy Assistance",
    description: "Complete help for subsidy process.",
  },
];

export default function Services() {
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
    <section className="py-8 overflow-hidden" ref={sectionRef} id="services">
      <div className="services" id="services">
        <div className="bg-[#FFF8F7] rounded-[30px] p-6 md:p-10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-orange-200/10 animate-pulse-slow"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-200/10 animate-pulse-slow delay-1000"></div>

          {/* Heading */}
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-500 text-md font-bold uppercase tracking-widest animate-fade-in" style={{ animationDelay: '0.1s' }}>
              OUR SERVICES
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#15153D] mt-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Complete Solar Solutions
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-10">
            {services.map((service, index) => {
              const delay = index * 100 + 300;
              return (
                <div
                  key={index}
                  className={`group bg-white rounded-[20px] p-4 md:p-6 text-center shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border hover:border-orange-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-orange-50 flex items-center justify-center transition-all duration-500 group-hover:bg-orange-100 group-hover:shadow-lg group-hover:scale-110">
                    <Image
                      src={service.icon}
                      alt={service.alt}
                      width={32}
                      height={32}
                      className="w-9 h-9 md:w-10 md:h-10 object-contain transition-transform duration-500 group-hover:rotate-6"
                    />
                  </div>

                  <h3 className="font-semibold text-[#15153D] mt-3 md:mt-4 text-sm md:text-base transition-colors duration-300 group-hover:text-[#7B3FE4]">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3 leading-5 md:leading-6 transition-colors duration-300 group-hover:text-gray-700">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Entrance animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }

        /* Staggered animation delays for cards */
        .transition-delay-300 { transition-delay: 300ms; }
        .transition-delay-400 { transition-delay: 400ms; }
        .transition-delay-500 { transition-delay: 500ms; }
        .transition-delay-600 { transition-delay: 600ms; }
        .transition-delay-700 { transition-delay: 700ms; }
        .transition-delay-800 { transition-delay: 800ms; }
      `}</style>
    </section>
  );
}