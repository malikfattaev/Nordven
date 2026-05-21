import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/ui/Aurora";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
      <Aurora />
      <Container className="relative">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl text-balance sm:text-6xl">{t("title")}</h1>
            <p className="mt-6 max-w-md text-pretty text-[color:var(--color-ink-soft)]">{t("subtitle")}</p>

            <div className="mt-12 rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                {t("direct.title")}
              </p>
              <p className="mt-3 text-pretty text-[color:var(--color-ink-soft)]">
                {t.rich("direct.body", {
                  address: site.email,
                  link: (chunks) => (
                    <a
                      className="font-medium text-[color:var(--color-ink)] underline-offset-4 hover:underline"
                      href={`mailto:${site.email}`}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
