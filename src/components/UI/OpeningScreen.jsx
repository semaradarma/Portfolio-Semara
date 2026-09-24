import { useState, useEffect } from "react";
import { Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { soundFx } from "@/utils/audio";

const ENTRANCE_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const OVERLAY_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

export default function OpeningScreen({ onComplete }) {
  const [navMounted, setNavMounted] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set original title & restore later
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Aurevon";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Navbar entrance trigger after 100ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Hero entrance trigger after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroMounted(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Window scroll listener for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle overlay body overflow lock
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  const toggleOverlay = () => {
    soundFx.playClickSound();
    setIsOverlayOpen((prev) => !prev);
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    soundFx.playClickSound();
    setIsOverlayOpen(false);
    if (target === "portfolio" && onComplete) {
      setTimeout(() => onComplete(), 300);
    }
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    if (onComplete) {
      onComplete();
    }
  };

  const navLinks = [
    { label: "Home", action: "home" },
    { label: "Story", action: "story" },
    { label: "Collection", action: "collection" },
    { label: "Inquire", action: "portfolio" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black text-white overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* NAVBAR (fixed) */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left — logo */}
          <div
            className="transition-all duration-700"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: navMounted ? "0ms" : "0ms",
              opacity: navMounted ? 1 : 0,
              transform: navMounted ? "translateY(0)" : "translateY(-1rem)",
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOverlayOpen(false);
              }}
              className="text-white text-xl md:text-2xl font-semibold tracking-tight z-50 block cursor-pointer"
            >
              Aurevon
            </a>
          </div>

          {/* Center — desktop only (hidden md:flex) */}
          <div
            className="hidden md:flex transition-all duration-700"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: navMounted ? "200ms" : "0ms",
              opacity: navMounted ? 1 : 0,
              transform: navMounted ? "translateY(0)" : "translateY(-1rem)",
            }}
          >
            <button
              onClick={toggleOverlay}
              className="px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white/10 flex items-center gap-2 cursor-pointer transition-all duration-300"
            >
              <span>{isOverlayOpen ? "Close" : "Navigate"}</span>
            </button>
          </div>

          {/* Right — desktop only (hidden md:flex) */}
          <div
            className="hidden md:flex transition-all duration-700"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: navMounted ? "400ms" : "0ms",
              opacity: navMounted ? 1 : 0,
              transform: navMounted ? "translateY(0)" : "translateY(-1rem)",
            }}
          >
            <Flower2 className="w-7 h-7 text-white/90" />
          </div>

          {/* Right — mobile (md:hidden) Hamburger */}
          <div
            className="md:hidden transition-all duration-700"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: navMounted ? "200ms" : "0ms",
              opacity: navMounted ? 1 : 0,
              transform: navMounted ? "translateY(0)" : "translateY(-1rem)",
            }}
          >
            <button
              onClick={toggleOverlay}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer z-50 relative"
              aria-label="Toggle menu"
            >
              <span
                className="w-6 h-[2px] bg-white transition-all duration-500"
                style={{
                  transitionTimingFunction: OVERLAY_EASING,
                  transform: isOverlayOpen
                    ? "rotate(45deg) translateY(4px)"
                    : "rotate(0) translateY(0)",
                }}
              />
              <span
                className="w-6 h-[2px] bg-white transition-all duration-500"
                style={{
                  transitionTimingFunction: OVERLAY_EASING,
                  transform: isOverlayOpen
                    ? "rotate(-45deg) translateY(-4px)"
                    : "rotate(0) translateY(0)",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-700 ${
          isOverlayOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          transitionTimingFunction: OVERLAY_EASING,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex flex-col items-center justify-center gap-8">
            {navLinks.map((item, index) => {
              const openDelay = 150 + index * 80; // 150, 230, 310, 390 ms
              return (
                <a
                  key={item.label}
                  href="#"
                  onClick={(e) => handleLinkClick(e, item.action)}
                  className="text-white font-instrument text-4xl md:text-6xl hover:opacity-60 transition-all duration-600 block cursor-pointer"
                  style={{
                    transitionTimingFunction: OVERLAY_EASING,
                    transitionDuration: "600ms",
                    transitionDelay: isOverlayOpen ? `${openDelay}ms` : "0ms",
                    opacity: isOverlayOpen ? 1 : 0,
                    transform: isOverlayOpen ? "translateY(0)" : "translateY(1.5rem)",
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* HERO (full viewport) */}
      <section className="relative w-full h-screen overflow-hidden flex items-end justify-center">
        {/* Background video (CloudFront URL) */}
        <div
          className="absolute inset-0 transition-all duration-[1400ms]"
          style={{
            transitionTimingFunction: ENTRANCE_EASING,
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "scale(1)" : "scale(1.05)",
          }}
        >
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Foreground (bottom-centered) */}
        <div className="relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
          {/* H1 (Instrument Serif) */}
          <h1
            className="font-instrument text-white text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl mb-5 md:mb-6 transition-all duration-900"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: heroMounted ? "400ms" : "0ms",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(2rem)",
            }}
          >
            A carefully curated<br className="hidden sm:block" /> collection beyond compare
          </h1>

          {/* Subcopy */}
          <p
            className="text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-md mx-auto transition-all duration-900 font-sans"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: heroMounted ? "600ms" : "0ms",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(2rem)",
            }}
          >
            Reserve your place in our private gallery.
          </p>

          {/* CTA */}
          <div
            className="transition-all duration-900"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: heroMounted ? "800ms" : "0ms",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(2rem)",
            }}
          >
            <a
              href="#"
              onClick={handleCtaClick}
              className="inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
