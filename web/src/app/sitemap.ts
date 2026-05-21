import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { publicEnv } from "@/lib/env";
import { htmlLangMap, pathForLocale } from "@/lib/seo";

const ROUTES = ["/", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => {
      const path = pathForLocale(locale, routing.defaultLocale, route);
      const languages: Record<string, string> = {
        "x-default": `${base}${pathForLocale(routing.defaultLocale, routing.defaultLocale, route)}`,
      };
      for (const l of routing.locales) {
        languages[htmlLangMap[l]] = `${base}${pathForLocale(l, routing.defaultLocale, route)}`;
      }

      return {
        url: `${base}${path}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: route === "/" ? 1.0 : 0.8,
        alternates: { languages },
      };
    }),
  );
}
