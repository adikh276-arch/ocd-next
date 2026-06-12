import { useTranslation } from "react-i18next";

export interface Language {
  code: string;
  name: string;
  nativeName?: string;
}

export const languages: Language[] = [
  { code: "en", name: t("english"), nativeName: "English" },
  { code: "es", name: t("spanish"), nativeName: "Español" },
  { code: "fr", name: t("french"), nativeName: "Français" },
  { code: "pt", name: t("portuguese"), nativeName: "Português" },
  { code: "de", name: t("german"), nativeName: "Deutsch" },
  { code: "ar", name: t("arabic"), nativeName: "العربية" },
  { code: "hi", name: t("hindi"), nativeName: "हिन्दी" },
  { code: "bn", name: t("bengali"), nativeName: "বাংলা" },
  { code: "zh", name: t("chinese"), nativeName: "中文" },
  { code: "ja", name: t("japanese"), nativeName: "日本語" },
  { code: "id", name: t("indonesian"), nativeName: "Bahasa Indonesia" },
  { code: "tr", name: t("turkish"), nativeName: "Türkçe" },
  { code: "vi", name: t("vietnamese"), nativeName: "Tiếng Việt" },
  { code: "ko", name: t("korean"), nativeName: "한국어" },
  { code: "ru", name: t("russian"), nativeName: "Русский" },
  { code: "it", name: t("italian"), nativeName: "Italiano" },
  { code: "pl", name: t("polish"), nativeName: "Polski" },
  { code: "th", name: t("thai"), nativeName: "ไทย" },
  { code: "tl", name: t("filipino"), nativeName: "Filipino" },
];
