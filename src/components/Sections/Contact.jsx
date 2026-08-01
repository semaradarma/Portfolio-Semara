import { useState } from "react";
import MotionWrapper from "@/components/UI/MotionWrapper";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { soundFx } from "@/utils/audio";

export default function Contact() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/darmaiputusemara@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Contact] Pesan Baru dari ${formData.name}`,
          _template: "table",
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === "true") {
        setStatusMessage({
          type: "success",
          text: t.successAlert || "Pesan Anda telah berhasil dikirim langsung ke email!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Gagal mengirim pesan");
      }
    } catch (err) {
      console.error(err);
      // Fallback if offline/blocked: mailto link
      const mailtoSubject = encodeURIComponent(`[Portfolio Contact] Pesan Baru dari ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Nama Pengirim: ${formData.name}\nEmail Pengirim: ${formData.email}\n\nPesan:\n${formData.message}`
      );
      window.location.href = `mailto:darmaiputusemara@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      setStatusMessage({
        type: "success",
        text: "Membuka aplikasi email untuk pengiriman...",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {statusMessage && (
              <div
                className={`p-4 rounded-xl text-sm font-semibold ${
                  statusMessage.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder={t.messagePlaceholder || "Mari diskusikan ide proyek Web, aplikasi Android, atau Data Science Anda..."}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#110826] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-700 transition-all font-semibold text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl btn-cyber text-white font-extrabold text-sm tracking-wider uppercase shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i className="bi bi-send-fill text-base"></i>
              <span>{isSubmitting ? "Sending..." : t.button}</span>
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
            href="mailto:darmaiputusemara@gmail.com"
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
