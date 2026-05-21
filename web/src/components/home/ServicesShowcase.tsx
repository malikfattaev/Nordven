import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

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

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.slug}
              style={{ "--accent": service.theme.accent } as CSSProperties}
              className={cn(
                "card-surface group relative flex min-h-[19rem] cursor-pointer flex-col justify-between rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8",
                "transition-[border-color] duration-300 ease-[var(--ease-soft)]",
                "hover:border-[color:var(--accent)]",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
                    service.theme.badge,
                  )}
                >
                  {tServices(`${service.slug}.name`)}
                </span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-300 ease-[var(--ease-soft)] group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--color-ink)]"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 L17 7" />
                    <path d="M9 7 L17 7 L17 15" />
                  </svg>
                </span>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-3xl text-balance sm:text-4xl">
                  {tServices(`${service.slug}.tagline`)}
                </h3>
                <p className="mt-4 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                  {tServices(`${service.slug}.short`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
