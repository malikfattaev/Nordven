import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type Props = {
  className?: string;
  monogramOnly?: boolean;
};

export function Logo({ className, monogramOnly = false }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label={site.name}>
      <span
        aria-hidden
        className="relative grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-canvas)]"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 20 L5 4 L19 20 L19 4" />
        </svg>
      </span>
      {!monogramOnly && (
        <span className="font-display text-xl tracking-tight">{site.name}</span>
      )}
    </span>
  );
}
