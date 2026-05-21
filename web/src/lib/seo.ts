import type { Locale } from "@/i18n/routing";

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

export const htmlLangMap: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
};

export function pathForLocale(locale: Locale, defaultLocale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const cleaned = normalized === "/" ? "" : normalized;
  if (locale === defaultLocale) return cleaned || "/";
  return `/${locale}${cleaned}` || `/${locale}`;
}
