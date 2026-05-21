import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const session = await readSession();
  if (session) redirect(next && next.startsWith("/") ? next : "/");

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 95% 75% at 0% 0%, rgba(155, 189, 224, 0.55), transparent 70%), radial-gradient(ellipse 95% 75% at 100% 100%, rgba(203, 188, 221, 0.6), transparent 70%)",
        }}
      />
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)]">
            Nordven Internal
          </p>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--color-ink)]">ERP</h1>
          <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
            Войдите, чтобы продолжить.
          </p>
        </div>

        <div className="card-surface mt-10 rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-7 shadow-[var(--shadow-soft)]">
          <LoginForm next={next} />
        </div>
      </div>
    </main>
  );
}
