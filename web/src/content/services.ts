export const serviceSlugs = ["websites", "erp", "ai"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceDefinition = {
  slug: ServiceSlug;
  number: string;
};

export const services: ReadonlyArray<ServiceDefinition> = [
  { slug: "websites", number: "01" },
  { slug: "erp", number: "02" },
  { slug: "ai", number: "03" },
] as const;

export const contactInterestSlugs = [...serviceSlugs, "other"] as const;
export type ContactInterestSlug = (typeof contactInterestSlugs)[number];
