"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-30 border-b border-transparent bg-transparent">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[color:var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--color-canvas)]"
      >
        {t("skipToContent")}
      </a>

      <div className="container-page flex h-20 items-center justify-between gap-6 sm:h-24 lg:h-28">
        <Link
          href="/"
          className="-mx-2 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-7 lg:gap-10">
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex lg:gap-9">
            {primaryNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-[15px] text-[color:var(--color-ink-soft)] transition-colors duration-300 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact">{t("startProject")}</Button>
          </div>

          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>

          <BurgerButton
            open={open}
            label={open ? t("close") : t("menu")}
            onClick={() => setOpen((v) => !v)}
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <MobileOverlay onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}

function BurgerButton({
  open,
  label,
  onClick,
}: {
  open: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas-elevated)] transition-colors duration-300 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)] lg:hidden"
    >
      <span className="relative block h-3.5 w-5">
        <span
          className={cn(
            "absolute left-0 right-0 top-0 h-px origin-center bg-[color:var(--color-ink)] transition-all duration-400 ease-[var(--ease-soft)]",
            open && "top-1/2 -translate-y-1/2 rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[color:var(--color-ink)] transition-opacity duration-200 ease-[var(--ease-soft)]",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 right-0 bottom-0 h-px origin-center bg-[color:var(--color-ink)] transition-all duration-400 ease-[var(--ease-soft)]",
            open && "bottom-1/2 translate-y-1/2 -rotate-45",
          )}
        />
      </span>
    </button>
  );
}

function MobileOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations("nav");
  const tChannels = useTranslations("contact.channels");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-40 overflow-y-auto bg-[color:var(--color-canvas)]/85 backdrop-blur-xl lg:hidden"
    >
      <div className="container-page flex min-h-full flex-col pt-24 pb-8 sm:pt-28">
        <motion.nav
          aria-label="Mobile"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="flex flex-col"
        >
          {primaryNav.map((item, i) => (
            <motion.div
              key={item.key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } },
              }}
              className="border-b border-[color:var(--color-line)] last:border-b-0"
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between py-5 sm:py-6"
              >
                <span className="flex items-baseline gap-4 sm:gap-5">
                  <span className="font-mono text-xs tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl leading-none text-[color:var(--color-ink)] sm:text-5xl">
                    {t(item.key)}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  className="text-[color:var(--color-ink-muted)] transition-all duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-ink)]"
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mt-10"
        >
          <Button href="/contact" size="lg" className="w-full" iconRight={<ArrowUpRight size={16} strokeWidth={1.75} />}>
            {t("startProject")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-auto pt-12"
        >
          <div className="flex flex-col gap-6 border-t border-[color:var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                {tChannels("email.label")} · {site.email}
              </a>
              <a
                href={site.socials.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:text-[color:var(--color-ink)]"
              >
                {tChannels("instagram.label")} · @{site.socials.instagram.handle}
              </a>
            </div>

            <LocaleSwitcher variant="inline" onSwitch={onClose} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
