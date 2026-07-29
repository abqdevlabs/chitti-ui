"use client";
import i18n from "@/i18n/i18n";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { LanguageCode } from "./languages";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const VALID_LANGUAGES = new Set<LanguageCode>(["en", "ta", "hi"]);
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return "en";

    const stored = localStorage?.getItem("app_language") ?? "en";

    return stored && VALID_LANGUAGES.has(stored as LanguageCode)
      ? (stored as LanguageCode)
      : "en";
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr"; // Tamil is also LTR
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
};
