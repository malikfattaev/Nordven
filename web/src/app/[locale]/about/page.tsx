import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const VALUE_KEYS = ["0", "1", "2", "3"] as const;
const TEAM_KEYS = ["0", "1"] as const;

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

  return (
    <>
      <Section className="pb-16 pt-20 sm:pb-20 sm:pt-24">
        <Container>
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

      <Section tight>
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

      <Section tight>
        <Container>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow>{t("team.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
                {t("team.title")}
              </h2>
            </div>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {TEAM_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8"
              >
                <p className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
                  {t(`team.members.${key}.name`)}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                  {t(`team.members.${key}.role`)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
