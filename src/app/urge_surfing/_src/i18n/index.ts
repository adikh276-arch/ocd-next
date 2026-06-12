import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all locale files statically so they are bundled — no runtime API calls
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import de from './locales/de.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import zhCN from './locales/zh-CN.json';
import ja from './locales/ja.json';
import id from './locales/id.json';
import tr from './locales/tr.json';
import vi from './locales/vi.json';
import ko from './locales/ko.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import pl from './locales/pl.json';
import th from './locales/th.json';
import tl from './locales/tl.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: t("english"), nativeName: 'English' },
  { code: 'es', name: t("spanish"), nativeName: 'Español' },
  { code: 'fr', name: t("french"), nativeName: 'Français' },
  { code: 'pt', name: t("portuguese"), nativeName: 'Português' },
  { code: 'de', name: t("german"), nativeName: 'Deutsch' },
  { code: 'ar', name: t("arabic"), nativeName: 'العربية' },
  { code: 'hi', name: t("hindi"), nativeName: 'हिन्दी' },
  { code: 'bn', name: t("bengali"), nativeName: 'বাংলা' },
  { code: 'zh-CN', name: t("mandarin"), nativeName: '简体中文' },
  { code: 'ja', name: t("japanese"), nativeName: '日本語' },
  { code: 'id', name: t("indonesian"), nativeName: 'Bahasa Indonesia' },
  { code: 'tr', name: t("turkish"), nativeName: 'Türkçe' },
  { code: 'vi', name: t("vietnamese"), nativeName: 'Tiếng Việt' },
  { code: 'ko', name: t("korean"), nativeName: '한국어' },
  { code: 'ru', name: t("russian"), nativeName: 'Русский' },
  { code: 'it', name: t("italian"), nativeName: 'Italiano' },
  { code: 'pl', name: t("polish"), nativeName: 'Polski' },
  { code: 'th', name: t("thai"), nativeName: 'ไทย' },
  { code: 'tl', name: t("filipino"), nativeName: 'Filipino' },
];

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  pt: { translation: pt },
  de: { translation: de },
  ar: { translation: ar },
  hi: { translation: hi },
  bn: { translation: bn },
  'zh-CN': { translation: zhCN },
  ja: { translation: ja },
  id: { translation: id },
  tr: { translation: tr },
  vi: { translation: vi },
  ko: { translation: ko },
  ru: { translation: ru },
  it: { translation: it },
  pl: { translation: pl },
  th: { translation: th },
  tl: { translation: tl },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      detection: {
        order: [t("querystring"), t("navigator"), t("htmltag")],
        lookupQuerystring: 'lang',
        caches: [],
      },
      interpolation: {
        escapeValue: false,
      },
    });
} else {
  Object.keys(resources).forEach(lng => {
    i18n.addResourceBundle(lng, 'translation', (resources as any)[lng].translation, true, true);
  });
}

export default i18n;
