export const portfolioProjectIds = [
  "fleet",
  "triage",
  "commerce",
  "crm",
] as const;
export type PortfolioProjectId = (typeof portfolioProjectIds)[number];

export type PortfolioProject = {
  id: PortfolioProjectId;
  accent: string;
};

export const portfolioProjects: ReadonlyArray<PortfolioProject> = [
  { id: "fleet", accent: "var(--color-mist-400)" },
  { id: "triage", accent: "var(--color-lilac-400)" },
  { id: "commerce", accent: "var(--color-mint-400)" },
  { id: "crm", accent: "var(--color-mist-500)" },
] as const;
