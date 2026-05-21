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
        <div className="card-surface rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-8 shadow-[var(--shadow-soft)]">
          <h1 className="text-center font-display text-3xl font-medium tracking-[-0.01em] text-[color:var(--color-ink)]">
            Nordven
          </h1>
          <div className="mt-7">
            <LoginForm next={next} />
          </div>
        </div>
      </div>
    </main>
  );
}
