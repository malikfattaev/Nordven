export const serviceSlugs = ["web", "erp", "infra"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceTheme = {
  accent: string;
  accentSoft: string;
  ring: string;
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
    slug: "web",
    number: "01",
    theme: {
      accent: "var(--color-mist-300)",
      accentSoft: "var(--color-mist-100)",
      ring: "ring-[color:var(--color-mist-300)]",
      badge: "bg-[color:var(--color-mist-100)] text-[color:var(--color-mist-500)]",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "Sanity"],
  },
  {
    slug: "erp",
    number: "02",
    theme: {
      accent: "var(--color-mint-300)",
      accentSoft: "var(--color-mint-100)",
      ring: "ring-[color:var(--color-mint-300)]",
      badge: "bg-[color:var(--color-mint-100)] text-[color:var(--color-mint-500)]",
    },
    stack: ["Postgres", "NestJS", "Prisma", "Temporal", "Stripe", "Auth0"],
  },
  {
    slug: "infra",
    number: "03",
    theme: {
      accent: "var(--color-lilac-300)",
      accentSoft: "var(--color-lilac-100)",
      ring: "ring-[color:var(--color-lilac-300)]",
      badge: "bg-[color:var(--color-lilac-100)] text-[color:var(--color-lilac-500)]",
    },
    stack: ["AWS", "Terraform", "Kubernetes", "Cloudflare", "Grafana", "GitHub Actions"],
  },
] as const;

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
