import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Aurora } from "@/components/ui/Aurora";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <Section className="overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-40">
      <Aurora />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-mint-300)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-mint-400)]" />
            </span>
            {t("badge")}
          </Badge>

          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
            {t("eyebrow")}
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-balance text-[color:var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {t("titleA")}{" "}
            <em className="font-display italic text-[color:var(--color-lilac-400)]">
              {t("titleEm")}
            </em>{" "}
            {t("titleB")}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg text-[color:var(--color-ink-soft)] sm:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              {t("primaryCta")}
            </Button>
            <Button href="/#services" variant="secondary" size="lg">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
