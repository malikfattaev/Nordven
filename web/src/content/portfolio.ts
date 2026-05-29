export const portfolioProjectIds = [
  "sandimas",
  "thespot",
  "yolla",
  "airmax",
] as const;
export type PortfolioProjectId = (typeof portfolioProjectIds)[number];

export type PortfolioProject = {
  id: PortfolioProjectId;
  accent: string;
};

export const portfolioProjects: ReadonlyArray<PortfolioProject> = [
  { id: "sandimas", accent: "var(--color-mist-400)" },
  { id: "thespot", accent: "var(--color-lilac-400)" },
  { id: "yolla", accent: "var(--color-mint-400)" },
  { id: "airmax", accent: "var(--color-mist-500)" },
] as const;
