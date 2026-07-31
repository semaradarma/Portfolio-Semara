import MotionWrapper from "@/components/UI/MotionWrapper";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";

export default function Contact() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    alert(t.successAlert || "Pesan Anda telah berhasil dikirim!");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 relative overflow-hidden section-glass">
      <div className="max-w-[1100px] mx-auto text-center">
        
        {/* Header */}
        <MotionWrapper direction="up">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <div className="mt-3 w-20 h-1.5 bg-purple-700 dark:bg-purple-400 mx-auto rounded-full" />
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-lg mx-auto text-sm md:text-base font-semibold">
            {t.subtitle}
          </p>
        </MotionWrapper>

        {/* Contact Form */}
        <MotionWrapper direction="up" delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 card-glass p-8 md:p-12 max-w-2xl mx-auto space-y-6 text-left border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                required
                placeholder={t.namePlaceholder || "Contoh: Budi Santoso"}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#110826] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-700 transition-all font-semibold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                required
                placeholder={t.emailPlaceholder || "budi@contoh.com"}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#110826] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-700 transition-all font-semibold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                {t.message}
              </label>
              <textarea
                required
                rows="4"
                placeholder={t.messagePlaceholder || "Mari diskusikan ide proyek Web, aplikasi Android, atau Data Science Anda..."}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#110826] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-700 transition-all font-semibold text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl btn-cyber text-white font-extrabold text-sm tracking-wider uppercase shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <i className="bi bi-send-fill text-base"></i>
              <span>{t.button}</span>
            </button>
          </form>
        </MotionWrapper>

        {/* Social Links */}
        <div className="mt-12 flex justify-center items-center gap-5">
          <a
            href="https://github.com/semaradarma"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickSound()}
            className="w-13 h-13 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white text-xl hover:border-purple-700 hover:text-purple-700 dark:hover:text-purple-300 hover:scale-105 transition-all duration-200 shadow-sm"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/i-putu-semara-darma/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickSound()}
            className="w-13 h-13 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white text-xl hover:border-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-105 transition-all duration-200 shadow-sm"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="mailto:metherwillz@gmail.com"
            onClick={() => soundFx.playClickSound()}
            className="w-13 h-13 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white text-xl hover:border-purple-700 hover:text-purple-700 dark:hover:text-purple-300 hover:scale-105 transition-all duration-200 shadow-sm"
            aria-label="Email"
          >
            <i className="bi bi-envelope-at-fill"></i>
          </a>
        </div>

      </div>
    </section>
  );
}
