import { getSql, type DbUser } from "@/lib/db";
import { readSession } from "@/lib/auth";
import { EmployeesList } from "./EmployeesList";

export const dynamic = "force-dynamic";

type EmployeeRow = Pick<DbUser, "id" | "login" | "name" | "surname" | "position" | "created_at">;

export default async function EmployeesPage() {
  const sql = getSql();
  const me = await readSession();
  const employees = await sql<EmployeeRow[]>`
    SELECT id, login, name, surname, position, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
        Team
      </h1>
      <p className="mt-3 max-w-xl text-sm text-[color:var(--color-ink-soft)]">
        Manage user accounts and ERP access.
      </p>

      <EmployeesList employees={[...employees]} currentUserId={me?.id ?? null} />
    </div>
  );
}
