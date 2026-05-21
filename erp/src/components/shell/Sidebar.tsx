"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Users, FolderKanban, type LucideIcon } from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { label: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    label: "Main",
    items: [{ href: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Finance",
    items: [{ href: "/finance", label: "Cashflow", icon: Wallet }],
  },
  {
    label: "Business",
    items: [
      { href: "/projects", label: "Projects", icon: FolderKanban },
      { href: "/employees", label: "Employees", icon: Users },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-[color:var(--color-line)] bg-[color:var(--color-canvas)] px-4 py-6 lg:flex lg:flex-col">
      <div className="px-2 pb-6">
        <span className="font-display text-xl tracking-[-0.01em] text-[color:var(--color-ink)]">
          Nordven
        </span>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-6">
        {GROUPS.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-2 px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
              <span aria-hidden className="h-px w-5 bg-[color:var(--color-line-strong)]" />
              {group.label}
            </span>
            {group.items.map(({ href, label, icon: Icon }) => {
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
          </div>
        ))}
      </nav>
    </aside>
  );
}
