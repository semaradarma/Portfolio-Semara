import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { translations } from "@/data/translations";
import useLanguage from "@/hooks/useLanguage";
import { soundFx } from "@/utils/audio";

const OpeningScreen = ({ onComplete }) => {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.opening;
  const [progress, setProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [statusText, setStatusText] = useState(t.loadingText);

  useEffect(() => {
    // Sound on initial load
    soundFx.playStartupSound();

    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next > 30 && prev <= 30) setStatusText("Loading Web & Android Core...");
        if (next > 65 && prev <= 65) setStatusText("Preparing High Contrast Interface...");
        if (next > 90 && prev <= 90) setStatusText("System Ready!");
        return next > 100 ? 100 : next;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [t.loadingText]);

  const handleEnter = () => {
    soundFx.playClickSound();
    onComplete();
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const muted = soundFx.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      soundFx.playStartupSound();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0717] text-white overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Background Animated Gradient Aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[150px] animate-pulse" />
      </div>

      {/* Top Bar Sound Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400 text-xs tracking-wider uppercase transition-all duration-200 hover:scale-105"
        >
          <i className={isAudioMuted ? "bi bi-volume-mute-fill" : "bi bi-volume-up-fill text-purple-300"}></i>
          <span>{isAudioMuted ? "Muted" : "Sound ON"}</span>
        </button>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-xl">
        {/* Logo Profile */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 group cursor-pointer"
          onClick={() => soundFx.playStartupSound()}
        >
          <img
            src="/logo_profile.svg"
            alt="Mether Willz Logo"
            className="relative w-44 h-44 md:w-56 md:h-56 object-contain filter drop-shadow-[0_0_25px_rgba(109,40,217,0.7)] transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        {/* Title - Natural Solid White */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-mikalea text-2xl md:text-4xl font-extrabold tracking-wider text-white drop-shadow-md"
        >
          {t.welcome}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-2 text-xs md:text-sm font-bold tracking-widest text-purple-300 uppercase"
        >
          {t.subtitle}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full mt-8 max-w-md">
          <div className="flex justify-between text-xs text-purple-300 mb-2 font-mono font-bold">
            <span>{statusText}</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full rounded-full bg-purple-600 shadow-[0_0_10px_rgba(109,40,217,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Action Enter Button */}
        <AnimatePresence>
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <button
                onClick={handleEnter}
                className="btn-cyber px-8 py-3.5 rounded-full text-white font-bold text-sm tracking-widest uppercase shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <span>{t.enterButton}</span>
                <i className="bi bi-arrow-right-short text-lg"></i>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OpeningScreen;
