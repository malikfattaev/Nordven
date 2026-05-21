"use client";

import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Wallet,
  Settings,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const SPARK_REVENUE = [12, 18, 14, 22, 19, 28, 24, 34, 30, 42];
const SPARK_LATENCY = [42, 36, 38, 30, 33, 25, 28, 22, 19, 16];
const BAR_VALUES = [42, 58, 36, 74, 50, 62, 48];
const DONUT_SEGMENTS = [
  { value: 48, color: "var(--color-mist-300)" },
  { value: 28, color: "var(--color-mint-300)" },
  { value: 14, color: "var(--color-lilac-300)" },
  { value: 10, color: "var(--color-peach-300)" },
];

function Sparkline({
  values,
  stroke,
  fill,
  width = 120,
  height = 36,
}: {
  values: number[];
  stroke: string;
  fill: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Donut({ size = 88 }: { size?: number }) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const total = DONUT_SEGMENTS.reduce((acc, s) => acc + s.value, 0);
  const segments = DONUT_SEGMENTS.reduce<
    Array<{ color: string; len: number; offset: number }>
  >((acc, seg) => {
    const prev = acc[acc.length - 1];
    const prevEnd = prev ? prev.offset + prev.len : 0;
    const len = (seg.value / total) * circumference;
    acc.push({ color: seg.color, len, offset: prevEnd });
    return acc;
  }, []);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={8}
      />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={8}
          strokeDasharray={`${seg.len} ${circumference - seg.len}`}
          strokeDashoffset={-seg.offset}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function Bars() {
  const max = Math.max(...BAR_VALUES);
  return (
    <div className="flex h-20 items-end gap-1.5">
      {BAR_VALUES.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: [0.32, 0.72, 0, 1] }}
          className="w-full rounded-t-sm"
          style={{
            background: i === BAR_VALUES.length - 2
              ? "var(--color-mist-400)"
              : "var(--color-mist-200)",
          }}
        />
      ))}
    </div>
  );
}

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: Wallet, label: "Billing" },
  { icon: Settings, label: "Settings" },
];

export function HeroMockup() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-5xl select-none sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        style={{ perspective: "1600px" }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/85 shadow-[var(--shadow-lift)] backdrop-blur-sm sm:[transform:rotateX(8deg)_rotateY(-4deg)]"
        >
          <div className="flex items-center gap-2 border-b border-[color:var(--color-line)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-peach-200)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-line-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-mint-200)]" />
            <div className="ml-3 hidden flex-1 items-center justify-center sm:flex">
              <span className="rounded-md bg-[color:var(--color-canvas-elevated)]/80 px-3 py-0.5 font-mono text-[10px] text-[color:var(--color-ink-muted)]">
                app.nordvenlab.com
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr]">
            <aside className="border-r border-[color:var(--color-line)] p-2.5 sm:p-4">
              <ul className="space-y-1">
                {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
                  <li key={label}>
                    <div
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                        active
                          ? "bg-[color:var(--color-mist-100)] text-[color:var(--color-ink)]"
                          : "text-[color:var(--color-ink-muted)]"
                      }`}
                    >
                      <Icon size={13} strokeWidth={1.75} />
                      <span className="truncate">{label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="grid gap-3 p-3 sm:gap-4 sm:p-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <StatCard label="MRR" value="$48.2k" delta="+12.4%" up />
                <StatCard label="Active users" value="2 184" delta="+3.1%" up />
                <StatCard label="Churn" value="0.8%" delta="-0.3%" />
              </div>

              <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr] sm:gap-4">
                <div className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/70 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                      Weekly volume
                    </span>
                    <span className="font-mono text-[10px] text-[color:var(--color-ink-soft)]">7d</span>
                  </div>
                  <div className="mt-4">
                    <Bars />
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/70 p-4">
                  <Donut />
                  <div className="space-y-1.5">
                    {DONUT_SEGMENTS.map((seg, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-[color:var(--color-ink-soft)]">
                        <span className="h-2 w-2 rounded-full" style={{ background: seg.color }} />
                        <span>{["Web", "ERP", "AI", "Other"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-2 bottom-8 hidden w-52 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)] p-4 shadow-[var(--shadow-lift)] sm:block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              Revenue
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[color:var(--color-mint-100)] px-2 py-0.5 font-mono text-[10px] text-[color:var(--color-mint-500)]">
              <TrendingUp size={10} strokeWidth={2} />
              +18%
            </span>
          </div>
          <div className="mt-2 font-display text-2xl text-[color:var(--color-ink)]">$148.6k</div>
          <div className="mt-2">
            <Sparkline
              values={SPARK_REVENUE}
              stroke="var(--color-mint-400)"
              fill="var(--color-mint-100)"
            />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -right-2 top-12 hidden w-52 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)] p-4 shadow-[var(--shadow-lift)] sm:block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              p95 latency
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[color:var(--color-mist-100)] px-2 py-0.5 font-mono text-[10px] text-[color:var(--color-mist-500)]">
              <TrendingDown size={10} strokeWidth={2} />
              -22ms
            </span>
          </div>
          <div className="mt-2 font-display text-2xl text-[color:var(--color-ink)]">128ms</div>
          <div className="mt-2">
            <Sparkline
              values={SPARK_LATENCY}
              stroke="var(--color-mist-400)"
              fill="var(--color-mist-100)"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  up = false,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/70 p-3 sm:p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
        {label}
      </div>
      <div className="mt-1.5 font-display text-lg text-[color:var(--color-ink)] sm:text-xl">
        {value}
      </div>
      <div
        className={`mt-1 font-mono text-[10px] ${
          up ? "text-[color:var(--color-mint-500)]" : "text-[color:var(--color-ink-muted)]"
        }`}
      >
        {delta}
      </div>
    </div>
  );
}
