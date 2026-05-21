"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const setLocale = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas-elevated)] p-0.5 text-xs font-medium",
        isPending && "opacity-70",
        className,
      )}
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
              "rounded-full px-2.5 py-1 transition-colors duration-300 ease-[var(--ease-soft)]",
              isActive
                ? "bg-[color:var(--color-ink)] text-[color:var(--color-canvas)]"
                : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]",
            )}
          >
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
