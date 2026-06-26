"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    image: "/images/testimonials/customer2.jpg",
    review: "Excellent service and hassle free. Big savings on electricity bills.",
  },
  {
    name: "Sunita Sharma",
    image: "/images/testimonials/customer2.jpg",
    review: "Very professional team and timely installation. Highly recommend!",
  },
  {
    name: "Amit Verma",
    image: "/images/testimonials/customer2.jpg",
    review: "Best decision for my home. Thanks to PM Surya Ghar Yojana!",
  },
  {
    name: "Priya Patel",
    image: "/images/testimonials/customer2.jpg",
    review: "The solar panels have reduced my electricity bill by 80%. Amazing!",
  },
  {
    name: "Vikram Singh",
    image: "/images/testimonials/customer2.jpg",
    review: "Professional team, quality products, and excellent after-sales support.",
  },
  {
    name: "Neha Gupta",
    image: "/images/testimonials/customer2.jpg",
    review: "I love the transparency and the subsidy process was very smooth.",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 3); // 3 cards per slide

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-8">
      <div className="container-main">

        {/* Heading */}
        <div className="text-center">
          <p className="text-orange-500 text-[18px] font-bold uppercase tracking-widest">
            Testimonials
          </p>
          <h2 className="text-[42px] font-bold text-[#15153D] mt-2">
            What Our Customers Say
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-12 h-[4px] rounded-full bg-gradient-to-r from-[#7B3FE4] to-[#FF8C2F]" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
              >
                {testimonials
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-[#ececec] rounded-[18px] p-8 shadow-sm"
                    >
                      <Quote size={20} className="text-[#7B3FE4] mb-5" />

                      <div className="flex items-center gap-4">
                        <div className="relative w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#15153D]">
                            {item.name}
                          </h4>
                          <div className="text-[#FFB400] text-sm">★★★★★</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-6 leading-7">
                        {item.review}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots (non‑interactive indicators) */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-500 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}