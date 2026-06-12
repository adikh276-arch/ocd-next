"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import enStrings from "@/locales/en.json";

interface TranslationContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
  setLang: (lang: string) => void;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType>({
  t: (key) => (enStrings as any)[key] || key,
  lang: "en",
  setLang: () => {},
  isLoading: false,
});

export const useTranslation = () => useContext(TranslationContext);

const SUPPORTED_LANGS = [
  "en", "es", "fr", "pt", "de", "ar", "hi", "bn", "zh-cn", "ja", "id", "tr", "vi", "ko", "ru", "it", "pl", "th", "tl"
];

const STORAGE_KEY = "user_language";

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang] = useState("en");
  const [translations] = useState<Record<string, string>>(enStrings);
  const [isLoading] = useState(false);

  const setLang = useCallback((newLang: string) => {
    // Disabled language switching
    console.log("Language switching is currently disabled. Requested:", newLang);
  }, []);

  useEffect(() => {
    // Logic removed to lock at English
  }, [lang]);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    let str = translations[key] || (enStrings as any)[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  }, [translations]);

  return (
    <TranslationContext.Provider value={{ t, lang, setLang, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}
