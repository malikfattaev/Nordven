import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas-elevated)] px-3 py-1 text-xs font-medium text-[color:var(--color-ink-soft)]",
        className,
      )}
    />
  );
}
