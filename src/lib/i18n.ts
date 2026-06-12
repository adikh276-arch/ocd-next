import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Standard ISO codes for the target 20 languages
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "tl", name: "Filipino", flag: "🇵🇭" },
];

// Initialize i18next
if (!i18n.isInitialized) {
  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next);

  // NEXT_PUBLIC_BASE_PATH is '/ocd' in both dev and prod (set in next.config.ts)
  // The browser must fetch from /ocd/api/locales, not /api/locales
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  i18n.init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage', 'cookie'],
    },
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    backend: {
      loadPath: '/ocd/api/locales?lng={{lng}}&ns={{ns}}',
    },
    ns: ['common', 'ocd-self-care', 'tricho_ocd', 'clutter_journal'],
    defaultNS: 'common',
    fallbackNS: 'common',
  });
}

export default i18n;
