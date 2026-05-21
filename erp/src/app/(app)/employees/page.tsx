import { Trash2 } from "lucide-react";
import { getSql, type DbUser } from "@/lib/db";
import { readSession } from "@/lib/auth";
import { EmployeeForm } from "./EmployeeForm";
import { deleteEmployeeAction } from "./actions";

export const dynamic = "force-dynamic";

const DATE_FMT = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default async function EmployeesPage() {
  const sql = getSql();
  const me = await readSession();
  const employees = await sql<Pick<DbUser, "id" | "login" | "name" | "surname" | "position" | "created_at">[]>`
    SELECT id, login, name, surname, position, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
            Сотрудники
          </p>
          <h1 className="mt-2 font-display text-3xl text-[color:var(--color-ink)] sm:text-4xl">
            Команда
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[color:var(--color-ink-soft)]">
            Управляйте учётными записями и доступом в ERP.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <EmployeeForm />
      </div>

      <div className="card-surface mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] shadow-[var(--shadow-soft)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/40 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              <th className="px-5 py-3 font-medium">Имя</th>
              <th className="px-5 py-3 font-medium">Должность</th>
              <th className="px-5 py-3 font-medium">Логин</th>
              <th className="px-5 py-3 font-medium">Добавлен</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const isSelf = me?.id === emp.id;
              return (
                <tr
                  key={emp.id}
                  className="border-b border-[color:var(--color-line)] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-mist-100)] text-xs font-medium text-[color:var(--color-mist-500)]">
                        {(emp.name[0] ?? "") + (emp.surname[0] ?? "")}
                      </span>
                      <div>
                        <div className="text-[color:var(--color-ink)]">
                          {emp.name} {emp.surname}
                        </div>
                        {isSelf && (
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                            это вы
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[color:var(--color-ink-soft)]">
                    {emp.position || "—"}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[color:var(--color-ink-soft)]">
                    {emp.login}
                  </td>
                  <td className="px-5 py-4 text-[color:var(--color-ink-soft)]">
                    {DATE_FMT.format(emp.created_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {!isSelf && (
                      <form action={deleteEmployeeAction}>
                        <input type="hidden" name="id" value={emp.id} />
                        <button
                          type="submit"
                          aria-label="Удалить"
                          className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-rose-400)] hover:text-[color:var(--color-rose-500)]"
                        >
                          <Trash2 size={14} strokeWidth={1.75} />
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-[color:var(--color-ink-muted)]">
                  Сотрудников ещё нет.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
