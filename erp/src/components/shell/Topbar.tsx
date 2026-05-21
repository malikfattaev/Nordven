import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/login/actions";
import type { SessionUser } from "@/lib/db";

export function Topbar({ user }: { user: SessionUser }) {
  const initials = `${user.name?.[0] ?? ""}${user.surname?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-[color:var(--color-line)] bg-[color:var(--color-canvas)] px-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end leading-tight">
          <span className="text-sm text-[color:var(--color-ink)]">
            {user.name} {user.surname}
          </span>
          {user.position && (
            <span className="text-[11px] text-[color:var(--color-ink-muted)]">{user.position}</span>
          )}
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-mist-100)] text-xs font-medium text-[color:var(--color-mist-500)]">
          {initials}
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Sign out"
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
          >
            <LogOut size={15} strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </header>
  );
}
