import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Globe, Database, BrainCircuit, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisual } from "@/components/home/ServiceVisual";
import { Link } from "@/i18n/navigation";
import { services, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

const ICONS: Record<ServiceSlug, LucideIcon> = {
  websites: Globe,
  erp: Database,
  ai: BrainCircuit,
};

export function ServicesShowcase() {
  const t = useTranslations("home.services");
  const tServices = useTranslations("services");

  return (
    <Section id="services">
      <Container>
        <Reveal>
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
        </Reveal>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.slug];
            return (
              <Reveal
                key={service.slug}
                as="li"
                delay={0.05 + i * 0.08}
                style={{ "--accent": service.theme.accent } as CSSProperties}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "card-surface group relative flex min-h-[19rem] flex-col rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 sm:min-h-[22rem] sm:p-7",
                    "transition-[border-color] duration-300 ease-[var(--ease-soft)]",
                    "hover:border-[color:var(--accent)] focus-visible:outline-none focus-visible:border-[color:var(--accent)]",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
                      <Icon size={15} strokeWidth={1.6} aria-hidden className="shrink-0" />
                      {tServices(`${service.slug}.name`)}
                    </span>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-300 ease-[var(--ease-soft)] group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--color-ink)]"
                    >
                      <ArrowUpRight size={14} strokeWidth={1.75} />
                    </span>
                  </div>

                  <div className="mt-6">
                    <ServiceVisual slug={service.slug} />
                  </div>

                  <div className="mt-auto pt-6">
                    <h3 className="font-display text-2xl text-balance sm:text-3xl">
                      {tServices(`${service.slug}.tagline`)}
                    </h3>
                    <p className="mt-3 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                      {tServices(`${service.slug}.short`)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
