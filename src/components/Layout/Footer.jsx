import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { getAssetUrl } from "@/utils/assets";

export default function Footer() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-[#070312] text-slate-700 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={getAssetUrl("/logo_profile.svg")}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-mikalea text-2xl font-bold text-slate-900 dark:text-white">
                Mether Willz
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-semibold">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <a href="#home" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  {langData.nav?.home || "Beranda"}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  {langData.nav?.about || "Tentang"}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  {langData.nav?.skills || "Keahlian"}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  {langData.nav?.projects || "Proyek"} (8)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  {langData.nav?.contact || "Kontak"}
                </a>
              </li>
            </ul>
          </div>

          {/* Specialization */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              {t.specialization || "Spesialisasi Utama"}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-400 font-semibold">
              <li className="flex items-center gap-2">
                <i className="bi bi-android2 text-purple-700 dark:text-purple-400"></i>
                <span>{t.specAndroid || "Pengembangan Aplikasi Android"}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-code-slash text-indigo-700 dark:text-indigo-400"></i>
                <span>{t.specWeb || "Pengembangan Web Frontend"}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-palette-fill text-purple-700 dark:text-purple-400"></i>
                <span>{t.specUI || "Desain UI Responsif & Bersih"}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-shield-check text-purple-700 dark:text-purple-400"></i>
                <span>{t.specPerf || "Aplikasi Performa Tinggi"}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 dark:text-slate-400 gap-4 font-semibold">
          <p>© {currentYear} Mether Willz. {t.copyright}</p>
          <p className="font-mono text-purple-900 dark:text-purple-300">Web & Android Developer</p>
        </div>
      </div>
    </footer>
  );
}
