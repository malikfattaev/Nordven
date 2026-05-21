import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Eyebrow({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-[color:var(--color-line-strong)]" />
      {children}
    </span>
  );
}
