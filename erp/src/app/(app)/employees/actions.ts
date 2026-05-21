"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import { hashPassword, readSession } from "@/lib/auth";

export type EmployeeFormState = { error?: string; ok?: true };

function validateCommon(login: string, name: string, surname: string): string | null {
  if (login.length < 3) return "Login must be at least 3 characters";
  if (/\s/.test(login)) return "Login can't contain spaces";
  if (name.length < 1) return "First name is required";
  if (surname.length < 1) return "Last name is required";
  return null;
}

function parseDuplicate(message: string): string | null {
  if (message.includes("duplicate") || message.includes("unique")) {
    return "An employee with this login already exists";
  }
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

  const baseError = validateCommon(login, name, surname);
  if (baseError) return { error: baseError };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };

  const sql = getSql();
  const password_hash = await hashPassword(password);

  try {
    await sql`
      INSERT INTO users (login, password_hash, name, surname, position)
      VALUES (${login}, ${password_hash}, ${name}, ${surname}, ${position})
    `;
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return { error: parseDuplicate(message) ?? "Couldn't save" };
  }

  revalidatePath("/employees");
  revalidatePath("/");
  return { ok: true };
}

export async function updateEmployeeAction(
  _prev: EmployeeFormState,
  formData: FormData,
): Promise<EmployeeFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Employee not found" };

  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const surname = String(formData.get("surname") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();

  const baseError = validateCommon(login, name, surname);
  if (baseError) return { error: baseError };
  if (password.length > 0 && password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const sql = getSql();

  try {
    if (password.length > 0) {
      const password_hash = await hashPassword(password);
      await sql`
        UPDATE users
        SET login = ${login},
            name = ${name},
            surname = ${surname},
            position = ${position},
            password_hash = ${password_hash},
            updated_at = now()
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE users
        SET login = ${login},
            name = ${name},
            surname = ${surname},
            position = ${position},
            updated_at = now()
        WHERE id = ${id}
      `;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return { error: parseDuplicate(message) ?? "Couldn't save" };
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
