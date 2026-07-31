import { motion } from "framer-motion";

export default function SkillCard({ iconClass, name, level }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="card-glass p-5 rounded-2xl flex items-center gap-4 text-left border border-slate-200 dark:border-white/10 shadow-sm"
    >
      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-700/50 flex items-center justify-center text-purple-700 dark:text-purple-300 text-2xl flex-shrink-0">
        <i className={iconClass || "bi bi-code-slash"}></i>
      </div>
      <div>
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight">
          {name}
        </h3>
        <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700/50">
          {level || "Competent"}
        </span>
      </div>
    </motion.div>
  );
}
