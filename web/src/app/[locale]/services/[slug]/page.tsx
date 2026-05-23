import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, BrainCircuit, Check, Database, Globe, type LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { ServiceVisual } from "@/components/home/ServiceVisual";
import { ContactForm } from "@/components/contact/ContactForm";
import { locales, type Locale } from "@/i18n/routing";
import { pathForLocale } from "@/lib/seo";
import { services, serviceSlugs, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

const ICONS: Record<ServiceSlug, LucideIcon> = {
  websites: Globe,
  erp: Database,
  ai: BrainCircuit,
};

const FEATURE_KEYS = ["0", "1", "2", "3"] as const;
const DELIVERABLE_KEYS = ["0", "1", "2", "3", "4", "5"] as const;

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as ReadonlyArray<string>).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const tServices = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  const title = tServices(`${slug}.name`);
  const description = tServices(`${slug}.detail.lead`);
  const canonical = pathForLocale(locale, "en", `/services/${slug}`);

  const languages: Record<string, string> = {
    "x-default": pathForLocale("en", "en", `/services/${slug}`),
  };
  for (const l of locales) {
    languages[l === "en" ? "en-US" : "es-ES"] = pathForLocale(l, "en", `/services/${slug}`);
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: `${title} — ${tMeta("title")}`,
      description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tDetail = await getTranslations("services.detail");

  const service = services.find((s) => s.slug === slug)!;
  const Icon = ICONS[slug];
  const accentStyle = { "--accent": service.theme.accent } as CSSProperties;

  return (
    <>
      <Section className="pb-12 pt-4 sm:pb-16 sm:pt-6">
        <Container>
          <Reveal>
            <Link
              href="/#services"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-x-0.5"
              />
              {tDetail("backToServices")}
            </Link>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
                  <Icon size={15} strokeWidth={1.6} aria-hidden />
                  {t(`${slug}.name`)}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-5xl text-balance sm:text-6xl md:text-[4rem] md:leading-[1.05]">
                  {t(`${slug}.detail.title`)}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-pretty text-lg text-[color:var(--color-ink-soft)]">
                  {t(`${slug}.detail.lead`)}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="md:col-span-6">
              <div
                style={accentStyle}
                className="card-surface relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 sm:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage:
                      "radial-gradient(circle at center, rgba(0,0,0,0.5), transparent 70%)",
                  }}
                />
                <div className="relative mx-auto flex aspect-[5/3] w-full items-center justify-center">
                  <ServiceVisual slug={slug} className="h-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Reveal>
            <Eyebrow>{tDetail("featuresEyebrow")}</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-display text-3xl text-balance sm:text-4xl">
              {t(`${slug}.tagline`)}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {FEATURE_KEYS.map((key, i) => (
              <Reveal
                key={key}
                as="li"
                delay={0.05 + i * 0.06}
                style={accentStyle}
                className={cn(
                  "card-surface rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 sm:p-8",
                  "transition-[border-color] duration-300 ease-[var(--ease-soft)] hover:border-[color:var(--accent)]",
                )}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
                    {t(`${slug}.detail.features.${key}.title`)}
                  </h3>
                </div>
                <p className="mt-4 text-pretty text-[color:var(--color-ink-soft)]">
                  {t(`${slug}.detail.features.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <Eyebrow>{tDetail("deliverablesEyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl text-balance sm:text-4xl">
                {t(`${slug}.detail.title`)}
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              <ul className="grid gap-4">
                {DELIVERABLE_KEYS.map((key, i) => (
                  <li
                    key={key}
                    style={accentStyle}
                    className="flex items-start gap-4 border-b border-[color:var(--color-line)] pb-4 last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color:var(--accent)] text-[color:var(--color-ink-soft)]"
                    >
                      <Check size={12} strokeWidth={2} />
                    </span>
                    <div>
                      <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1 text-[color:var(--color-ink)]">
                        {t(`${slug}.detail.deliverables.${key}`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="contact" className="pb-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <Eyebrow>{tDetail("cta.eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl">
                {tDetail("cta.title")}
              </h2>
              <p className="mt-6 max-w-md text-pretty text-[color:var(--color-ink-soft)]">
                {tDetail("cta.subtitle")}
              </p>

              <Link
                href="/#services"
                className="group mt-10 inline-flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                <span>{tDetail("backToServices")}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              <ContactForm defaultService={slug} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
