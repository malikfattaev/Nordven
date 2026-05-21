import postgres from "postgres";

declare global {
  var __erpPg: ReturnType<typeof postgres> | undefined;
}

function getClient() {
  if (globalThis.__erpPg) return globalThis.__erpPg;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = postgres(url, { prepare: false, max: 2, idle_timeout: 20 });
  if (process.env.NODE_ENV !== "production") {
    globalThis.__erpPg = client;
  }
  return client;
}

export type PingResult = {
  ok: boolean;
  now?: string;
  version?: string;
  error?: string;
};

export async function ping(): Promise<PingResult> {
  try {
    const sql = getClient();
    const rows = await sql<{ now: Date; version: string }[]>`SELECT NOW() as now, version()`;
    return {
      ok: true,
      now: rows[0].now.toISOString(),
      version: rows[0].version.split(" on ")[0],
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
