import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const canonical = locale === "en" ? "/contact" : `/${locale}/contact`;
  return {
    title: tNav("contact"),
    description: tMeta("contact.description"),
    alternates: {
      canonical,
      languages: {
        "en-US": "/contact",
        "es-ES": "/es/contact",
        "x-default": "/contact",
      },
    },
    openGraph: {
      title: tMeta("contact.title"),
      description: tMeta("contact.description"),
      url: canonical,
      type: "website",
    },
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

  const channels = [
    {
      key: "email",
      label: t("channels.email.label"),
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      key: "instagram",
      label: t("channels.instagram.label"),
      value: `@${site.socials.instagram.handle}`,
      href: site.socials.instagram.url,
      external: true,
    },
  ];

  return (
    <Section className="pb-24 pt-4 sm:pt-6">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h1 className="font-display text-5xl text-balance sm:text-6xl">{t("title")}</h1>
            <p className="mt-6 max-w-md text-pretty text-[color:var(--color-ink-soft)]">
              {t("subtitle")}
            </p>

            <div className="mt-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                {t("channels.eyebrow")}
              </p>
              <ul className="mt-5 grid gap-3">
                {channels.map((channel) => (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer" : undefined}
                      className="card-surface group flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-5 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-[color:var(--color-ink)] hover:shadow-[var(--shadow-soft)]"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                          {channel.label}
                        </p>
                        <p className="mt-1.5 font-display text-lg text-[color:var(--color-ink)]">
                          {channel.value}
                        </p>
                      </div>
                      <span className="text-[color:var(--color-ink-soft)] group-hover:text-[color:var(--color-ink)]">
                        {ArrowOut}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
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
