export const serviceSlugs = ["websites", "erp", "ai"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceTheme = {
  accent: string;
  badge: string;
};

export type ServiceDefinition = {
  slug: ServiceSlug;
  theme: ServiceTheme;
};

export const services: ReadonlyArray<ServiceDefinition> = [
  {
    slug: "websites",
    theme: {
      accent: "var(--color-mist-300)",
      badge: "bg-[color:var(--color-mist-100)] text-[color:var(--color-mist-500)]",
    },
  },
  {
    slug: "erp",
    theme: {
      accent: "var(--color-mint-300)",
      badge: "bg-[color:var(--color-mint-100)] text-[color:var(--color-mint-500)]",
    },
  },
  {
    slug: "ai",
    theme: {
      accent: "var(--color-lilac-300)",
      badge: "bg-[color:var(--color-lilac-100)] text-[color:var(--color-lilac-500)]",
    },
  },
] as const;

export const contactInterestSlugs = [...serviceSlugs, "other"] as const;
export type ContactInterestSlug = (typeof contactInterestSlugs)[number];
