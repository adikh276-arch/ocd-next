import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [t("querystring"), t("localstorage"), t("navigator")],
      lookupQuerystring: 'lang',
      caches: [t("localstorage")],
    },
  });

export default i18n;
