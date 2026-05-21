import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tContact = await getTranslations({ locale, namespace: "contact" });
  return {
    title: tNav("contact"),
    description: tContact("subtitle"),
  };
}

const ArrowOut = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  >
    <path d="M7 17 L17 7" />
    <path d="M9 7 L17 7 L17 15" />
  </svg>
);

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section className="pb-24 pt-20 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl text-balance sm:text-6xl md:text-7xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[color:var(--color-ink-soft)] sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <ContactForm />
        </div>

        <div className="mx-auto mt-20 max-w-2xl">
          <p className="text-center text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
            {t("channels.eyebrow")}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex h-full items-center justify-between gap-6 rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 transition-colors duration-300 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    {t("channels.email.label")}
                  </p>
                  <p className="mt-2 font-display text-lg text-[color:var(--color-ink)] sm:text-xl">
                    {site.email}
                  </p>
                </div>
                <span className="text-[color:var(--color-ink-soft)] group-hover:text-[color:var(--color-ink)]">
                  {ArrowOut}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-center justify-between gap-6 rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 transition-colors duration-300 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    {t("channels.instagram.label")}
                  </p>
                  <p className="mt-2 font-display text-lg text-[color:var(--color-ink)] sm:text-xl">
                    @{site.socials.instagram.handle}
                  </p>
                </div>
                <span className="text-[color:var(--color-ink-soft)] group-hover:text-[color:var(--color-ink)]">
                  {ArrowOut}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
