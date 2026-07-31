import { useState, useEffect } from "react";

export const LANGUAGES = [
  { code: "id", name: "Indonesia", flagClass: "fi fi-id", fallbackEmoji: "🇮🇩" },
  { code: "en", name: "English", flagClass: "fi fi-us", fallbackEmoji: "🇺🇸" },
  { code: "ja", name: "日本語", flagClass: "fi fi-jp", fallbackEmoji: "🇯🇵" },
  { code: "de", name: "Deutsch", flagClass: "fi fi-de", fallbackEmoji: "🇩🇪" },
  { code: "fr", name: "Français", flagClass: "fi fi-fr", fallbackEmoji: "🇫🇷" },
  { code: "es", name: "Español", flagClass: "fi fi-es", fallbackEmoji: "🇪🇸" },
  { code: "zh", name: "中文", flagClass: "fi fi-cn", fallbackEmoji: "🇨🇳" },
];

export default function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (code) => {
    if (LANGUAGES.some((lang) => lang.code === code)) {
      setLanguage(code);
    }
  };

  return { language, setLanguage: changeLanguage, languages: LANGUAGES };
}
