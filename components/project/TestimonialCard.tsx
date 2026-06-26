"use client";

import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rakesh Kumar",
    role: "Project Head",
    client: "Private Client",
    quote: "Maa Jogaamaya Energy executed the project with great professionalism and delivered beyond our expectations. Highly reliable and efficient team!",
    image: "/images/project/Ellipse.png",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Operations Director",
    client: "Green Energy Ltd",
    quote: "Outstanding service and technical expertise. The solar installation has reduced our electricity costs by 70%. Highly recommended!",
    image: "/images/project/Ellipse.png",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Facility Manager",
    client: "Sunrise Industries",
    quote: "Professional team from start to finish. They handled everything from documentation to installation. Best decision we made for our facility.",
    image: "/images/project/Ellipse.png",
  },
];

export default function TestimonialCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-[78rem] mx-auto px-4 mt-3">
      <div className="rounded-xl shadow-md border border-gray-200 p-6 md:p-8 bg-white">
        
        {/* Testimonial Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left Content - Quote */}
          <div className="flex flex-1">
            <FaQuoteLeft className="text-orange-500 text-2xl md:text-3xl flex-shrink-0 mt-1" />
            <p className="text-gray-900 text-base md:text-lg leading-relaxed max-w-xl gap-6 ml-3">
              {testimonials[currentIndex].quote}
            </p>
          </div>

          {/* Right Profile */}
          <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
            <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                fill
                className="rounded-full object-cover"
                sizes="64px"
              />
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg text-black">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-gray-700 text-xs md:text-sm">
                {testimonials[currentIndex].role}
              </p>
              <p className="text-gray-700 text-xs md:text-sm">
                {testimonials[currentIndex].client}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-6 md:mt-8">
          <button
            onClick={prevSlide}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} className="md:w-[20px] md:h-[20px]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} className="md:w-[20px] md:h-[20px]" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                currentIndex === index
                  ? "w-6 md:w-8 h-2.5 md:h-3 rounded-full bg-orange-500"
                  : "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}