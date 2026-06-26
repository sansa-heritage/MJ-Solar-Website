"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function ProjectGallery() {
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

  const galleryImages = [
    "/images/project/Solar1.png",
    "/images/project/Solar2.png",
    "/images/project/Meter.png",
    "/images/project/Solar3.png",
  ];

  return (
    <section className="py-12 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative h-[180px] overflow-hidden rounded-lg shadow-md transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              {/* Optional subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                <span className="absolute bottom-3 left-3 text-white text-sm font-medium">
                  Project #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}