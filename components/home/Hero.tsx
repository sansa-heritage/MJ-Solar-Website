// components/home/Hero.tsx - Combined with Navbar
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import SavingsCalculator from "./SavingsCalculator";

export default function Hero() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleWhatsAppClick = () => {
    const phoneNumber = "918280508088";
    const message =
      "Hi MAA JOGOMAYA ENERGY, I want to know more about solar solutions.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    setCurrentHash(window.location.hash);
  }, [pathname]);

  const handleHashLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setCurrentHash(href);
      }
    } else {
      router.push(`/${href}`);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && currentHash === "";
    if (href === "/about") return pathname === "/about";
    if (href === "/project") return pathname === "/project";
    if (href === "#services" || href === "#contact") {
      return pathname === "/" && currentHash === href;
    }
    return false;
  };

  const linkClasses = (href: string) => {
    const active = isActive(href);
    return `relative font-medium transition-all duration-300 ${
      active ? "text-[#7B3FE4]" : "text-[#333333] hover:text-[#7B3FE4]"
    }`;
  };

  const underlineClasses = (href: string) => {
    const active = isActive(href);
    return `absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#7B3FE4] to-[#8D54FF] transition-all duration-300 ${
      active ? "w-full" : "w-0 group-hover:w-full"
    }`;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden pt-0 flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/background home 1.svg')" }}
      >
        <div className="absolute inset-0 bg-black/0 z-0"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#7B3FE4]/10 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#EA6301]/10 animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7B3FE4]/[0.03] animate-spin-slow"></div>
        </div>

        {/* ====== NAVBAR ====== */}
        <header className="w-full py-3 md:py-4 sticky top-0 bg-transparent backdrop-blur-sm z-50">
          <div className="container-main flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <Image
                src="/images/logo/Logo 1.svg"
                alt="MAA JOGOMAYA ENERGY"
                width={45}
                height={45}
                className="object-contain md:w-[55px] md:h-[55px]"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-10 font-medium">
              <Link href="/" className={`${linkClasses("/")} group`}>
                Home
                <span className={underlineClasses("/")}></span>
              </Link>
              <Link href="/about" className={`${linkClasses("/about")} group`}>
                About Us
                <span className={underlineClasses("/about")}></span>
              </Link>
              <a
                href="#services"
                onClick={(e) => handleHashLinkClick(e, "#services")}
                className={`${linkClasses("#services")} group cursor-pointer`}
              >
                Services
                <span className={underlineClasses("#services")}></span>
              </a>
              <Link
                href="/project"
                className={`${linkClasses("/project")} group`}
              >
                Projects
                <span className={underlineClasses("/project")}></span>
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleHashLinkClick(e, "#contact")}
                className={`${linkClasses("#contact")} group cursor-pointer`}
              >
                Contact
                <span className={underlineClasses("#contact")}></span>
              </a>
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="orange-btn hidden sm:flex h-[40px] md:h-[50px] min-w-[160px] md:min-w-[220px] px-4 md:px-10 rounded-full text-white font-semibold text-[14px] md:text-[18px] shadow-lg items-center justify-center whitespace-nowrap bg-gradient-to-r from-[#7B3FE4] to-[#8D54FF] hover:shadow-xl transition"
              >
                Get a Free Quote
              </button>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl py-4 px-4 flex flex-col gap-3 z-50">
              <Link
                href="/"
                className={`py-2 px-3 rounded-lg transition ${
                  isActive("/")
                    ? "bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold"
                    : "hover:bg-gray-50 text-[#15153D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`py-2 px-3 rounded-lg transition ${
                  isActive("/about")
                    ? "bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold"
                    : "hover:bg-gray-50 text-[#15153D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <a
                href="#services"
                onClick={(e) => {
                  handleHashLinkClick(e, "#services");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg transition ${
                  isActive("#services")
                    ? "bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold"
                    : "hover:bg-gray-50 text-[#15153D]"
                }`}
              >
                Services
              </a>
              <Link
                href="/project"
                className={`py-2 px-3 rounded-lg transition ${
                  isActive("/project")
                    ? "bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold"
                    : "hover:bg-gray-50 text-[#15153D]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <a
                href="#contact"
                onClick={(e) => {
                  handleHashLinkClick(e, "#contact");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg transition ${
                  isActive("#contact")
                    ? "bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold"
                    : "hover:bg-gray-50 text-[#15153D]"
                }`}
              >
                Contact
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="orange-btn w-full py-3 rounded-full text-white font-semibold mt-2 bg-gradient-to-r from-[#7B3FE4] to-[#8D54FF]"
              >
                Get a Free Quote
              </button>
            </div>
          )}
        </header>

        {/* ====== HERO CONTENT ====== */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full container-main py-6 md:py-8 lg:py-10">
            <div
              className={`flex flex-col lg:flex-row lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* LEFT CONTENT */}
              <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm text-[11px] md:text-[13px] font-medium text-[#555] transition-all duration-300 hover:shadow-lg hover:border-[#7B3FE4]/30 hover:scale-[1.02] animate-fade-in">
                  <Image
                    src="/images/hero/electric_bolt.png"
                    alt="bolt"
                    width={16}
                    height={16}
                    className="w-4 h-4 md:w-5 md:h-5 object-contain animate-pulse"
                  />
                  <span>SOLAR ENERGY FOR A BETTER TOMORROW</span>
                  <Image
                    src="/images/hero/electric_bolt.png"
                    alt="bolt"
                    width={16}
                    height={16}
                    className="w-4 h-4 md:w-5 md:h-5 object-contain animate-pulse"
                  />
                </div>

                <h1 className="mt-6 md:mt-8 text-[32px] sm:text-[44px] md:text-[56px] leading-[1.2] md:leading-[62px] font-bold text-[#111827] animate-slide-up">
                  PM Surya Ghar:
                  <span className="block bg-gradient-to-r from-[#EA6301] to-[#544795] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                    Muft Bijli Yojana
                  </span>
                </h1>

                <p className="mt-4 md:mt-8 text-[28px] md:text-[28px] leading-[28px] md:leading-[32px] text-[#000000]/90 max-w-[650px] mx-auto lg:mx-0 animate-slide-up animation-delay-200">
                  Save up to ₹1,38,000 with Government Subsidy and reduce your
                  electricity bill by up to 90%.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6 md:mt-8 animate-slide-up animation-delay-400">
                  <button
                    onClick={() =>
                      window.open(
                        "https://wa.me/918280508088?text=Hi%20MAA%20JOGOMAYA%20ENERGY%2C%20I%20want%20to%20know%20more%20about%20solar%20solutions.",
                        "_blank",
                      )
                    }
                    className="h-[44px] md:h-[52px] px-5 md:px-7 rounded-full bg-[#6544A6] text-white font-semibold text-[14px] md:text-[16px] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.05] active:scale-[0.95] group"
                  >
                    Get Free Consultation
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                  <button
                    onClick={() => setIsCalculatorOpen(true)}
                    className="h-[44px] md:h-[52px] px-5 md:px-7 rounded-full bg-white/90 backdrop-blur-sm border border-[#000000] text-[#15153D] font-semibold text-[14px] md:text-[16px] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-white active:scale-[0.95] group"
                  >
                    Calculate Savings
                    <Image
                      src="/images/hero/ri_calculator-line.png"
                      alt="Calculator"
                      width={18}
                      height={18}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain transition-transform duration-300 group-hover:rotate-12"
                    />
                  </button>
                </div>

                {/* ✅ IMPROVED FEATURE BAR – Taller, larger icons, better spacing */}
                <div className="mt-6 md:mt-10 bg-white/90 backdrop-blur-sm rounded-[18px] shadow-md border border-white/30 py-3 md:py-4 px-4 md:px-6 flex flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6  w-full">
                  {[
                    {
                      icon: "/images/hero/icon-park-solid_protect.svg",
                      title: "Govt Approved",
                      desc: "MNRE approved installer",
                    },
                    {
                      icon: "/images/hero/streamline-flex_warranty-badge-highlight-solid.svg",
                      title: "25 Years Warranty",
                      desc: "Long-lasting performance",
                    },
                    {
                      icon: "/images/hero/mdi_user-tie.svg",
                      title: "1000+ Clients",
                      desc: "Serving happy customers",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 hover:bg-white/10 rounded-lg px-3 py-2 flex-shrink-0"
                      style={{ animationDelay: `${(index + 1) * 150}ms` }}
                    >
                      <div className="w-12 h-12 sm:w-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-orange-200 hover:shadow-md">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          className="w-8 h-8 sm:w-5 md:w-6 object-contain"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="text-[#000000] whitespace-nowrap">
                        <h4 className="font-bold text-[11px] sm:text-xs md:text-sm leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-[#6B7280]/70 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              {/* RIGHT SIDE */}
              <div className="relative flex justify-center items-center order-1 lg:order-2 min-h-[200px] lg:min-h-[200px]">
                {/* Floating stats card – more transparent, positioned with top % */}
                <div className="absolute top-[32%] right-0 lg:right-4 z-20 w-[190px] md:w-[220px] bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden hidden md:block animate-slide-in-right">
                  {/* ROW 1 */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-white/20 transition-all duration-300 hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                      <img
                        src="./images/aboutHero/temaki_power.svg"
                        alt="Power Icon"
                        className="w-6 h-6 md:w-7 md:h-7 object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(29%) sepia(82%) saturate(1452%) hue-rotate(249deg) brightness(97%) contrast(88%)",
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-black/80 text-[14px] md:text-[16px] font-medium">
                        Save up to
                      </p>
                      <h3 className="text-[24px] md:text-[28px] font-bold text-[#452BCA] leading-tight animate-pulse-subtle">
                        90%
                      </h3>
                      <p className="text-black/70 text-[10px] md:text-[11px]">
                        on Electricity Bills
                      </p>
                    </div>
                  </div>
                  {/* ROW 2 */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-white/20 transition-all duration-300 hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                      <img
                        src="./images/aboutHero/famicons_calendar-outline.svg"
                        alt="Calendar"
                        className="w-6 h-6 md:w-7 md:h-7 object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(59%) sepia(84%) saturate(2159%) hue-rotate(12deg) brightness(102%) contrast(93%)",
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-black/80 text-[14px] md:text-[16px] font-medium">
                        Payback in
                      </p>
                      <h3 className="text-[24px] md:text-[28px] font-bold text-[#452BCA] leading-tight">
                        3-4 Years
                      </h3>
                    </div>
                  </div>
                  {/* ROW 3 */}
                  <div className="flex items-center gap-3 px-4 py-4 transition-all duration-300 hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110">
                      <img
                        src="./images/aboutHero/streamline-plump_wallet.svg"
                        alt="Wallet"
                        className="w-6 h-6 md:w-7 md:h-7 object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(29%) sepia(82%) saturate(1452%) hue-rotate(249deg) brightness(97%) contrast(88%)",
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-black/80 text-[14px] md:text-[16px] font-medium">
                        Earn up to
                      </p>
                      <h3 className="text-[24px] md:text-[28px] font-bold text-[#452BCA] leading-tight">
                        ₹1.5L+
                      </h3>
                      <p className="text-black/70 text-[10px] md:text-[11px]">
                        Lifetime Savings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SavingsCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </>
  );
}
