"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import { hashPassword, readSession } from "@/lib/auth";

export type EmployeeFormState = { error?: string; ok?: true };

function validate(login: string, password: string, name: string, surname: string): string | null {
  if (login.length < 3) return "Логин минимум 3 символа";
  if (/\s/.test(login)) return "Логин без пробелов";
  if (password.length < 8) return "Пароль минимум 8 символов";
  if (name.length < 1) return "Имя обязательно";
  if (surname.length < 1) return "Фамилия обязательна";
  return null;
}

export async function createEmployeeAction(
  _prev: EmployeeFormState,
  formData: FormData,
): Promise<EmployeeFormState> {
  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const surname = String(formData.get("surname") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();

  const error = validate(login, password, name, surname);
  if (error) return { error };

  const sql = getSql();
  const password_hash = await hashPassword(password);

  try {
    await sql`
      INSERT INTO users (login, password_hash, name, surname, position)
      VALUES (${login}, ${password_hash}, ${name}, ${surname}, ${position})
    `;
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    if (message.includes("duplicate") || message.includes("unique")) {
      return { error: "Сотрудник с таким логином уже есть" };
    }
    return { error: "Не получилось сохранить" };
  }

  revalidatePath("/employees");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteEmployeeAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const me = await readSession();
  if (me?.id === id) return;

  const sql = getSql();
  await sql`DELETE FROM users WHERE id = ${id}`;

  revalidatePath("/employees");
  revalidatePath("/");
}
