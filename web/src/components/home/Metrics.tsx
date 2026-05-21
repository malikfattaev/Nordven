"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

const METRIC_KEYS = ["0", "1"] as const;

const SPARKS: Record<string, { values: number[]; color: string; fill: string }> = {
  "0": {
    values: [38, 32, 28, 22, 24, 18, 20, 16, 14, 14],
    color: "var(--color-mist-400)",
    fill: "var(--color-mist-100)",
  },
  "1": {
    values: [1, 2, 3, 3, 4, 5, 6, 7, 8, 9],
    color: "var(--color-mint-400)",
    fill: "var(--color-mint-100)",
  },
};

function parseValue(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { number: null, suffix: raw };
  return { number: Number(match[1]), suffix: match[2] };
}

function Spark({ values, color, fill }: { values: number[]; color: string; fill: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const width = 200;
  const height = 48;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg
      ref={ref}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="mt-4"
      aria-hidden
    >
      <motion.path
        d={area}
        fill={fill}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
      />
    </svg>
  );
}

export function Metrics() {
  const t = useTranslations("home.metrics");

  return (
    <Section tight>
      <Container>
        <Reveal>
          <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-16">
            {METRIC_KEYS.map((key) => {
              const { number, suffix } = parseValue(t(`items.${key}.value`));
              const spark = SPARKS[key];
              return (
                <div key={key} className="text-center">
                  <dd className="font-display text-5xl font-medium text-balance sm:text-6xl">
                    {number !== null ? (
                      <>
                        <CountUp to={number} />
                        {suffix && <span>{suffix}</span>}
                      </>
                    ) : (
                      suffix
                    )}
                  </dd>
                  <dt className="mt-3 text-sm text-pretty text-[color:var(--color-ink-soft)]">
                    {t(`items.${key}.label`)}
                  </dt>
                  {spark && <Spark {...spark} />}
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
