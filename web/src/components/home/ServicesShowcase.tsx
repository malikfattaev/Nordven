import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

const ArrowIcon = (
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
    className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
  >
    <path d="M7 17 L17 7" />
    <path d="M9 7 L17 7 L17 15" />
  </svg>
);

export function ServicesShowcase() {
  const t = useTranslations("home.services");
  const tServices = useTranslations("services");

  return (
    <Section id="services">
      <Container>
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl md:text-6xl">
              {t("title")}
            </h2>
          </div>
          <p className="text-pretty text-[color:var(--color-ink-soft)] md:col-span-5 md:text-right">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={cn(
                "group relative flex flex-col justify-between rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)] p-8 transition-all duration-500 ease-[var(--ease-soft)]",
                "hover:-translate-y-1 hover:border-[color:var(--color-line-strong)] hover:shadow-[var(--shadow-lift)]",
                "min-h-[26rem]",
              )}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 rounded-t-[var(--radius-card)] opacity-0 transition-opacity duration-500 ease-[var(--ease-soft)] group-hover:opacity-100"
                style={{ background: service.theme.accent }}
              />

              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                  {service.number}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                    service.theme.badge,
                  )}
                >
                  {tServices(`${service.slug}.name`)}
                </span>
              </div>

              <div className="mt-12">
                <h3 className="font-display text-3xl text-balance sm:text-4xl">
                  {tServices(`${service.slug}.tagline`)}
                </h3>
                <p className="mt-4 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                  {tServices(`${service.slug}.short`)}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
                {t("exploreCta")}
                {ArrowIcon}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
