"use client";

import { FiFileText, FiArrowRight } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SolarCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const handleWhatsAppClick = () => {
    const phoneNumber = '918280508088';
    const message = 'Hi MAA JOGOMAYA ENERGY, I want to know more about solar solutions.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleContactClick = () => {
    if (pathname === '/') {
      // On home page - scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash
        window.history.pushState(null, '', '#contact');
      } else {
        // Fallback: try to find it after a delay
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '#contact');
          }
        }, 300);
      }
    } else {
      // On other pages - navigate to home with hash
      router.push('/#contact');
    }
  };

  return (
    <section className="w-full gap-10 overflow-hidden" ref={sectionRef}>
      <div className={`mx-auto max-w-7xl rounded-2xl bg-[#7257B3] px-8 py-5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Content */}
          <div className={`flex items-center gap-5 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            {/* Icon Circle with pulse */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white flex-shrink-0 animate-pulse-slow">
              <FiFileText className="text-3xl text-[#E07A1A] transition-transform duration-300 hover:scale-110" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Want a similar solar project?
              </h2>

              <p className="mt-1 max-w-xl text-[17px] leading-relaxed text-white/90">
                Let's discuss how we can help you save more and build a
                sustainable future.
              </p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Get Quote - WhatsApp */}
            <button 
              onClick={handleWhatsAppClick} 
              className="group flex items-center gap-3 rounded-lg bg-white px-8 py-4 font-medium text-[#E07A1A] transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Get a Quote
              <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Contact Us */}
            <button 
              onClick={handleContactClick}
              className="group flex items-center gap-3 rounded-lg border border-white px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-[#7257B3] hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Contact Us
              <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}