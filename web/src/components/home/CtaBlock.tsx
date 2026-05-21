import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function CtaBlock() {
  const t = useTranslations("home.cta");

  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)] p-10 sm:p-14 md:p-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--color-mist-100)] opacity-70 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[color:var(--color-peach-100)] opacity-60 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl text-balance sm:text-5xl md:text-6xl">{t("title")}</h2>
            <p className="mt-5 text-pretty text-[color:var(--color-ink-soft)] sm:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" size="lg">
                {t("primary")}
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 font-mono text-sm text-[color:var(--color-ink-soft)] underline-offset-4 hover:underline"
              >
                {t("secondary")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
