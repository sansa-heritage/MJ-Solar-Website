"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Import images
import ProjectsIcon from "@/public/images/aboutHero/hugeicons_solar-panel.png";
import ExpertsIcon from "@/public/images/aboutHero/temaki_power.png";
import ClientsIcon from "@/public/images/aboutHero/mynaui_users.png";
import ExperienceIcon from "@/public/images/aboutHero/la_award.png";

export default function KeyHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // State for animated numbers
  const [counts, setCounts] = useState({
    projects: 0,
    experts: 0,
    clients: 0,
    experience: 0,
  });

  // Target values (without +)
  const targets = {
    projects: 150,
    experts: 50,
    clients: 100,
    experience: 10,
  };

  // Suffixes for display
  const suffixes = {
    projects: "+",
    experts: "+",
    clients: "+",
    experience: "+",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
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

  // Counting animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: 1 - (1-t)^3
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.round(targets.projects * eased),
        experts: Math.round(targets.experts * eased),
        clients: Math.round(targets.clients * eased),
        experience: Math.round(targets.experience * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final exact values
        setCounts({
          projects: targets.projects,
          experts: targets.experts,
          clients: targets.clients,
          experience: targets.experience,
        });
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const highlights = [
    {
      key: "projects",
      number: counts.projects + suffixes.projects,
      text: "Projects Completed",
      icon: ProjectsIcon,
      alt: "Projects Completed",
    },
    {
      key: "experts",
      number: counts.experts + suffixes.experts,
      text: "NRI Industrial Experts",
      icon: ExpertsIcon,
      alt: "NRI Industrial Experts",
    },
    {
      key: "clients",
      number: counts.clients + suffixes.clients,
      text: "Happy Clients",
      icon: ClientsIcon,
      alt: "Happy Clients",
    },
    {
      key: "experience",
      number: counts.experience + suffixes.experience,
      text: "Years of Experience",
      icon: ExperienceIcon,
      alt: "Years of Experience",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`w-full flex justify-center py-6 bg-gray-100 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="w-full max-w-[75rem] bg-gradient-to-r from-[#6E4DA8] to-[#6B58AA] rounded-xl px-6 py-5 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* Left Title */}
          <div className="text-white">
            <h2 className="text-xl font-bold leading-tight">
              Our Key <br />
              Highlights
            </h2>
          </div>

          {/* Stats */}
          {highlights.map((item, index) => (
            <div
              key={item.key}
              className="flex items-center gap-3 text-white group transition-all duration-500 hover:scale-105 hover:bg-white/10 rounded-lg p-2"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={32}
                  height={32}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold tabular-nums">
                  {item.number}
                </h3>
                <p className="text-xs text-gray-200">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}