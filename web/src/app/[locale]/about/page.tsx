import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";

const VALUE_KEYS = ["0", "1", "2", "3"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("lead"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCta = await getTranslations("home.cta");

  return (
    <>
      <Section className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32">
        <Aurora />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl text-balance sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg text-[color:var(--color-ink-soft)]">
              {t("lead")}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)]">
        <Container>
          <dl className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {VALUE_KEYS.map((key, i) => (
              <div key={key} className="grid grid-cols-[auto_1fr] gap-6">
                <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)] pt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
                    {t(`values.${key}.title`)}
                  </dt>
                  <dd className="mt-3 text-pretty text-[color:var(--color-ink-soft)]">
                    {t(`values.${key}.body`)}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="max-w-xl font-display text-3xl text-balance sm:text-4xl">
              {tCta("title")}
            </h2>
            <Button href="/contact" size="lg">
              {tCta("primary")}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
