"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 grid place-items-center px-4 py-8"
          aria-modal="true"
          role="dialog"
        >
          <div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-[color:var(--color-ink)]/35 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="card-surface relative z-10 w-full max-w-md rounded-[var(--radius-card)] border border-[color:var(--color-line)] p-7 shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl text-[color:var(--color-ink)]">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] transition-colors duration-200 ease-[var(--ease-soft)] hover:border-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
