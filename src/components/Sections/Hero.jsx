import TypeWriter from "@/components/UI/TypeWriter";
import ParticleBackground from "@/components/UI/ParticleBackground";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";
import { motion } from "framer-motion";

import { getAssetUrl } from "@/utils/assets";

export default function Hero() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.hero;

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      <ParticleBackground />

      {/* Subtle Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/10 dark:bg-purple-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1360px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Text & Hero Details */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700/50 mb-6 shadow-sm"
          >
            <i className="bi bi-patch-check-fill text-purple-700 dark:text-purple-300 text-sm"></i>
            <span className="text-xs md:text-sm font-bold text-purple-900 dark:text-purple-200">
              {t.greeting}
            </span>
          </motion.div>

          {/* Main Title - Natural Solid Colors, No Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white"
          >
            <span className="block text-purple-800 dark:text-purple-300">
              {t.name}
            </span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl mt-3 font-extrabold text-slate-800 dark:text-slate-100">
              <TypeWriter text={t.role} speed={120} />
            </span>
          </motion.h1>

          {/* Description - High Contrast Natural Slate */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium"
          >
            {t.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
          >
            <a
              href="#projects"
              onClick={() => soundFx.playClickSound()}
              className="btn-cyber px-8 py-4 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <span>{t.buttonProjects}</span>
              <i className="bi bi-rocket-takeoff-fill text-base"></i>
            </a>

            <a
              href="#contact"
              onClick={() => soundFx.playClickSound()}
              className="px-8 py-4 rounded-2xl text-slate-900 dark:text-white font-bold text-sm border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 hover:border-purple-600 dark:hover:border-purple-400 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <i className="bi bi-envelope-fill text-purple-700 dark:text-purple-300"></i>
              <span>{t.buttonContact}</span>
            </a>
          </motion.div>

          {/* Highlights Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-black text-purple-800 dark:text-purple-300">8+</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-0.5">{t.statCompletedProjects || "Proyek Selesai"}</p>
            </div>
            <div className="border-x border-slate-200 dark:border-white/10 px-2">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{t.statSpecialization || "Android & Web"}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-0.5">{t.statSpecializationSub || "Spesialisasi"}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-purple-800 dark:text-purple-300">100%</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold mt-0.5">{t.statSatisfaction || "Kepuasan"}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: User Cutout Photo */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative w-72 h-96 sm:w-88 sm:h-[460px] flex items-end justify-center"
          >
            {/* Background Backdrop Frame */}
            <div className="absolute inset-0 rounded-3xl bg-purple-200/50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-700/40 -z-10 shadow-lg" />

            {/* Profile Cutout Image */}
            <img
              src={getAssetUrl("/images/profile/profile-pose.png")}
              alt="Mether Willz Pose"
              className="relative z-10 max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(15,23,42,0.25)] transition-transform duration-500 hover:scale-105"
            />

            {/* Floating Tech Badge 1: Android Mobile */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-purple-950/90 backdrop-blur-md border border-slate-200 dark:border-purple-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float z-10">
              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center text-xl font-bold shadow-md">
                <i className="bi bi-android2"></i>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {t.badgeAndroidMobile || "Android Mobile"}
                </p>
                <p className="text-[10px] text-purple-800 dark:text-purple-300 font-bold">React Native & Python</p>
              </div>
            </div>

            {/* Floating Tech Badge 2: Web Dev */}
            <div className="absolute bottom-6 right-4 bg-white/90 dark:bg-indigo-950/90 backdrop-blur-md border border-slate-200 dark:border-indigo-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float-delayed z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                <i className="bi bi-code-slash"></i>
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {t.badgeWebDev || "Web Dev"}
                </p>
                <p className="text-[10px] text-indigo-800 dark:text-indigo-300 font-bold">React & Vite</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
