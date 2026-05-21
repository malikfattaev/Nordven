export const site = {
  name: "Nordven",
  domain: "nordven.com",
  email: "hello@nordven.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/nordven",
    github: "https://github.com/malikfattaev",
  },
  founded: 2023,
} as const;

export type Site = typeof site;
