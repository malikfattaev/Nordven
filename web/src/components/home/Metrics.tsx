import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const METRIC_KEYS = ["0", "1", "2", "3"] as const;

export function Metrics() {
  const t = useTranslations("home.metrics");

  return (
    <Section tight>
      <Container>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {METRIC_KEYS.map((key) => (
            <div key={key} className="border-t border-[color:var(--color-line-strong)] pt-5">
              <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                {t(`items.${key}.label`)}
              </dt>
              <dd className="mt-3 font-display text-4xl text-balance sm:text-5xl">
                {t(`items.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
