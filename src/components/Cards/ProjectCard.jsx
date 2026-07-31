import { motion } from "framer-motion";
import { soundFx } from "@/utils/audio";

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  code,
  demo,
  badge,
  category,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="card-glass flex flex-col justify-between overflow-hidden group text-left h-full border border-slate-200 dark:border-white/10 shadow-sm"
    >
      <div>
        {/* Project Image & Badge Overlay */}
        <div className="relative h-60 overflow-hidden bg-slate-900 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
              category === "android" ? "object-contain py-2 bg-slate-950" : "object-cover object-top"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0717]/90 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border flex items-center gap-1.5 shadow-md ${
                category === "android"
                  ? "bg-purple-900/90 border-purple-400/50 text-purple-100"
                  : "bg-indigo-900/90 border-indigo-400/50 text-indigo-100"
              }`}
            >
              <i className={category === "android" ? "bi bi-phone-fill" : "bi bi-globe"}></i>
              {category === "android" ? "Android App" : "Website"}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
            {title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed line-clamp-3 font-medium">
            {description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {tech.map((t, i) => (
              <span
                key={i}
                className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-purple-950/80 border border-slate-200 dark:border-purple-800/40 text-slate-800 dark:text-purple-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-6 pt-0 flex gap-3 mt-4">
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClickSound()}
          className="flex-1 text-center text-xs font-bold py-3 px-4 rounded-xl btn-cyber text-white shadow-sm hover:shadow-md transition flex items-center justify-center gap-1.5"
        >
          <i className={category === "android" ? "bi bi-download" : "bi bi-box-arrow-up-right"}></i>
          <span>{category === "android" ? "Akses App" : "Live Demo"}</span>
        </a>

        <a
          href={code}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClickSound()}
          className="text-center text-xs font-bold py-3 px-4 rounded-xl border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white bg-slate-50 dark:bg-white/5 hover:border-purple-700 transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <i className="bi bi-github"></i>
          <span>Kode</span>
        </a>
      </div>
    </motion.div>
  );
}
