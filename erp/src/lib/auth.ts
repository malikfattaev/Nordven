import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getSql, type DbUser, type SessionUser } from "./db";

export const SESSION_COOKIE = "nordven_erp_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export async function findUserByLogin(login: string): Promise<DbUser | null> {
  const sql = getSql();
  const rows = await sql<DbUser[]>`
    SELECT id, login, password_hash, name, surname, position, created_at, updated_at
    FROM users
    WHERE lower(login) = lower(${login})
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function findUserById(id: string): Promise<DbUser | null> {
  const sql = getSql();
  const rows = await sql<DbUser[]>`
    SELECT id, login, password_hash, name, surname, position, created_at, updated_at
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function issueSession(user: SessionUser) {
  const token = await new SignJWT({
    sub: user.id,
    login: user.login,
    name: user.name,
    surname: user.surname,
    position: user.position,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function readSessionFromToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string") return null;
    return {
      id: payload.sub,
      login: String(payload.login ?? ""),
      name: String(payload.name ?? ""),
      surname: String(payload.surname ?? ""),
      position: String(payload.position ?? ""),
    };
  } catch {
    return null;
  }
}

export async function readSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return readSessionFromToken(token);
}
