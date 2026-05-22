import { CashflowClient, type CashflowAccount, type CashflowOperation } from "./CashflowClient";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type AccountRow = CashflowAccount;

type OperationRow = Omit<CashflowOperation, "amount"> & {
  amount: string;
};

export default async function CashflowPage() {
  const sql = getSql();
  const accounts = await sql<AccountRow[]>`
    SELECT id, name, currency, sort_order
    FROM cashflow_accounts
    ORDER BY sort_order ASC
  `;
  const operations = await sql<OperationRow[]>`
    SELECT
      op.id::text AS id,
      op.type,
      op.amount::text AS amount,
      op.account_id,
      account.name AS account_name,
      account.currency,
      op.description,
      op.operation_date::text AS operation_date
    FROM cashflow_operations op
    JOIN cashflow_accounts account ON account.id = op.account_id
    ORDER BY op.operation_date DESC, op.created_at DESC
  `;

  return (
    <CashflowClient
      accounts={accounts}
      operations={operations.map((operation) => ({
        ...operation,
        amount: Number(operation.amount),
      }))}
    />
  );
}
