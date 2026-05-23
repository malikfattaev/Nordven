import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-2xl font-medium tracking-[-0.01em] text-[color:var(--color-ink)] sm:text-[1.625rem]",
        className,
      )}
      aria-label={site.name}
    >
      <span
        aria-hidden="true"
        className="h-[0.82em] w-[0.82em] shrink-0 rounded-full border-[0.14em] border-current"
      />
      <span>{site.name}</span>
    </span>
  );
}
