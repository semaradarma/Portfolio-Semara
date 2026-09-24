import { useState, useEffect } from "react";
import { Flower2, Sparkles, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/utils/audio";

const ENTRANCE_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const OVERLAY_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
const DOOR_ZOOM_EASING = "cubic-bezier(0.65, 0, 0.25, 1)";

export default function OpeningScreen({ onComplete }) {
  const [navMounted, setNavMounted] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpeningDoor, setIsOpeningDoor] = useState(false);
  const [portalFlash, setPortalFlash] = useState(false);

  // Set original title & restore later
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Semara Darma | Portfolio Gallery";
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

  // Trigger Door Opening Animation & Transition to Hero Station
  const handleOpenDoor = () => {
    if (isOpeningDoor) return;
    setIsOpeningDoor(true);
    setIsOverlayOpen(false);
    soundFx.playDoorOpenSound();

    // Trigger radiant flash when camera reaches the threshold
    setTimeout(() => {
      setPortalFlash(true);
    }, 1250);

    // Call onComplete after full opening sequence
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 1750);
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    soundFx.playClickSound();
    setIsOverlayOpen(false);
    if (target === "enter" || target === "home") {
      handleOpenDoor();
    } else if (onComplete) {
      setTimeout(() => {
        onComplete();
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const navLinks = [
    { label: "Beranda", action: "home" },
    { label: "Tentang", action: "about" },
    { label: "Proyek", action: "projects" },
    { label: "Kontak", action: "contact" },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        } ${isOpeningDoor ? "opacity-0 -translate-y-8 pointer-events-none" : ""}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left — Logo (Semara Darma) */}
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
              className="group flex items-center gap-2.5 text-white font-semibold tracking-tight z-50 cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-white">
                Semara Darma
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-white/10 text-purple-200 border border-white/20 rounded-full">
                Portfolio
              </span>
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
            className="hidden md:flex items-center gap-4 transition-all duration-700"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: navMounted ? "400ms" : "0ms",
              opacity: navMounted ? 1 : 0,
              transform: navMounted ? "translateY(0)" : "translateY(-1rem)",
            }}
          >
            <button
              onClick={handleOpenDoor}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white/90 flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-300" />
              <span>Buka Pintu</span>
            </button>
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
              const openDelay = 150 + index * 80;
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

            {/* Quick Action in Overlay to Open Door */}
            <button
              onClick={handleOpenDoor}
              className="mt-4 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm md:text-base hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              style={{
                transitionDelay: isOverlayOpen ? "480ms" : "0ms",
                opacity: isOverlayOpen ? 1 : 0,
                transform: isOverlayOpen ? "translateY(0)" : "translateY(1.5rem)",
              }}
            >
              <KeyRound className="w-4 h-4 text-purple-700" />
              <span>Buka Pintu & Masuk</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO (full viewport) */}
      <section className="relative w-full h-screen overflow-hidden flex items-end justify-center">
        {/* Background video wrapper with Door Zoom Camera */}
        <div
          className="absolute inset-0 transition-all"
          style={{
            transitionDuration: isOpeningDoor ? "1800ms" : "1400ms",
            transitionTimingFunction: isOpeningDoor ? DOOR_ZOOM_EASING : ENTRANCE_EASING,
            transformOrigin: "50% 41%",
            opacity: heroMounted ? 1 : 0,
            transform: isOpeningDoor
              ? "scale(4.4)"
              : heroMounted
              ? "scale(1)"
              : "scale(1.05)",
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

          {/* INTERACTIVE DOOR LAYER AT CENTER OF VIDEO */}
          <div
            onClick={handleOpenDoor}
            className={`absolute top-[26%] left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] md:w-[285px] h-[330px] sm:h-[390px] md:h-[430px] cursor-pointer group z-20 perspective-1000 ${
              isOpeningDoor ? "pointer-events-none" : ""
            }`}
          >
            {/* Ambient Door Pulse Glow */}
            <div
              className={`absolute -inset-4 rounded-2xl bg-purple-500/20 blur-xl pointer-events-none transition-all duration-700 ${
                isOpeningDoor ? "opacity-100 scale-125" : "animate-door-pulse group-hover:opacity-80"
              }`}
            />

            {/* Click to open door floating badge */}
            {!isOpeningDoor && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none whitespace-nowrap z-30">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-purple-400/50 text-[11px] font-bold tracking-wider uppercase text-purple-200 shadow-xl">
                  <KeyRound className="w-3 h-3 text-purple-400" />
                  <span>Klik untuk Buka Pintu</span>
                </span>
              </div>
            )}

            {/* 3D DOOR PANELS (Split & Open Outwards) */}
            <div className="relative w-full h-full transform-style-3d">
              {/* Inner Radiant Light Portal (Revealed when door swings open) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  isOpeningDoor ? "opacity-100 scale-105" : "opacity-0"
                }`}
              >
                {/* Intense glowing core */}
                <div className="w-full h-full rounded-lg bg-gradient-to-b from-amber-200 via-purple-300 to-white shadow-[0_0_90px_rgba(255,255,255,0.9),0_0_150px_rgba(168,85,247,0.8)] filter blur-[1px]" />
                <div className="absolute inset-0 bg-white/70 animate-pulse rounded-lg" />
              </div>

              {/* Left Door Wing */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full transition-all rounded-l-md"
                style={{
                  transformOrigin: "left center",
                  transitionDuration: isOpeningDoor ? "1400ms" : "500ms",
                  transitionTimingFunction: DOOR_ZOOM_EASING,
                  transform: isOpeningDoor
                    ? "perspective(1000px) rotateY(-115deg) translateZ(20px)"
                    : "perspective(1000px) rotateY(0deg)",
                  opacity: isOpeningDoor ? 0.3 : 0,
                  background:
                    "linear-gradient(90deg, rgba(20,15,30,0.95) 0%, rgba(35,25,50,0.85) 100%)",
                  boxShadow: isOpeningDoor ? "-10px 0 25px rgba(0,0,0,0.8)" : "none",
                }}
              />

              {/* Right Door Wing */}
              <div
                className="absolute top-0 right-0 w-1/2 h-full transition-all rounded-r-md"
                style={{
                  transformOrigin: "right center",
                  transitionDuration: isOpeningDoor ? "1400ms" : "500ms",
                  transitionTimingFunction: DOOR_ZOOM_EASING,
                  transform: isOpeningDoor
                    ? "perspective(1000px) rotateY(115deg) translateZ(20px)"
                    : "perspective(1000px) rotateY(0deg)",
                  opacity: isOpeningDoor ? 0.3 : 0,
                  background:
                    "linear-gradient(270deg, rgba(20,15,30,0.95) 0%, rgba(35,25,50,0.85) 100%)",
                  boxShadow: isOpeningDoor ? "10px 0 25px rgba(0,0,0,0.8)" : "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Foreground (bottom-centered) */}
        <div
          className={`relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto transition-all duration-700 ${
            isOpeningDoor ? "opacity-0 translate-y-12 pointer-events-none" : ""
          }`}
        >
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
            A carefully curated<br className="hidden sm:block" /> portfolio beyond compare
          </h1>

          {/* Subcopy tailored to Semara Darma */}
          <p
            className="text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto transition-all duration-900 font-sans leading-relaxed"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: heroMounted ? "600ms" : "0ms",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(2rem)",
            }}
          >
            Selamat datang di galeri interaktif I Putu Semara Darma. Buka pintu lemari untuk menjelajahi karya Web, Android & Data Science.
          </p>

          {/* CTA: Buka Pintu & Masuk */}
          <div
            className="transition-all duration-900 flex justify-center"
            style={{
              transitionTimingFunction: ENTRANCE_EASING,
              transitionDelay: heroMounted ? "800ms" : "0ms",
              opacity: heroMounted ? 1 : 0,
              transform: heroMounted ? "translateY(0)" : "translateY(2rem)",
            }}
          >
            <button
              onClick={handleOpenDoor}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm md:text-base font-semibold rounded-full hover:bg-white/95 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_4px_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-purple-600 transition-transform group-hover:rotate-12" />
              <span>Buka Pintu & Masuk</span>
              <KeyRound className="w-4 h-4 text-slate-700 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Radiant White/Golden Portal Flash Transition to Hero Station */}
        <div
          className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ${
            portalFlash ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,255,255,1) 0%, rgba(254,240,138,0.8) 40%, rgba(168,85,247,0.95) 100%)",
          }}
        />
      </section>
    </motion.div>
  );
}
