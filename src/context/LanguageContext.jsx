import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

export const LANGUAGES = [
  { code: "id", name: "Indonesia", flagClass: "fi fi-id", fallbackEmoji: "🇮🇩" },
  { code: "en", name: "English", flagClass: "fi fi-us", fallbackEmoji: "🇺🇸" },
  { code: "ja", name: "日本語", flagClass: "fi fi-jp", fallbackEmoji: "🇯🇵" },
  { code: "de", name: "Deutsch", flagClass: "fi fi-de", fallbackEmoji: "🇩🇪" },
  { code: "fr", name: "Français", flagClass: "fi fi-fr", fallbackEmoji: "🇫🇷" },
  { code: "es", name: "Español", flagClass: "fi fi-es", fallbackEmoji: "🇪🇸" },
  { code: "zh", name: "中文", flagClass: "fi fi-cn", fallbackEmoji: "🇨🇳" },
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (code) => {
    if (LANGUAGES.some((lang) => lang.code === code)) {
      setLanguageState(code);
    }
  };

  const langData = translations[language] || translations.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES, langData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default useLanguage;
