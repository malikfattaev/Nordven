"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500 ease-[var(--ease-soft)]",
        scrolled
          ? "border-b border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[color:var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--color-canvas)]"
      >
        {t("skipToContent")}
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link href="/" className="-mx-2 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Button href="/contact" size="md" className="hidden lg:inline-flex">
            {t("startProject")}
          </Button>
          <button
            type="button"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas-elevated)] lg:hidden"
          >
            <span className="relative h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 right-0 top-0 h-px bg-[color:var(--color-ink)] transition-transform duration-300 ease-[var(--ease-soft)]",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 right-0 bottom-0 h-px bg-[color:var(--color-ink)] transition-transform duration-300 ease-[var(--ease-soft)]",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-page border-t border-[color:var(--color-line)] py-6">
            <nav aria-label="Mobile" className="flex flex-col gap-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl leading-tight text-[color:var(--color-ink)]"
                >
                  {t(item.key)}
                </Link>
              ))}
              <Button href="/contact" size="lg" className="mt-4 w-full">
                {t("startProject")}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
