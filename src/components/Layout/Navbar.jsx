import { useState, useRef, useEffect } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

import { getAssetUrl } from "@/utils/assets";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();
  const { language, setLanguage, languages } = useLanguage();
  
  // Safe translation lookup fallback
  const langData = translations[language] || translations.id;
  const t = langData.nav;
  const langDropdownRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    soundFx.playClickSound();
    setIsOpen(false);
    setIsLangDropdownOpen(false);
  };

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const navItems = [
    { label: t.home, id: "home", icon: "bi bi-house-door-fill" },
    { label: t.about, id: "about", icon: "bi bi-person-badge-fill" },
    { label: t.skills, id: "skills", icon: "bi bi-cpu-fill" },
    { label: t.projects, id: "projects", icon: "bi bi-folder-fill" },
    { label: t.contact, id: "contact", icon: "bi bi-envelope-fill" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0b0717]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between px-4 sm:px-8 py-3.5">
        
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={handleNavClick}
          className="flex items-center gap-3 group"
        >
          <img
            src={getAssetUrl("/logo_profile.svg")}
            alt="Logo"
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-mikalea text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Mether Willz
          </span>
        </a>

        {/* Navigation links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNavClick}
              className="relative py-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 group flex items-center gap-1.5"
            >
              <i className={`${item.icon} text-purple-700 dark:text-purple-400 text-xs`}></i>
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 dark:bg-purple-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Language toggle Dropdown with Visual Country Flags */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                soundFx.playClickSound();
                setIsLangDropdownOpen(!isLangDropdownOpen);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-xs font-bold text-slate-800 dark:text-white hover:border-purple-600 transition-all duration-200 flex items-center gap-2"
              aria-label="Select Language"
            >
              <span className={`${currentLangObj.flagClass} fis rounded-sm shadow-sm text-sm`}></span>
              <span className="uppercase">{currentLangObj.code}</span>
              <i className={`bi bi-chevron-down text-[10px] transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}></i>
            </button>

            {/* Language Dropdown List */}
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#160d2e] border border-slate-200 dark:border-white/15 shadow-xl py-2 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/10 mb-1">
                    Pilih Bahasa / Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        soundFx.playClickSound();
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${
                        language === lang.code
                          ? "bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${lang.flagClass} fis rounded-sm shadow-sm text-base`}></span>
                        <span>{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <i className="bi bi-check-lg text-purple-700 dark:text-purple-300 font-bold"></i>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => {
              soundFx.playClickSound();
              toggleTheme();
            }}
            className="p-2 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-amber-300 hover:border-purple-600 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <i className="bi bi-sun-fill text-amber-300 text-base"></i>
            ) : (
              <i className="bi bi-moon-stars-fill text-purple-700 text-base"></i>
            )}
          </button>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden p-2 text-slate-800 dark:text-white rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-xl flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <i className={isOpen ? "bi bi-x-lg text-lg" : "bi bi-list text-xl"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-[#0b0717] border-b border-slate-200 dark:border-white/10 px-6 py-6 space-y-4"
          >
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 font-semibold text-slate-800 dark:text-slate-100 hover:text-purple-700 dark:hover:text-purple-300 py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all"
                  onClick={handleNavClick}
                >
                  <i className={`${item.icon} text-purple-700 dark:text-purple-400 text-base`}></i>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Visual Country Flags Language Selector */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Pilih Bahasa / Select Language:</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      soundFx.playClickSound();
                      setLanguage(lang.code);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all ${
                      language === lang.code
                        ? "bg-purple-700 text-white border-purple-700"
                        : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <span className={`${lang.flagClass} fis rounded-sm shadow-sm`}></span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
