export const site = {
  name: "Nordven",
  legalName: "Nordven Software Lab",
  tagline: "Software Lab",
  domain: "nordvenlab.com",
  url: "https://nordvenlab.com",
  email: "coo@nordvenlab.com",
  phone: {
    display: "+1 (716) 902-6473",
    e164: "+17169026473",
  },
  socials: {
    instagram: {
      handle: "nordvenlab",
      url: "https://instagram.com/nordvenlab",
    },
  },
  founded: 2023,
  founders: [
    { name: "Malik Fattaev", role: "COO & Co-Founder" },
    { name: "Shohrukh Normaxmatov", role: "CFO & Co-Founder" },
  ],
  areaServed: ["US", "MX", "ES", "AR", "CO", "CL", "PE"],
  knowsAbout: [
    "Web Development",
    "Web Design",
    "ERP Development",
    "CRM Development",
    "Artificial Intelligence",
    "AI Agents",
    "AI Chatbots",
    "Retrieval Augmented Generation",
    "Software Engineering",
  ],
} as const;

export type Site = typeof site;
