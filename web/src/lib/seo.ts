import type { Locale } from "@/i18n/routing";

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ru: "ru_RU",
  uz: "uz_UZ",
};

export const htmlLangMap: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  ru: "ru-RU",
  uz: "uz-UZ",
};

export const languageNameMap: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  ru: "Russian",
  uz: "Uzbek",
};

export function pathForLocale(locale: Locale, defaultLocale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const cleaned = normalized === "/" ? "" : normalized;
  if (locale === defaultLocale) return cleaned || "/";
  return `/${locale}${cleaned}` || `/${locale}`;
}
