import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <span
      className={cn(
        "font-display text-2xl font-medium tracking-[-0.01em] text-[color:var(--color-ink)] sm:text-[1.625rem]",
        className,
      )}
      aria-label={site.name}
    >
      {site.name}
    </span>
  );
}
