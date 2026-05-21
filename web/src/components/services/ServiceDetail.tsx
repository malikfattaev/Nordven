import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { Link } from "@/i18n/navigation";
import { services, type ServiceDefinition } from "@/content/services";
import { cn } from "@/lib/cn";

const CAPABILITY_KEYS = ["0", "1", "2", "3"] as const;

type Props = {
  service: ServiceDefinition;
};

export function ServiceDetail({ service }: Props) {
  const t = useTranslations(`services.${service.slug}`);
  const tCommon = useTranslations("services.common");
  const tServices = useTranslations("services");

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Section className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32">
        <Aurora />
        <Container className="relative">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)] transition-colors hover:text-[color:var(--color-ink)]"
          >
            <span aria-hidden>←</span>
            {tCommon("back")}
          </Link>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                {service.number} / {t("name")}
              </p>
              <h1 className="mt-4 font-display text-5xl text-balance text-[color:var(--color-ink)] sm:text-6xl md:text-7xl">
                {t("tagline")}
              </h1>
            </div>
            <p className="text-pretty text-[color:var(--color-ink-soft)] md:col-span-4 md:text-right md:text-lg">
              {t("intro")}
            </p>
          </div>
        </Container>
      </Section>

      <Section tight className="border-y border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)]">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>{tCommon("capabilities")}</Eyebrow>
            </div>
            <ul className="md:col-span-8 space-y-1">
              {CAPABILITY_KEYS.map((key) => (
                <li
                  key={key}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-[color:var(--color-line)] py-7 first:border-t-0 first:pt-0"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-2.5 w-2.5 rounded-full"
                    style={{ background: service.theme.accent }}
                  />
                  <div>
                    <h3 className="font-display text-2xl text-[color:var(--color-ink)] sm:text-3xl">
                      {t(`capabilities.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-pretty text-[color:var(--color-ink-soft)]">
                      {t(`capabilities.${key}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>{tCommon("stack")}</Eyebrow>
            </div>
            <ul className="md:col-span-8 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm",
                    service.theme.badge,
                  )}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tight className="border-t border-[color:var(--color-line)]">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>{tCommon("engagement")}</Eyebrow>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-2xl text-balance text-[color:var(--color-ink)] sm:text-3xl">
                {t("engagement")}
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  {tCommon("talk")}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tight className="border-t border-[color:var(--color-line)]">
        <Container>
          <Eyebrow>{tCommon("next")}</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group flex items-center justify-between rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-canvas-elevated)] p-6 transition-all duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-[color:var(--color-line-strong)] hover:shadow-[var(--shadow-soft)]"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                    {other.number}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">
                    {tServices(`${other.slug}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                    {tServices(`${other.slug}.short`)}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
