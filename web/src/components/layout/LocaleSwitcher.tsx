"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ru: "RU",
  uz: "UZ",
};

type Variant = "header" | "inline";

export function LocaleSwitcher({
  className,
  variant = "header",
  onSwitch,
}: {
  className?: string;
  variant?: Variant;
  onSwitch?: () => void;
}) {
  const t = useTranslations("nav");
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setLocale = (next: Locale) => {
    setOpen(false);
    if (next === active) {
      onSwitch?.();
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: next });
      onSwitch?.();
    });
  };

  if (variant === "inline") {
    return (
      <div
        className={cn("inline-flex items-center gap-1 rounded-full border border-[color:var(--color-line)] p-1", className)}
        aria-label={t("language")}
      >
        {locales.map((code) => {
          const isActive = code === active;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ease-[var(--ease-soft)]",
                isActive
                  ? "bg-[color:var(--color-ink)] text-[color:var(--color-canvas)]"
                  : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]",
                isPending && "opacity-70",
              )}
            >
              {labels[code]}
            </button>
          );
        })}
      </div>
    );
  }

  const others = locales.filter((code) => code !== active);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center text-[15px] text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)] focus:outline-none focus-visible:text-[color:var(--color-ink)]",
          isPending && "opacity-70",
        )}
      >
        <span>{labels[active]}</span>
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-[var(--ease-soft)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <ul
          role="listbox"
          className="flex min-w-[3rem] flex-col items-center gap-0.5 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-canvas)] p-1 shadow-[var(--shadow-soft)]"
        >
          {others.map((code) => (
            <li key={code} className="w-full">
              <button
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => setLocale(code)}
                className="w-full rounded-lg px-3 py-1.5 text-center text-[15px] text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)] focus:outline-none focus-visible:text-[color:var(--color-ink)]"
              >
                {labels[code]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
