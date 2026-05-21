import postgres from "postgres";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

declare global {
  var __erpPg: ReturnType<typeof postgres> | undefined;
  var __erpReady: Promise<void> | undefined;
}

export function getSql() {
  if (globalThis.__erpPg) return globalThis.__erpPg;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = postgres(url, { prepare: false, max: 4, idle_timeout: 20 });
  globalThis.__erpPg = client;
  return client;
}

const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");

async function runMigrations() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS _migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const files = (await readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const applied = await sql<{ name: string }[]>`SELECT name FROM _migrations`;
  const appliedSet = new Set(applied.map((r) => r.name));

  for (const file of files) {
    if (appliedSet.has(file)) continue;
    const body = await readFile(path.join(MIGRATIONS_DIR, file), "utf8");
    await sql.unsafe(body);
    await sql`INSERT INTO _migrations (name) VALUES (${file})`;
  }
}

export async function ensureReady() {
  if (globalThis.__erpReady) return globalThis.__erpReady;
  globalThis.__erpReady = (async () => {
    await runMigrations();
    const { ensureBootstrapAdmin } = await import("./bootstrap");
    await ensureBootstrapAdmin();
  })().catch((error) => {
    globalThis.__erpReady = undefined;
    throw error;
  });
  return globalThis.__erpReady;
}

export type DbUser = {
  id: string;
  login: string;
  password_hash: string;
  name: string;
  surname: string;
  position: string;
  created_at: Date;
  updated_at: Date;
};

export type SessionUser = Pick<DbUser, "id" | "login" | "name" | "surname" | "position">;
