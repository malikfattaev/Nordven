"use server";

import { redirect } from "next/navigation";
import { ensureReady } from "@/lib/db";
import { findUserByLogin, issueSession, verifyPassword, clearSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  await ensureReady();

  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!login || !password) {
    return { error: "Enter login and password" };
  }

  const user = await findUserByLogin(login);
  if (!user) {
    return { error: "Invalid login or password" };
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    return { error: "Invalid login or password" };
  }

  await issueSession({
    id: user.id,
    login: user.login,
    name: user.name,
    surname: user.surname,
    position: user.position,
  });

  redirect(next.startsWith("/") ? next : "/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
