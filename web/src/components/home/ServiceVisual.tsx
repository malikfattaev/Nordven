"use client";

import { motion } from "motion/react";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

const SVG_VIEWPORT = { once: true, amount: 0.2 } as const;

function WebsitesVisual() {
  return (
    <motion.svg
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={SVG_VIEWPORT}
    >
      <rect
        x="6"
        y="10"
        width="228"
        height="100"
        rx="10"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        fill="var(--color-canvas)"
        fillOpacity="0.6"
      />
      <circle cx="18" cy="22" r="2" fill="var(--color-line-strong)" />
      <circle cx="26" cy="22" r="2" fill="var(--color-line-strong)" />
      <circle cx="34" cy="22" r="2" fill="var(--color-line-strong)" />
      <line x1="6" y1="32" x2="234" y2="32" stroke="var(--color-line)" strokeWidth="1" />

      <motion.path
        d="M16 90 Q60 50 100 70 T180 60 T230 50"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
      />
      <motion.circle
        cx="180"
        cy="60"
        r="3"
        fill="var(--accent)"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.3, delay: 1 }}
      />

      <rect x="18" y="44" width="40" height="6" rx="2" fill="var(--color-line)" />
      <rect x="18" y="56" width="64" height="4" rx="2" fill="var(--color-line)" />
    </motion.svg>
  );
}

function ErpVisual() {
  const rows = [80, 64, 72, 56];
  return (
    <motion.svg
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={SVG_VIEWPORT}
    >
      <rect
        x="6"
        y="10"
        width="228"
        height="100"
        rx="10"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        fill="var(--color-canvas)"
        fillOpacity="0.6"
      />
      <line x1="6" y1="30" x2="234" y2="30" stroke="var(--color-line)" strokeWidth="1" />
      <rect x="14" y="18" width="36" height="6" rx="2" fill="var(--color-line-strong)" />
      <rect x="60" y="18" width="40" height="6" rx="2" fill="var(--color-line)" />
      <rect x="110" y="18" width="40" height="6" rx="2" fill="var(--color-line)" />
      <rect x="160" y="18" width="60" height="6" rx="2" fill="var(--color-line)" />

      {rows.map((w, i) => (
        <g key={i}>
          <line
            x1="6"
            y1={48 + i * 16}
            x2="234"
            y2={48 + i * 16}
            stroke="var(--color-line)"
            strokeWidth="0.5"
          />
          <motion.rect
            x="14"
            y={40 + i * 16}
            height="6"
            rx="2"
            fill={i === 1 ? "var(--accent)" : "var(--color-line-strong)"}
            variants={{ hidden: { width: 0 }, visible: { width: w } }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.32, 0.72, 0, 1] }}
          />
          <rect x="160" y={40 + i * 16} width="20" height="6" rx="2" fill="var(--color-line)" />
        </g>
      ))}
    </motion.svg>
  );
}

function AiVisual() {
  const cols = [30, 90, 150, 210];
  const layers = [
    [30, 60, 90],
    [20, 48, 72, 100],
    [20, 48, 72, 100],
    [45, 75],
  ];
  return (
    <motion.svg
      viewBox="0 0 240 120"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={SVG_VIEWPORT}
    >
      {layers.flatMap((layer, li) =>
        layer.map((y, ni) => {
          const next = layers[li + 1];
          if (!next) return null;
          return next.map((y2, ni2) => (
            <motion.line
              key={`${li}-${ni}-${ni2}`}
              x1={cols[li]}
              y1={y}
              x2={cols[li + 1]}
              y2={y2}
              stroke="var(--accent)"
              strokeOpacity="0.7"
              strokeWidth="1"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.1 + li * 0.1, ease: [0.32, 0.72, 0, 1] }}
            />
          ));
        }),
      )}
      {layers.map((layer, li) =>
        layer.map((y, ni) => {
          const isHero = li === 1 && ni === 1;
          return (
            <motion.circle
              key={`n-${li}-${ni}`}
              cx={cols[li]}
              cy={y}
              r={isHero ? 5.5 : 4}
              fill={isHero ? "var(--accent)" : "var(--color-canvas)"}
              stroke="var(--accent)"
              strokeWidth="1.75"
              variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
              transition={{ duration: 0.4, delay: 0.2 + li * 0.08 + ni * 0.04 }}
            />
          );
        }),
      )}
    </motion.svg>
  );
}

const VISUALS: Record<ServiceSlug, () => React.JSX.Element> = {
  websites: WebsitesVisual,
  erp: ErpVisual,
  ai: AiVisual,
};

export function ServiceVisual({
  slug,
  className,
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  const Visual = VISUALS[slug];
  return (
    <div className={cn("pointer-events-none relative h-28 w-full", className)}>
      <Visual />
    </div>
  );
}
