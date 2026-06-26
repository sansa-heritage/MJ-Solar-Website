// components/layout/Navbar.js - Fully Responsive with Active Menu & Hash Scrolling
"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleWhatsAppClick = () => {
    const phoneNumber = '918280508088';
    const message = 'Hi MAA JOGOMAYA ENERGY, I want to know more about solar solutions.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Sync current hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync current hash when pathname changes (e.g., navigating to Home)
  useEffect(() => {
    setCurrentHash(window.location.hash);
  }, [pathname]);

  // Handle hash link click – scroll or navigate
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setCurrentHash(href);
      }
    } else {
      // Navigate to home with hash
      router.push(`/${href}`);
    }
    setMobileMenuOpen(false);
  };

  // Determine active link – only one active at a time
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' && currentHash === '';
    }
    if (href === '/about') return pathname === '/about';
    if (href === '/project') return pathname === '/project';
    if (href === '#services' || href === '#contact') {
      return pathname === '/' && currentHash === href;
    }
    return false;
  };

  const linkClasses = (href: string) => {
    const active = isActive(href);
    return `relative font-medium transition-all duration-300 ${
      active ? 'text-[#7B3FE4]' : 'text-[#15153D] hover:text-[#7B3FE4]'
    }`;
  };

  const underlineClasses = (href: string) => {
    const active = isActive(href);
    return `absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#7B3FE4] to-[#8D54FF] transition-all duration-300 ${
      active ? 'w-full' : 'w-0 group-hover:w-full'
    }`;
  };

  return (
    <header className="w-full py-4 md:py-5 sticky top-0 bg-[#f8f6fb]/95 backdrop-blur-sm z-50">
      <div className="container-main flex items-center justify-between">
        {/* LOGO */}
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

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10 font-medium">
          <Link href="/" className={`${linkClasses('/')} group`}>
            Home
            <span className={underlineClasses('/')}></span>
          </Link>

          <Link href="/about" className={`${linkClasses('/about')} group`}>
            About Us
            <span className={underlineClasses('/about')}></span>
          </Link>

          {/* Services - correct hash #services */}
          <a
            href="#services"
            onClick={(e) => handleHashLinkClick(e, '#services')}
            className={`${linkClasses('#services')} group cursor-pointer`}
          >
            Services
            <span className={underlineClasses('#services')}></span>
          </a>

          <Link href="/project" className={`${linkClasses('/project')} group`}>
            Projects
            <span className={underlineClasses('/project')}></span>
          </Link>

          {/* Contact - hash #contact */}
          <a
            href="#contact"
            onClick={(e) => handleHashLinkClick(e, '#contact')}
            className={`${linkClasses('#contact')} group cursor-pointer`}
          >
            Contact
            <span className={underlineClasses('#contact')}></span>
          </a>
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={handleWhatsAppClick}
            className="orange-btn hidden sm:flex h-[40px] md:h-[50px] min-w-[160px] md:min-w-[220px] px-4 md:px-10 rounded-full text-white font-semibold text-[14px] md:text-[18px] shadow-lg items-center justify-center whitespace-nowrap"
          >
            Get a Free Quote
          </button>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-4 flex flex-col gap-3 z-50">
          <Link
            href="/"
            className={`py-2 px-3 rounded-lg transition ${
              isActive('/')
                ? 'bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold'
                : 'hover:bg-gray-50 text-[#15153D]'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`py-2 px-3 rounded-lg transition ${
              isActive('/about')
                ? 'bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold'
                : 'hover:bg-gray-50 text-[#15153D]'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <a
            href="#services"
            onClick={(e) => {
              handleHashLinkClick(e, '#services');
              setMobileMenuOpen(false);
            }}
            className={`py-2 px-3 rounded-lg transition ${
              isActive('#services')
                ? 'bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold'
                : 'hover:bg-gray-50 text-[#15153D]'
            }`}
          >
            Services
          </a>
          <Link
            href="/project"
            className={`py-2 px-3 rounded-lg transition ${
              isActive('/project')
                ? 'bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold'
                : 'hover:bg-gray-50 text-[#15153D]'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              handleHashLinkClick(e, '#contact');
              setMobileMenuOpen(false);
            }}
            className={`py-2 px-3 rounded-lg transition ${
              isActive('#contact')
                ? 'bg-[#7B3FE4]/10 text-[#7B3FE4] font-semibold'
                : 'hover:bg-gray-50 text-[#15153D]'
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
            className="orange-btn w-full py-3 rounded-full text-white font-semibold mt-2"
          >
            Get a Free Quote
          </button>
        </div>
      )}
    </header>
  );
}