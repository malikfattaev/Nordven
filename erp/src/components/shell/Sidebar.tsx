"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Users, FolderKanban, type LucideIcon } from "lucide-react";

const NAV: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/finance", label: "Финансы", icon: Wallet },
  { href: "/employees", label: "Сотрудники", icon: Users },
  { href: "/projects", label: "Проекты", icon: FolderKanban },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r border-[color:var(--color-line)] bg-[color:var(--color-canvas)] px-4 py-6 lg:flex lg:flex-col">
      <div className="px-2 pb-6">
        <span className="font-display text-xl tracking-[-0.01em] text-[color:var(--color-ink)]">
          Nordven
        </span>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          ERP
        </span>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ease-[var(--ease-soft)] ${
                isActive
                  ? "bg-[color:var(--color-canvas-elevated)] text-[color:var(--color-ink)] shadow-[var(--shadow-soft)]"
                  : "text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-canvas-elevated)] hover:text-[color:var(--color-ink)]"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
