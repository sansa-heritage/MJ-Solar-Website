"use client";

import {
  ClipboardList,
  SolarPanel,
  IndianRupee,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Register",
    description: "Fill the online registration form on the portal.",
    iconBg: "bg-[#FFF5E6]",
    iconColor: "text-[#FF8C2F]",
    numberBg: "bg-[#FF8C2F]",
    numberColor: "text-white",
  },
  {
    number: "02",
    icon: SolarPanel,
    title: "Installation",
    description: "Our team will install the solar system at your home.",
    iconBg: "bg-[#F0E6FF]",
    iconColor: "text-[#7B3FE4]",
    numberBg: "bg-[#7B3FE4]",
    numberColor: "text-white",
  },
  {
    number: "03",
    icon: IndianRupee,
    title: "Get Subsidy",
    description: "Get up to ₹1,30,000 subsidy directly in your bank account.",
    iconBg: "bg-[#FCE4EC]",
    iconColor: "text-[#E91E63]",
    numberBg: "bg-[#E91E63]",
    numberColor: "text-white",
  },
  {
    number: "04",
    icon: FileText,
    title: "Documentation",
    description: "",
    iconBg: "bg-[#E0F7FA]",
    iconColor: "text-[#00BCD4]",
    numberBg: "bg-[#00BCD4]",
    numberColor: "text-white",
  },
];

