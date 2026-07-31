import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Cards/ProjectCard";
import MotionWrapper from "@/components/UI/MotionWrapper";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.projects;

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRolling, setIsAutoRolling] = useState(true);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "website") return project.category === "website";
    return project.category === "android" || project.badge === "Data Science";
  });

  // Ensure activeIndex is bounded
  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || projects[0];

  // Auto-roll timer effect (5 seconds per slide)
  useEffect(() => {
    if (!isAutoRolling || filteredProjects.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRolling, filteredProjects.length]);

  const handleFilter = (filter) => {
    soundFx.playClickSound();
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const handleSelectProject = (index) => {
    soundFx.playClickSound();
    setActiveIndex(index);
  };

  const handlePrev = () => {
    soundFx.playClickSound();
    setActiveIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundFx.playClickSound();
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative overflow-hidden section-glass">
      <div className="max-w-[1360px] mx-auto text-center">
        
        {/* Header */}
        <MotionWrapper direction="up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <div className="mt-3 w-20 h-1.5 bg-purple-700 dark:bg-purple-400 mx-auto rounded-full" />
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base font-semibold">
            {t.subtitle}
          </p>
        </MotionWrapper>

        {/* Category Filters */}
        <MotionWrapper direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
            <button
              onClick={() => handleFilter("all")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeFilter === "all"
                  ? "btn-cyber text-white shadow-md"
                  : "bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-purple-600"
              }`}
            >
              <i className="bi bi-grid-fill"></i>
              <span>{t.filterAll}</span>
            </button>

            <button
              onClick={() => handleFilter("website")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeFilter === "website"
                  ? "btn-cyber text-white shadow-md"
                  : "bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-purple-600"
              }`}
            >
              <i className="bi bi-globe"></i>
              <span>{t.filterWeb}</span>
            </button>

            <button
              onClick={() => handleFilter("android")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeFilter === "android"
                  ? "btn-cyber text-white shadow-md"
                  : "bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-purple-600"
              }`}
            >
              <i className="bi bi-cpu-fill"></i>
              <span>{t.filterAndroid}</span>
            </button>
          </div>
        </MotionWrapper>

        {/* 🌟 FEATURED SPLIT SHOWCASE (Kanan Besar, Kiri Kecil, Auto-Roll) */}
        <div 
          className="mb-16 card-glass p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg text-left"
          onMouseEnter={() => setIsAutoRolling(false)}
          onMouseLeave={() => setIsAutoRolling(true)}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-600 animate-ping"></span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <i className="bi bi-stars text-purple-600 dark:text-purple-400"></i>
                Featured Showcase ({activeIndex + 1}/{filteredProjects.length})
              </h3>
            </div>

            {/* Showcase Auto-roll Control Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRolling(!isAutoRolling)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-purple-600 transition flex items-center gap-1.5"
                title={isAutoRolling ? "Pause Auto-Roll" : "Play Auto-Roll"}
              >
                <i className={isAutoRolling ? "bi bi-pause-fill text-purple-600" : "bi bi-play-fill text-purple-600"}></i>
                <span className="hidden sm:inline">{isAutoRolling ? "Auto-Roll ON" : "Paused"}</span>
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:border-purple-600 transition"
                aria-label="Previous Project"
              >
                <i className="bi bi-chevron-left text-sm"></i>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:border-purple-600 transition"
                aria-label="Next Project"
              >
                <i className="bi bi-chevron-right text-sm"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* 👈 KIRI KECIL: Vertical Thumbnails Selector (4 Cols) */}
            <div className="lg:col-span-4 space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredProjects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 group ${
                      isActive
                        ? "bg-purple-100/90 dark:bg-purple-950/80 border-purple-600 dark:border-purple-500 shadow-md scale-[1.02]"
                        : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-purple-400 hover:bg-slate-50 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 relative border border-slate-300 dark:border-white/10">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-200/80 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200">
                        {proj.category === "android" ? "Android" : proj.badge}
                      </span>
                      <h4 className={`text-xs sm:text-sm font-extrabold truncate mt-1 ${
                        isActive ? "text-purple-900 dark:text-white" : "text-slate-800 dark:text-slate-200"
                      }`}>
                        {proj.title}
                      </h4>
                    </div>

                    {isActive && (
                      <i className="bi bi-chevron-right text-purple-700 dark:text-purple-300 font-bold text-sm"></i>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 👉 KANAN BESAR: Prominent Large Active Showcase (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-50 dark:bg-[#110826] rounded-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Big High-Res Image Preview */}
                    <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-center group mb-6">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${
                          activeProject.category === "android"
                            ? "object-contain py-4 bg-slate-950"
                            : "object-cover object-top"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0717]/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider bg-purple-900/90 text-purple-100 border border-purple-400/50 shadow-md flex items-center gap-1.5">
                          <i className={activeProject.category === "android" ? "bi bi-phone-fill" : "bi bi-globe"}></i>
                          {activeProject.category === "android" ? "Android App" : "Web System"}
                        </span>
                      </div>
                    </div>

                    {/* Active Title & Detailed Description */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {activeProject.title}
                    </h3>

                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium mt-3">
                      {activeProject.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {activeProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs font-bold px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/50 text-purple-900 dark:text-purple-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-white/10 mt-6">
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClickSound()}
                      className="btn-cyber px-6 py-3.5 rounded-xl text-white font-extrabold text-sm shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 flex-1 sm:flex-none"
                    >
                      <i className={activeProject.category === "android" ? "bi bi-download" : "bi bi-box-arrow-up-right"}></i>
                      <span>{activeProject.category === "android" ? "Akses App Android" : "Live Demo / Akses Web"}</span>
                    </a>

                    <a
                      href={activeProject.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClickSound()}
                      className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white bg-white dark:bg-white/5 hover:border-purple-700 font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-sm flex-1 sm:flex-none"
                    >
                      <i className="bi bi-github"></i>
                      <span>Repository Kode</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* 📱 FULL GRID DISPLAY (Tampilkan Seluruh 8 Proyek) */}
        <div className="mt-16 text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
            <i className="bi bi-grid-3x3-gap-fill text-purple-600 dark:text-purple-400"></i>
            Semua Proyek Portofolio (8)
          </h3>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
