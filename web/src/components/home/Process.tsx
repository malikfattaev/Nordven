import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STEP_KEYS = ["0", "1", "2", "3"] as const;

export function Process() {
  const t = useTranslations("home.process");

  return (
    <Section id="process" className="bg-[color:var(--color-canvas-elevated)] border-y border-[color:var(--color-line)]">
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[color:var(--color-ink-soft)]">
              {t("subtitle")}
            </p>
          </div>

          <ol className="md:col-span-7 md:pl-8">
            {STEP_KEYS.map((index, i) => (
              <li
                key={index}
                className="grid grid-cols-[auto_1fr] gap-6 border-t border-[color:var(--color-line)] py-7 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)] pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
                    {t(`steps.${index}.title`)}
                  </h3>
                  <p className="mt-2 text-pretty text-[color:var(--color-ink-soft)]">
                    {t(`steps.${index}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
