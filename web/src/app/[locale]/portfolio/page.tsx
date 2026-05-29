import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { alternatesFor } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { portfolioProjects } from "@/content/portfolio";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const alternates = alternatesFor(locale as Locale, "/portfolio");

  return {
    title: tNav("portfolio"),
    description: tMeta("portfolio.description"),
    alternates,
    openGraph: {
      title: tMeta("portfolio.title"),
      description: tMeta("portfolio.description"),
      url: alternates.canonical,
      type: "website",
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  return (
    <>
      <Section className="pb-10 pt-4 text-center sm:pb-14 sm:pt-6">
        <Container>
          <Reveal>
            <h1 className="font-display text-6xl font-medium leading-[1.02] text-balance sm:text-7xl md:text-8xl">
              <span className="bg-gradient-to-r from-[color:var(--color-mist-500)] via-[color:var(--color-lilac-400)] to-[color:var(--color-lilac-500)] bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[color:var(--color-ink-soft)]">
              {t("subtitle")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tight className="pb-24">
        <Container>
          <ul className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {portfolioProjects.map((project, i) => (
              <Reveal
                key={project.id}
                as="li"
                delay={0.05 + (i % 2) * 0.06}
                style={{ "--accent": project.accent } as CSSProperties}
                className="card-surface flex h-full flex-col rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8 transition-[border-color] duration-300 ease-[var(--ease-soft)] hover:border-[color:var(--accent)] sm:p-10"
              >
                <p className="font-display text-3xl font-medium tracking-tight text-[color:var(--accent)] sm:text-4xl">
                  {t(`projects.${project.id}.client`)}
                </p>
                <h2 className="mt-10 font-display text-2xl text-balance text-[color:var(--color-ink)] sm:text-3xl">
                  {t(`projects.${project.id}.title`)}
                </h2>
                <p className="mt-4 text-pretty text-[color:var(--color-ink-soft)]">
                  {t(`projects.${project.id}.body`)}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
