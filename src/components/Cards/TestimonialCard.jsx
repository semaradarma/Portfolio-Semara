import { getAssetUrl } from "@/utils/assets";

export default function TestimonialCard({ name, role, company, message, avatar, rating }) {
  return (
    <div className="card-glass p-8 md:p-10 rounded-3xl flex flex-col justify-between h-full text-center relative overflow-hidden group border border-slate-200 dark:border-white/10 shadow-sm">
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 right-6 text-5xl text-purple-700/15 dark:text-purple-400/20 pointer-events-none select-none">
        <i className="bi bi-quote"></i>
      </div>

      <div>
        {/* Star Rating */}
        <div className="flex justify-center gap-1.5 text-amber-500 mb-6">
          {[...Array(rating || 5)].map((_, i) => (
            <i key={i} className="bi bi-star-fill text-sm"></i>
          ))}
        </div>

        {/* Message */}
        <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base italic leading-relaxed mb-6 font-semibold">
          “{message}”
        </p>
      </div>

      {/* Author Info */}
      <div className="flex flex-col items-center mt-4">
        <img
          src={getAssetUrl(avatar)}
          alt={name}
          className="w-16 h-16 rounded-full mb-3 border-2 border-purple-700 shadow-md object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <h4 className="font-extrabold text-slate-900 dark:text-white text-base tracking-wide">
          {name}
        </h4>
        <p className="text-xs text-purple-800 dark:text-purple-300 font-bold mt-0.5">
          {role} {company ? `• ${company}` : ""}
        </p>
      </div>
    </div>
  );
}