export default function Subsidy() {
  const [isVisible, setIsVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    savings: 0,
    subsidy: 0,
    warranty: 0,
    customers: 0,
  });
  const countingStarted = useRef(false);

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

  // Start counting after the stats card animation completes (800ms delay + 200ms extra)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCountStarted(true);
      }, 1000); // 800ms card animation + 200ms buffer
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Counting animation
  useEffect(() => {
    if (!countStarted || countingStarted.current) return;
    countingStarted.current = true;

    const duration = 2000;
    const startTime = performance.now();
    const targets = {
      savings: 90,
      subsidy: 1.5,
      warranty: 25,
      customers: 1000,
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        savings: Math.round(targets.savings * eased),
        subsidy: parseFloat((targets.subsidy * eased).toFixed(1)),
        warranty: Math.round(targets.warranty * eased),
        customers: Math.round(targets.customers * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final exact values
        setCounts({
          savings: targets.savings,
          subsidy: targets.subsidy,
          warranty: targets.warranty,
          customers: targets.customers,
        });
      }
    };

    requestAnimationFrame(animate);
  }, [countStarted]);

  return (
    <section className="py-8 px-8" ref={sectionRef}>
      <div className="Subsidy">
        <div className="bg-white rounded-[30px] p-12 shadow-sm relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#7B3FE4]/5 animate-pulse-slow"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#FF8C2F]/5 animate-pulse-slow delay-1000"></div>

          {/* Heading */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#EA6301] text-md font-bold uppercase tracking-wider animate-fade-in" style={{ animationDelay: '0.1s' }}>
              PM SURYA GHAR YOJANA
            </p>
            <h2 className="text-[42px] font-bold text-[#15153D] mt-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Government Subsidy Program
            </h2>
            <p className="text-gray-500 mt-2 text-[14] animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Simple steps to get your rooftop solar system with government subsidy.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Animated dashed line */}
            <div className={`absolute top-12 left-0 w-full border-t-2 border-dashed border-gray-300 transition-all duration-1500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transformOrigin: 'left' }}></div>

            <div className="grid lg:grid-cols-4 gap-10 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const delay = index * 150 + 400;

                return (
                  <div
                    key={index}
                    className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className="relative inline-block group">
                      {/* Animated icon circle with hover effect */}
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${step.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6`}>
                        <Icon size={42} className={`${step.iconColor} transition-transform duration-500 group-hover:scale-110`} />
                      </div>

                      {/* Number badge with pulse on hover */}
                      <div className={`absolute -top-2 -right-2 w-10 h-10 ${step.numberBg} ${step.numberColor} rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:animate-pulse`}>
                        {step.number}
                      </div>
                    </div>

                    <h3 className="font-bold text-[#15153D] mt-6 transition-colors duration-300 group-hover:text-[#7B3FE4]">
                      {step.title}
                    </h3>

                    {step.title !== "Documentation" ? (
                      <p className="text-gray-500 text-sm mt-2 transition-all duration-300 group-hover:text-gray-700">
                        {step.description}
                      </p>
                    ) : (
                      <ul className="text-left text-sm mt-3 space-y-1 inline-block transition-all duration-300 group-hover:text-gray-700">
                        <li className="flex items-center gap-2"><span className="text-[#00BCD4]">1.</span> Aadhaar</li>
                        <li className="flex items-center gap-2"><span className="text-[#00BCD4]">2.</span> Electricity Bill</li>
                        <li className="flex items-center gap-2"><span className="text-[#00BCD4]">3.</span> Photo</li>
                        <li className="flex items-center gap-2"><span className="text-[#00BCD4]">4.</span> Bank Passbook</li>
                        <li className="flex items-center gap-2"><span className="text-[#00BCD4]">5.</span> Cancelled Cheque</li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Stats Banner */}
        <div className={`mt-16 bg-gradient-to-r from-[#6E4DA8] to-[#6B58AA] rounded-[22px] px-6 md:px-10 py-8 md:py-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`} style={{ transitionDelay: '800ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-6 md:gap-8 text-white">
            
            {/* Stat 1 - Save on Electricity Bills */}
            <div className="flex items-center gap-4 md:gap-5 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:bg-white/30 transition-all duration-500">
                <Image
                  src="/images/subsidy/sun_icon_gradient 1.svg"
                  alt="Savings"
                  width={56}
                  height={56}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums">
                  {counts.savings}%
                </h3>
                <p className="text-[11px] md:text-sm lg:text-base opacity-90">Save on Electricity Bills</p>
              </div>
            </div>

            {/* Stat 2 - Government Subsidy */}
            <div className="flex items-center gap-4 md:gap-5 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:bg-white/30 transition-all duration-500">
                <Image
                  src="/images/subsidy/Group-icon.svg"
                  alt="Subsidy"
                  width={56}
                  height={56}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums">
                  ₹{counts.subsidy}L+
                </h3>
                <p className="text-[11px] md:text-sm lg:text-base opacity-90">Government Subsidy</p>
              </div>
            </div>

            {/* Stat 3 - Performance Warranty */}
            <div className="flex items-center gap-4 md:gap-5 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:bg-white/30 transition-all duration-500">
                <Image
                  src="/images/subsidy/Warranty_Badge_Gradient 1.svg"
                  alt="Warranty"
                  width={56}
                  height={56}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums">
                  {counts.warranty} Years
                </h3>
                <p className="text-[11px] md:text-sm lg:text-base opacity-90">Performance Warranty</p>
              </div>
            </div>

            {/* Stat 4 - Happy Customers */}
            <div className="flex items-center gap-4 md:gap-5 group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:bg-white/30 transition-all duration-500">
                <Image
                  src="/images/subsidy/Users_Gradient 1.svg"
                  alt="Customers"
                  width={56}
                  height={56}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums">
                  {counts.customers}+
                </h3>
                <p className="text-[11px] md:text-sm lg:text-base opacity-90">Happy Customers</p>
              </div>
            </div>

            {/* Stat 5 - Solar Banner Image */}
            <div className="flex justify-center col-span-2 md:col-span-3 lg:col-span-1 group">
              <Image
                src="/images/hero/solar-banner.png"
                alt="Solar"
                width={160}
                height={140}
                className="h-20 md:h-24 lg:h-32 w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>

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
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .transition-all-1500 {
          transition: all 1.5s ease-in-out;
        }

        .scale-x-0 {
          transform: scaleX(0);
        }
        .scale-x-100 {
          transform: scaleX(1);
        }

        /* Group hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        .group:hover .group-hover\\:rotate-6 {
          transform: rotate(6deg);
        }
        .group:hover .group-hover\\:-rotate-12 {
          transform: rotate(-12deg);
        }
        .group:hover .group-hover\\:rotate-3 {
          transform: rotate(3deg);
        }

        /* Additional hover effects for icons */
        .group-hover\\:shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* For the number badge pulse on hover */
        .group-hover\\:animate-pulse {
          animation: pulse 0.6s ease-in-out 2;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* Tabular numbers for consistent width */
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </section>
  );
}