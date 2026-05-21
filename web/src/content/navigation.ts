import { serviceSlugs } from "./services";

export const primaryNav = [
  { key: "services", href: "/#services" },
  { key: "process", href: "/#process" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const footerNav = {
  services: serviceSlugs.map((slug) => ({ key: slug, href: `/services/${slug}` })),
  company: [
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ],
  legal: [
    { key: "privacy", href: "/legal/privacy" },
    { key: "terms", href: "/legal/terms" },
  ],
} as const;
