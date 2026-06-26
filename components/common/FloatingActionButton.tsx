// components/common/FloatingActionButton.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, X, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface FloatingActionButtonProps {
  phoneNumber?: string;
  whatsappMessage?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function FloatingActionButton({
  phoneNumber = "918280508088",
  whatsappMessage = "Hi MAA JOGOMAYA ENERGY, I want to know more about solar solutions.",
  position = "bottom-right",
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-24 right-6",
    "top-left": "top-24 left-6",
  };

  const actionButtonsPosition = {
    "bottom-right": "flex-col items-end",
    "bottom-left": "flex-col items-start",
    "top-right": "flex-col-reverse items-end",
    "top-left": "flex-col-reverse items-start",
  };

  return (
    <div
      ref={widgetRef}
      className={`fixed ${positionClasses[position]} z-50 flex ${actionButtonsPosition[position]} gap-3`}
    >
      {/* Action buttons - appear when open */}
      {isOpen && (
        <>
          {/* Call Button */}
          <button
            onClick={handleCall}
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105 animate-fade-up"
            style={{ animationDelay: "0ms" }}
            aria-label="Call"
          >
            <span className="bg-gray-900/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-2 group-hover:translate-x-0">
              Call
            </span>
            <div className="w-14 h-14 rounded-full bg-green-500 text-white shadow-xl flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:rotate-6">
              <Phone size={24} />
            </div>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105 animate-fade-up"
            style={{ animationDelay: "100ms" }}
            aria-label="WhatsApp"
          >
            <span className="bg-gray-900/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-2 group-hover:translate-x-0">
              WhatsApp
            </span>
            <div className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#1da851] transition-all duration-300 hover:scale-110 hover:-rotate-6">
              <FaWhatsapp size={28} />
            </div>
          </button>
        </>
      )}

      {/* Main toggle button with pulse animation */}
      <div className="relative">
        {/* Pulse ring */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-pulse-ring">
            <div className="absolute inset-0 rounded-full bg-[#7B3FE4] opacity-30 animate-ping"></div>
          </div>
        )}
        <button
          onClick={toggle}
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
            isOpen
              ? "bg-red-500 hover:bg-red-600 rotate-90"
              : "bg-gradient-to-br from-[#7B3FE4] to-[#8D54FF] hover:shadow-[#7B3FE4]/50"
          } text-white`}
          aria-label={isOpen ? "Close" : "Contact"}
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-500" />
          ) : (
            <PhoneCall size={24} className="transition-transform duration-500 animate-pulse-icon" />
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes pulseIcon {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
        }
        .animate-pulse-ring {
          animation: pulseRing 2s ease-out infinite;
        }
        .animate-pulse-icon {
          animation: pulseIcon 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}