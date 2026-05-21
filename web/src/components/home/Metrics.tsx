import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const METRIC_KEYS = ["0", "1"] as const;

export function Metrics() {
  const t = useTranslations("home.metrics");

  return (
    <Section tight>
      <Container>
        <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-16">
          {METRIC_KEYS.map((key) => (
            <div key={key} className="text-center">
              <dd className="font-display text-5xl font-medium text-balance sm:text-6xl">
                {t(`items.${key}.value`)}
              </dd>
              <dt className="mt-3 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                {t(`items.${key}.label`)}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
