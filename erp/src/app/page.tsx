import { ping } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const status = await ping();

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-mute)]">
          Nordven Internal
        </p>
        <h1 className="mt-6 text-6xl font-medium tracking-[-0.02em]">ERP</h1>
        <p className="mt-5 text-sm text-[color:var(--color-mute)]">
          Internal operations platform. Coming online.
        </p>

        <div className="mt-12 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas-soft)] p-6 text-left">
          <div className="flex items-center gap-3">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                status.ok ? "bg-emerald-400" : "bg-rose-400"
              }`}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-mute)]">
              {status.ok ? "Database connected" : "Database error"}
            </span>
          </div>

          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-xs text-[color:var(--color-mute)]">
            {status.ok ? (
              <>
                <dt>now()</dt>
                <dd className="text-[color:var(--color-ink)]">{status.now}</dd>
                <dt>version</dt>
                <dd className="text-[color:var(--color-ink)] truncate">{status.version}</dd>
              </>
            ) : (
              <>
                <dt>error</dt>
                <dd className="text-[color:var(--color-ink)] break-words">{status.error}</dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </main>
  );
}
