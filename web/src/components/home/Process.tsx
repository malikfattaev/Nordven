"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessShape } from "@/components/home/ProcessShape";
import { cn } from "@/lib/cn";

const STEP_KEYS = ["0", "1", "2", "3"] as const;

export function Process() {
  const t = useTranslations("home.process");
  const [index, setIndex] = useState(0);

  const total = STEP_KEYS.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <Section id="process">
      <Container>
        <Reveal>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-5xl md:text-6xl">
                {t("title")}
              </h2>
            </div>
            <p className="text-balance text-[color:var(--color-ink-soft)] md:col-span-5 md:text-right">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
            <div className="card-surface relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,0.5), transparent 70%)",
                }}
              />
              <div className="relative mx-auto flex aspect-[5/4] w-full max-w-md items-center justify-center">
                <ProcessShape index={index} />
              </div>

              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + total) % total)}
                aria-label="Previous step"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-canvas)] text-[color:var(--color-ink-soft)] shadow-[var(--shadow-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                <ChevronLeft size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % total)}
                aria-label="Next step"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-canvas)] text-[color:var(--color-ink-soft)] shadow-[var(--shadow-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                <ChevronRight size={16} strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex flex-col justify-center">
              <div className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
                {t(`steps.${STEP_KEYS[index]}.title`)}
              </h3>
              <p className="mt-4 max-w-md text-pretty text-[color:var(--color-ink-soft)]">
                {t(`steps.${STEP_KEYS[index]}.body`)}
              </p>

              <div className="mt-8 flex gap-2">
                {STEP_KEYS.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 ease-[var(--ease-soft)]",
                      i === index
                        ? "w-10 bg-[color:var(--color-ink)]"
                        : "w-6 bg-[color:var(--color-line-strong)] hover:bg-[color:var(--color-ink-muted)]",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
