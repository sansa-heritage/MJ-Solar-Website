"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ProjectDetails() {
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

  const technicalDetails = [
    { label: "Panel Type", value: "Mono PERC" },
    { label: "Inverter", value: "String Inverter" },
    { label: "Mounting Structure", value: "GI Fixed Tilt" },
    { label: "Area", value: "10 Acres" },
    { label: "Annual Generation", value: "7.5 Million Units" },
    { label: "Grid Connection", value: "11 KV On-Grid" },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Technical Details Card */}
          <div className={`bg-white rounded-xl shadow-lg p-7 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-[#d97706] text-xl font-bold uppercase mb-6">
              Technical Details
            </h2>

            <div>
              {technicalDetails.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 py-4 border-b border-gray-200 last:border-b-0 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <span className="font-semibold text-gray-900">
                    {item.label}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions Card */}
          <div className={`bg-white rounded-xl shadow-lg p-7 relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-[#d97706] text-xl font-bold uppercase mb-8">
              Challenges & Solutions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenges */}
              <div>
                <h3 className="font-bold text-lg mb-5">Challenges</h3>
                <ul className="space-y-5">
                  {[
                    "Uneven terrain & land leveling",
                    "High temperature & dust",
                    "Timely material availability"
                  ].map((text, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                      }`}
                      style={{ transitionDelay: `${idx * 150 + 400}ms` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-2"></span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="font-bold text-lg mb-5">Solutions</h3>
                <ul className="space-y-5">
                  {[
                    "Customized plant design",
                    "High efficiency panels",
                    "Strict quality & timely execution"
                  ].map((text, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                      }`}
                      style={{ transitionDelay: `${idx * 150 + 500}ms` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-2"></span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}