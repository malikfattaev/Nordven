import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "@/lib/env";
import * as schema from "./schema";

declare global {
  var __nordvenPg: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  if (!serverEnv.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Database access is unavailable.");
  }
  return postgres(serverEnv.DATABASE_URL, {
    prepare: false,
    max: 5,
    idle_timeout: 20,
  });
}

const client = globalThis.__nordvenPg ?? createClient();
if (serverEnv.NODE_ENV !== "production") {
  globalThis.__nordvenPg = client;
}

export const db = drizzle(client, { schema });
export { schema };
