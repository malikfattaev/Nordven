"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteEmployeeAction } from "./actions";
import { EmployeeDialog, type EditableEmployee } from "./EmployeeDialog";

type Employee = EditableEmployee & {
  created_at: Date;
};

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

type Props = {
  employees: Employee[];
  currentUserId: string | null;
};

type DialogState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; employee: EditableEmployee };

export function EmployeesList({ employees, currentUserId }: Props) {
  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });
  const close = () => setDialog({ mode: "closed" });

  return (
    <>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setDialog({ mode: "create" })}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-4 text-sm font-medium text-[color:var(--color-canvas)] transition-colors duration-200 ease-[var(--ease-soft)] hover:bg-[#2a2824]"
        >
          <Plus size={15} strokeWidth={2} />
          Add employee
        </button>
      </div>

      <div className="card-surface mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-line)] shadow-[var(--shadow-soft)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/40 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Position</th>
              <th className="px-5 py-3 font-medium">Login</th>
              <th className="px-5 py-3 font-medium">Added</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const isSelf = currentUserId === emp.id;
              const initials = (emp.name[0] ?? "") + (emp.surname[0] ?? "");
              return (
                <tr
                  key={emp.id}
                  className="border-b border-[color:var(--color-line)] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-mist-100)] text-xs font-medium text-[color:var(--color-mist-500)]">
                        {initials}
                      </span>
                      <div>
                        <div className="text-[color:var(--color-ink)]">
                          {emp.name} {emp.surname}
                        </div>
                        {isSelf && (
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                            you
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
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        aria-label="Edit"
                        onClick={() =>
                          setDialog({
                            mode: "edit",
                            employee: {
                              id: emp.id,
                              login: emp.login,
                              name: emp.name,
                              surname: emp.surname,
                              position: emp.position,
                            },
                          })
                        }
                        className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                      >
                        <Pencil size={13} strokeWidth={1.75} />
                      </button>
                      {!isSelf && (
                        <form action={deleteEmployeeAction}>
                          <input type="hidden" name="id" value={emp.id} />
                          <button
                            type="submit"
                            aria-label="Delete"
                            className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-rose-400)] hover:text-[color:var(--color-rose-500)]"
                          >
                            <Trash2 size={14} strokeWidth={1.75} />
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-[color:var(--color-ink-muted)]">
                  No employees yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EmployeeDialog
        open={dialog.mode !== "closed"}
        onClose={close}
        employee={dialog.mode === "edit" ? dialog.employee : undefined}
      />
    </>
  );
}
