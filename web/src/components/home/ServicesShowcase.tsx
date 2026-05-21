import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/content/services";

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
              className="relative flex min-h-[20rem] flex-col justify-between rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                  {service.number}
                </span>
                <span className="rounded-full border border-[color:var(--color-line-strong)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                  {tServices(`${service.slug}.name`)}
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
