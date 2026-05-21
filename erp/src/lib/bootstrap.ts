import { getSql } from "./db";
import { hashPassword } from "./auth";

export async function ensureBootstrapAdmin() {
  const login = process.env.NORDVEN_BOOTSTRAP_LOGIN;
  const password = process.env.NORDVEN_BOOTSTRAP_PASSWORD;
  if (!login || !password) return;

  const sql = getSql();
  const [{ count }] = await sql<{ count: string }[]>`SELECT COUNT(*)::text AS count FROM users`;
  if (Number(count) > 0) return;

  const name = process.env.NORDVEN_BOOTSTRAP_NAME ?? "Admin";
  const surname = process.env.NORDVEN_BOOTSTRAP_SURNAME ?? "Nordven";
  const position = process.env.NORDVEN_BOOTSTRAP_POSITION ?? "Administrator";
  const password_hash = await hashPassword(password);

  await sql`
    INSERT INTO users (login, password_hash, name, surname, position)
    VALUES (${login}, ${password_hash}, ${name}, ${surname}, ${position})
  `;
}
