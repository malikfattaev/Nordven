"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";

export type CashflowActionState = { error?: string; ok?: true };

const OPERATION_TYPES = ["income", "expense", "profit", "profit_expense"] as const;

type OperationType = (typeof OPERATION_TYPES)[number];

function parseOperationType(value: FormDataEntryValue | null): OperationType | null {
  if (typeof value !== "string") return null;
  return OPERATION_TYPES.includes(value as OperationType) ? (value as OperationType) : null;
}

function parseAmount(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return NaN;
  return Number(value.replace(/\s/g, "").replace(",", "."));
}

async function accountExists(accountId: string) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    SELECT id FROM cashflow_accounts WHERE id = ${accountId} LIMIT 1
  `;
  return rows.length > 0;
}

function validateDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function createCashflowOperationAction(
  _prev: CashflowActionState,
  formData: FormData,
): Promise<CashflowActionState> {
  const type = parseOperationType(formData.get("type"));
  const amount = parseAmount(formData.get("amount"));
  const accountId = String(formData.get("accountId") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const operationDate = String(formData.get("operationDate") ?? "").trim();

  if (!type) return { error: "Choose an operation type" };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter a positive amount" };
  if (!accountId || !(await accountExists(accountId))) return { error: "Choose an account" };
  if (!validateDate(operationDate)) return { error: "Choose a valid date" };

  const sql = getSql();
  await sql`
    INSERT INTO cashflow_operations (type, amount, account_id, description, operation_date)
    VALUES (${type}, ${amount}, ${accountId}, ${description}, ${operationDate})
  `;

  revalidatePath("/finance");
  revalidatePath("/");
  return { ok: true };
}

export async function updateCashflowOperationAction(
  _prev: CashflowActionState,
  formData: FormData,
): Promise<CashflowActionState> {
  const id = String(formData.get("id") ?? "").trim();
  const type = parseOperationType(formData.get("type"));
  const amount = parseAmount(formData.get("amount"));
  const accountId = String(formData.get("accountId") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const operationDate = String(formData.get("operationDate") ?? "").trim();

  if (!id) return { error: "Operation not found" };
  if (!type) return { error: "Choose an operation type" };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Enter a positive amount" };
  if (!accountId || !(await accountExists(accountId))) return { error: "Choose an account" };
  if (!validateDate(operationDate)) return { error: "Choose a valid date" };

  const sql = getSql();
  await sql`
    UPDATE cashflow_operations
    SET type = ${type},
        amount = ${amount},
        account_id = ${accountId},
        description = ${description},
        operation_date = ${operationDate},
        updated_at = now()
    WHERE id = ${id}
  `;

  revalidatePath("/finance");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteCashflowOperationAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const sql = getSql();
  await sql`DELETE FROM cashflow_operations WHERE id = ${id}`;

  revalidatePath("/finance");
  revalidatePath("/");
}
