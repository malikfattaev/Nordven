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
      <svg
        aria-hidden="true"
        className="h-[1.18em] w-[1.18em] shrink-0"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="nordven-logo-ring"
            x1="5"
            y1="4"
            x2="27"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#F6C19F" />
            <stop offset="0.32" stopColor="#C3D8EF" />
            <stop offset="0.66" stopColor="#CBBCDD" />
            <stop offset="1" stopColor="#B1DCBE" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="11" fill="none" stroke="#161513" strokeOpacity="0.28" strokeWidth="5.4" />
        <circle cx="16" cy="16" r="11" fill="none" stroke="url(#nordven-logo-ring)" strokeWidth="4.2" />
      </svg>
      <span>{site.name}</span>
    </span>
  );
}
