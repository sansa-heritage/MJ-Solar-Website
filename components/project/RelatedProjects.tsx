"use client";

import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "Industrial Solar Project",
    location: "Odisha",
    capacity: "3 MW",
    image: "/images/project/Solar4.png",
    active: false,
  },
  {
    title: "Rooftop Solar Project",
    location: "Bhubaneswar",
    capacity: "500 KW",
    image: "/images/project/Solar5.png",
    active: true,
  },
  {
    title: "Commercial Solar Project",
    location: "Cuttack",
    capacity: "1 MW",
    image: "/images/project/Solar6.png",
    active: false,
  },
  {
    title: "Ground Mounted Project",
    location: "Odisha",
    capacity: "2 MW",
    image: "/images/project/Solar7.png",
    active: false,
  },
];

export default function RelatedProjects() {
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

  return (
    <section className="bg-[#f5f5f5] py-12 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className={`text-[#d97706] uppercase text-sm font-bold tracking-wide mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          Related Projects
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              } hover:-translate-y-2 hover:shadow-2xl ${
                project.active ? 'ring-2 ring-[#1E88E5] ring-offset-2' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Active badge */}
                {project.active && (
                  <span className="absolute top-3 right-3 bg-[#1E88E5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse-slow">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[28px] font-semibold text-gray-900 mb-4 group-hover:text-[#d97706] transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <MapPin
                    size={14}
                    className="text-[#d97706] mr-2 flex-shrink-0"
                  />
                  <span>{project.location}</span>
                  <span className="mx-2">|</span>
                  <span>{project.capacity}</span>
                </div>

                {/* <button className="group/btn flex items-center gap-2 text-[#d97706] text-sm font-medium transition-all duration-300 hover:gap-3">
                  View Project
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button> */}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}