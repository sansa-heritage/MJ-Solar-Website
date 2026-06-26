"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
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
      { threshold: 0.2 }
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!formData.city.trim()) {
      setError("Please enter your city");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
          message: "",
        });
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-8 overflow-hidden" id="contact" ref={sectionRef}>
      <div className="footer">
        <div className="bg-gradient-to-r from-[#5E54A4] to-[#7051AE] overflow-hidden shadow-xl rounded-4xl relative">
          {/* Animated decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 animate-pulse-slow delay-1000"></div>

          <div className="grid lg:grid-cols-[300px_1fr_520px] xl:grid-cols-[400px_1fr_600px]">
            
            {/* Left - Image Section with Zoom & Float */}
            <div className={`relative min-h-[400px] lg:min-h-[400px] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent z-10"></div>
              <Image
                src="/engineer.png"
                alt="Engineer"
                fill
                className="object-cover object-center rounded-4xl transition-transform duration-700 hover:scale-105"
                priority
              />
              {/* Floating badge on image */}
              {/* <div className="absolute bottom-6 left-6 z-20 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 border border-white/30 animate-float-badge">
                <span className="text-white text-sm font-semibold">⭐ 4.9/5</span>
              </div> */}
            </div>

            {/* Middle - Contact Info with Slide-up */}
            <div className={`p-6 md:p-8 lg:p-10 text-white text-center lg:text-left flex flex-col justify-center transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="uppercase text-[10px] md:text-xs tracking-widest opacity-80 animate-fade-in">
                Get In Touch
              </p>
              <h2 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold leading-tight mt-2 animate-slide-up">
                Ready to Switch
                <br />
                to Solar?
              </h2>
              <p className="mt-3 md:mt-4 text-white/80 leading-6 md:leading-7 text-sm md:text-base max-w-sm lg:max-w-full animate-slide-up animation-delay-200">
                Fill the form and our expert will contact you for a free consultation.
              </p>
              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                {/* Phone - clickable */}
                <div className="flex items-center justify-center lg:justify-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Image
                      src="/images/footer/boxicons_phone-filled.svg"
                      alt="Phone"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    />
                  </div>
                  <a
                    href="tel:+9182880599808"
                    className="text-sm md:text-base group-hover:text-white/100 transition-colors duration-300 hover:underline"
                  >
                    +91 82880599808
                  </a>
                </div>

                {/* Email - clickable */}
                <div className="flex items-center justify-center lg:justify-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Image
                      src="/images/footer/material-symbols_mail.svg"
                      alt="Email"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    />
                  </div>
                  <a
                    href="mailto:maajogamayaenergy22@gmail.com"
                    className="text-sm md:text-base break-all group-hover:text-white/100 transition-colors duration-300 hover:underline"
                  >
                    maajogamayaenergy22@gmail.com
                  </a>
                </div>

                {/* Location - optional map link */}
                <div className="flex items-center justify-center lg:justify-start gap-3 group cursor-pointer transition-all duration-300 hover:translate-x-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Image
                      src="/images/footer/basil_location-solid.svg"
                      alt="Location"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    />
                  </div>
                  <a
                    href="https://maps.google.com/?q=Jaipur,Odisha,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base group-hover:text-white/100 transition-colors duration-300 hover:underline"
                  >
                    Jaipur, Odisha, India
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form with Slide-up */}
            <div className={`p-5 md:p-6 lg:p-8 flex items-center transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <div className="bg-white rounded-[20px] p-5 md:p-6 w-full h-full shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm animate-fade-in">
                    <CheckCircle size={16} />
                    <span>{successMessage}</span>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm animate-fade-in">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-4 h-10 md:h-12 outline-none focus:border-[#7B3FE4] transition-all duration-300 text-sm md:text-base hover:shadow-md focus:shadow-lg"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-4 h-10 md:h-12 outline-none focus:border-[#7B3FE4] transition-all duration-300 text-sm md:text-base hover:shadow-md focus:shadow-lg"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-4 h-10 md:h-12 outline-none focus:border-[#7B3FE4] transition-all duration-300 text-sm md:text-base hover:shadow-md focus:shadow-lg"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={formData.city}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-4 h-10 md:h-12 outline-none focus:border-[#7B3FE4] transition-all duration-300 text-sm md:text-base hover:shadow-md focus:shadow-lg"
                    />
                  </div>

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message *"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-3 md:mt-4 outline-none focus:border-[#7B3FE4] transition-all duration-300 text-sm md:text-base resize-none hover:shadow-md focus:shadow-lg"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 md:mt-5 w-full h-10 md:h-12 rounded-lg bg-gradient-to-r from-[#FF9D2F] to-[#FF7A00] text-white font-semibold flex items-center justify-center gap-2 text-sm md:text-base hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Now
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Section with Slide-up */}
          <div className={`border-t border-white/20 px-5 md:px-8 lg:px-10 py-6 md:py-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 text-white">
              
              {/* Logo & Brand */}
              <div className="col-span-2 sm:col-span-1 group">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-2 md:p-2.5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.12)] backdrop-blur-sm border border-white/15 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                    <Image
                      src="/images/logo/Logo 1.svg"
                      alt="MAA JOGOMAYA ENERGY"
                      width={44}
                      height={44}
                      className="md:w-[54px] md:h-[54px] object-contain"
                    />
                  </div>
                </div>
                <p className="text-[11px] md:text-sm text-white/70 mt-3 [text-shadow:_0_2px_10px_rgba(255,255,255,0.1)] group-hover:text-white/90 transition-colors duration-300">
                  Powering a greener tomorrow.
                </p>
              </div>

              {/* Get Help */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-white">
                  Get Help
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm text-white/80">
                  <li className="hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-1">Support</li>
                  <li className="hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-1">FAQs</li>
                  <li className="hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-1">Contact Us</li>
                </ul>
              </div>

              {/* Contact Us */}
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-white">
                  Contact Us
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm text-white/80">
                  <li className="hover:text-white transition-colors duration-300">676 Solar Drive</li>
                  <li className="hover:text-white transition-colors duration-300">Jaipur</li>
                  <li className="hover:text-white transition-colors duration-300">Odisha - 751001</li>
                </ul>
              </div>

              {/* Social */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-white">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3 md:gap-4">
                  <a
                    href="https://www.facebook.com/share/1ABHhqUGKn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-6"
                    aria-label="Facebook"
                  >
                    <Image
                      src="/images/footer/facebook.png"
                      alt="Facebook"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/maajogamayaenergy?igsh=eGdudnp2em12MHBm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:-rotate-6"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/images/footer/instagram.png"
                      alt="Instagram"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="flex items-center justify-start lg:justify-end col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 mt-4 lg:mt-0">
                <button className="bg-white text-[#5B3DF5] px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-[12px] md:text-sm hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulseSlow 5s ease-in-out infinite;
        }
        .animate-float-badge {
          animation: floatBadge 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}