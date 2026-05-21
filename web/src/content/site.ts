export const site = {
  name: "Nordven",
  tagline: "Software Lab",
  domain: "nordvenlab.com",
  email: "coo@nordvenlab.com",
  socials: {
    instagram: {
      handle: "nordvenlab",
      url: "https://instagram.com/nordvenlab",
    },
  },
  founded: 2023,
} as const;

export type Site = typeof site;
