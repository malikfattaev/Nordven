export const serviceSlugs = ["websites", "erp", "ai"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceTheme = {
  accent: string;
  accentSoft: string;
  badge: string;
};

export type ServiceDefinition = {
  slug: ServiceSlug;
  number: string;
  theme: ServiceTheme;
  stack: ReadonlyArray<string>;
};

export const services: ReadonlyArray<ServiceDefinition> = [
  {
    slug: "websites",
    number: "01",
    theme: {
      accent: "var(--color-mist-300)",
      accentSoft: "var(--color-mist-100)",
      badge: "bg-[color:var(--color-mist-100)] text-[color:var(--color-mist-500)]",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Sanity", "Vercel"],
  },
  {
    slug: "erp",
    number: "02",
    theme: {
      accent: "var(--color-mint-300)",
      accentSoft: "var(--color-mint-100)",
      badge: "bg-[color:var(--color-mint-100)] text-[color:var(--color-mint-500)]",
    },
    stack: ["Postgres", "NestJS", "Drizzle", "Temporal", "Stripe", "HubSpot"],
  },
  {
    slug: "ai",
    number: "03",
    theme: {
      accent: "var(--color-lilac-300)",
      accentSoft: "var(--color-lilac-100)",
      badge: "bg-[color:var(--color-lilac-100)] text-[color:var(--color-lilac-500)]",
    },
    stack: ["OpenAI", "Anthropic", "LangChain", "pgvector", "Vercel AI", "Modal"],
  },
] as const;
