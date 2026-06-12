"use client";
import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
}

interface TranslationContextType {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  languages: Language[];
  t: (text: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be inside TranslationProvider');
  return ctx;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'EspaÃ±ol' },
  { code: 'fr', name: 'FranÃ§ais' },
  { code: 'pt', name: 'PortuguÃªs' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©' },
  { code: 'hi', name: 'à¤¹à¤¿à¤¨à¥à¤¦à¥€' },
  { code: 'bn', name: 'à¦¬à¦¾à¦‚à¦²à¦¾' },
  { code: 'zh-CN', name: 'ç®€ä½“ä¸­æ–‡' },
  { code: 'ja', name: 'æ—¥æœ¬èªž' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'tr', name: 'TÃ¼rkÃ§e' },
  { code: 'vi', name: 'Tiáº¿ng Viá»‡t' },
  { code: 'ko', name: 'í•œêµ­ì–´' },
  { code: 'ru', name: 'Ð ÑƒÑÑÐºÐ¸Ð¹' },
  { code: 'it', name: 'Italiano' },
  { code: 'pl', name: 'Polski' },
  { code: 'th', name: 'à¹„à¸—à¸¢' },
  { code: 'tl', name: 'Filipino' }
];

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLang] = useState('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadTranslations = useCallback(async (lang: string) => {
    setIsLoading(true);
    try {
      const enModule = await import('../locales/en.json');
      setTranslations(enModule.default || enModule);
    } catch (err) {
      console.error(`Failed to load translations for ${lang}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTranslations('en');
  }, [loadTranslations]);

  const setCurrentLang = useCallback(async (lang: string) => {
    console.log("Language switching is currently disabled. Requested:", lang);
  }, []);

  const t = useCallback((text: string): string => {
    const raw = translations[text] || text;
    
    // Simple HTML entity decoder for common characters (Google Translate artifacts)
    return raw
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }, [translations]);

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang, languages: LANGUAGES, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

