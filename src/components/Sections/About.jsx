import { useState } from "react";
import MotionWrapper from "@/components/UI/MotionWrapper";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";
import { getAssetUrl } from "@/utils/assets";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.about;

  const photos = [
    {
      id: "creative",
      src: getAssetUrl("/images/profile/profile-creative.jpg"),
      title: "Creative Pose",
      subtitle: "Lake & Mountain View"
    },
    {
      id: "cool",
      src: getAssetUrl("/images/profile/profile-cool.jpg"),
      title: "Cyber Stance",
      subtitle: "Developer Profile"
    },
    {
      id: "outdoor1",
      src: getAssetUrl("/images/profile/profile-outdoor1.jpg"),
      title: "Mountain View 1",
      subtitle: "Outdoor Landscape"
    },
    {
      id: "outdoor2",
      src: getAssetUrl("/images/profile/profile-outdoor2.jpg"),
      title: "Mountain View 2",
      subtitle: "Outdoor Moment"
    }
  ];

  const [activePhoto, setActivePhoto] = useState(photos[0]);

  const handleSelectPhoto = (photo) => {
    soundFx.playClickSound();
    setActivePhoto(photo);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-8 relative overflow-hidden section-glass">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <MotionWrapper direction="up">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h2>
            <div className="mt-3 w-20 h-1.5 bg-purple-700 dark:bg-purple-400 mx-auto rounded-full" />
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm md:text-base font-semibold">
              {t.subtitle}
            </p>
          </MotionWrapper>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Photo Gallery */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <MotionWrapper direction="right">
              <div className="relative w-72 sm:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-300 dark:border-purple-500/30 card-glass group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto.id}
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Photo Badge overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0b0717] via-[#0b0717]/80 to-transparent">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300 flex items-center gap-1">
                    <i className="bi bi-camera-fill"></i>
                    {activePhoto.subtitle}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {activePhoto.title}
                  </h4>
                </div>
              </div>

              {/* Thumbnails Selector */}
              <div className="flex gap-3 mt-6 justify-center">
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => handleSelectPhoto(photo)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activePhoto.id === photo.id
                        ? "border-purple-700 scale-105 shadow-md"
                        : "border-slate-300 dark:border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column: Bio & Achievements */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <MotionWrapper direction="left" delay={0.2}>
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                {t.greetingBio || "Halo, Saya"} <span className="text-purple-800 dark:text-purple-300">Semara Darma</span>
              </h3>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                {t.bio}
              </p>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#150d29] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-700 dark:text-purple-300 mb-2">
                    <i className="bi bi-folder-check text-xl"></i>
                  </div>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">8+</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {t.statProjects}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-semibold">
                    {t.statProjectsSub}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#150d29] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-700 dark:text-indigo-300 mb-2">
                    <i className="bi bi-layers-fill text-xl"></i>
                  </div>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">Web & Mobile</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {t.statExperience}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-semibold">
                    {t.statExperienceSub}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#150d29] border border-slate-200 dark:border-white/10 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-700 dark:text-purple-300 mb-2">
                    <i className="bi bi-shield-check text-xl"></i>
                  </div>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {t.statQuality}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-semibold">
                    {t.statQualitySub}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  onClick={() => soundFx.playClickSound()}
                  className="btn-cyber px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <i className="bi bi-rocket-takeoff-fill"></i>
                  <span>{t.buttonExplore || "Jelajahi 8 Proyek"}</span>
                </a>
                <a
                  href="#skills"
                  onClick={() => soundFx.playClickSound()}
                  className="px-7 py-3.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-bold text-sm bg-white dark:bg-white/5 hover:border-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <i className="bi bi-award-fill text-purple-700 dark:text-purple-300"></i>
                  <span>{t.buttonSkills || "Lihat Keahlian"}</span>
                </a>
              </div>
            </MotionWrapper>
          </div>

        </div>

      </div>
    </section>
  );
}
