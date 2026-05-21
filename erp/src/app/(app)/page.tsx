import { readSession } from "@/lib/auth";
import { getSql } from "@/lib/db";

export default async function DashboardPage() {
  const user = await readSession();
  const sql = getSql();
  const [{ count }] = await sql<{ count: string }[]>`SELECT COUNT(*)::text AS count FROM users`;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
        Dashboard
      </p>
      <h1 className="mt-2 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
        Привет, {user?.name ?? "коллега"}.
      </h1>
      <p className="mt-3 max-w-xl text-sm text-[color:var(--color-ink-soft)]">
        Это рабочее пространство Nordven ERP. Финансы и проекты появятся позже, сотрудники уже на месте.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <KpiCard label="Сотрудники" value={count} accent="mist" />
        <KpiCard label="Активные проекты" value="—" accent="mint" />
        <KpiCard label="Месячный оборот" value="—" accent="lilac" />
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "mist" | "mint" | "lilac";
}) {
  return (
    <div className="card-surface rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-6 shadow-[var(--shadow-soft)]">
      <span
        className="inline-block h-1.5 w-8 rounded-full"
        style={{ backgroundColor: `var(--color-${accent}-300)` }}
      />
      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl text-[color:var(--color-ink)]">{value}</div>
    </div>
  );
}
