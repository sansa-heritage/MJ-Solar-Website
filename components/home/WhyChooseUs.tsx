// components/home/WhyChooseUs.js - Responsive with Floating Animations
"use client";

import Image from "next/image";

import GovtIcon from "@/public/images/benefits/Group 1000004861.png";
import WarrantyIcon from "@/public/images/benefits/Group 1000004862.png";
import InstallationIcon from "@/public/images/benefits/Group 1000004863.png";
import ClientsIcon from "@/public/images/benefits/Group 1000004864.png";

const features = [
  { icon: GovtIcon, title: "Govt Approved", subtitle: "MNRE approved installer", alt: "Government Approved" },
  { icon: WarrantyIcon, title: "25 Years Warranty", subtitle: "Long-lasting performance", alt: "Warranty" },
  { icon: InstallationIcon, title: "Fast Installation", subtitle: "Quick & seamless install", alt: "Installation" },
  { icon: ClientsIcon, title: "1000+ Clients", subtitle: "Serving happy customers", alt: "Clients" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-8 overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <p className="text-orange-500 text-[18px] md:text-[18px] font-bold uppercase tracking-[2px] animate-fade-down">
            WHY CHOOSE US
          </p>
          <h2 className="mt-2 text-[28px] sm:text-[36px] md:text-[48px] font-bold text-[#15153D] animate-fade-down animation-delay-200">
            Trusted. Reliable. Efficient.
          </h2>
          <div className="flex justify-center mt-2 md:mt-3 animate-fade-down animation-delay-400">
            <div className="w-10 md:w-12 h-[3px] rounded-full bg-gradient-to-r from-[#7B3FE4] to-[#FF8C2F]" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((item, index) => {
            const delay = index * 150;
            return (
              <div
                key={index}
                className="group bg-white border border-[#521467] rounded-[20px] px-5 md:px-6 py-6 md:py-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7B3FE4] float-card"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="icon-wrapper relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7B3FE4]/10 to-[#FF8C2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={70}
                    height={70}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain relative z-10 icon-float"
                    style={{ animationDelay: `${delay + 200}ms` }}
                  />
                </div>
                <h3 className="font-bold text-[16px] md:text-[18px] text-[#15153D] mt-3 md:mt-4 group-hover:text-[#7B3FE4] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-1 md:mt-2 text-[12px] md:text-[14px] text-[#777] group-hover:text-[#555] transition-colors duration-300">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* Floating animation for cards */
        .float-card {
          animation: floatCard 4s ease-in-out infinite;
          will-change: transform;
        }

        .float-card:nth-child(1) { animation-delay: 0s; }
        .float-card:nth-child(2) { animation-delay: 0.3s; }
        .float-card:nth-child(3) { animation-delay: 0.6s; }
        .float-card:nth-child(4) { animation-delay: 0.9s; }

        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        /* Floating animation for icons (subtle and separate) */
        .icon-float {
          animation: floatIcon 3s ease-in-out infinite;
          will-change: transform;
        }

        .icon-float:nth-child(1) { animation-delay: 0.1s; }
        .icon-float:nth-child(2) { animation-delay: 0.4s; }
        .icon-float:nth-child(3) { animation-delay: 0.7s; }
        .icon-float:nth-child(4) { animation-delay: 1.0s; }

        @keyframes floatIcon {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }

        /* Entrance animations for header */
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-down {
          animation: fadeDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        /* Hover glow effect for icons */
        .icon-wrapper {
          position: relative;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .float-card {
            animation-duration: 3s;
          }
        }
      `}</style>
    </section>
  );
}