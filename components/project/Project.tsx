"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import {
  MapPin,
  Zap,
  Calendar,
  User,
  Settings,
  Building2,
  ArrowRight,
} from "lucide-react";
import Image from 'next/image';

// Import custom icons
import LocationIcon from "@/public/images/project/basil_location-outline.png";
import CapacityIcon from "@/public/images/project/temaki_power.png";
import CalendarIcon from "@/public/images/project/clarity_calendar-line.png";
import ClientIcon from "@/public/images/project/uil_user.png";
import ServicesIcon from "@/public/images/project/uiw_setting-o.png";
import ProjectTypeIcon from "@/public/images/project/fa7-solid_solar-panel.png";

interface InfoBoxProps {
  icon: ReactNode;
  title: string;
  value: string;
  delay?: number;
}

function InfoBox({ icon, title, value, delay = 0 }: InfoBoxProps) {
  return (
    <div 
      className="group p-7 border border-gray-100 flex gap-4 items-start transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-orange-100 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-orange-500">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1 transition-colors duration-300 group-hover:text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Project() {
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

  const infoBoxes = [
    { icon: <Image src={LocationIcon} alt="Location" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Location", value: "Odisha, India" },
    { icon: <Image src={CapacityIcon} alt="Capacity" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Capacity", value: "5 MW" },
    { icon: <Image src={CalendarIcon} alt="Completion Date" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Completion Date", value: "April 2025" },
    { icon: <Image src={ClientIcon} alt="Client" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Client", value: "Private Client" },
    { icon: <Image src={ServicesIcon} alt="Services Provided" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Services Provided", value: "EPC - Design, Supply, Installation & Commissioning" },
    { icon: <Image src={ProjectTypeIcon} alt="Project Type" width={28} height={28} className="w-7 h-7 object-contain" />, title: "Project Type", value: "On-Grid Solar Plant" },
  ];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/aboutHero/solar.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl animate-hero-text">
            Maa Jogaamaya
            <br />
            Solar Energy Project
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-8 text-white text-lg font-medium animate-hero-text" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="animate-pulse-slow" />
              Odisha, India
            </div>

            <div className="w-px h-6 bg-white/50"></div>

            <div>5MW Capacity</div>
          </div>

          {/* <button className="mt-10 bg-[#7E57C2] hover:bg-[#6d48b0] text-white px-7 py-4 rounded-xl flex items-center gap-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 animate-hero-text" style={{ animationDelay: '400ms' }}>
            Contact Us
            <span className="bg-white text-[#7E57C2] rounded-full p-1 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </button> */}
        </div>
      </section>

      {/* Content Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20" ref={sectionRef}>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left text */}
          <div className={`pt-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <p className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              Project Overview
            </p>

            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              Powering a Sustainable
              <br />
              Tomorrow
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              The Maa Jogaamaya solar energy project is a 5MW solar power plant
              established in Odisha to generate clean, renewable energy. The
              project is designed to reduce carbon footprint and contribute to a
              greener and sustainable future.
            </p>
          </div>

          {/* Info boxes */}
          <div className={`lg:-mt-24 relative z-20 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <div className="grid grid-cols-2">
                {infoBoxes.map((box, index) => (
                  <InfoBox
                    key={index}
                    icon={box.icon}
                    title={box.title}
                    value={box.value}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes heroText {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        .animate-hero-text {
          animation: heroText 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .group-hover\\:translate-x-1:hover {
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .animate-hero-text {
            animation-duration: 0.6s;
          }
        }
      `}</style>
    </div>
  );
}