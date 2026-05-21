import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "@/lib/env";

async function run() {
  if (!serverEnv.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to run migrations.");
  }
  const client = postgres(serverEnv.DATABASE_URL, { max: 1 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await client.end();
  console.log("Migrations applied.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
