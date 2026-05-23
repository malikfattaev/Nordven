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
        className="h-[0.82em] w-[0.82em] shrink-0"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="nordven-logo-orb"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(10 8) rotate(43) scale(26)"
          >
            <stop offset="0" stopColor="#F6C19F" />
            <stop offset="0.36" stopColor="#C3D8EF" />
            <stop offset="0.68" stopColor="#CBBCDD" />
            <stop offset="1" stopColor="#B1DCBE" />
          </radialGradient>
          <linearGradient
            id="nordven-logo-sheen"
            x1="8"
            y1="5"
            x2="24"
            y2="27"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity="0.72" />
            <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="url(#nordven-logo-orb)" />
        <circle cx="16" cy="16" r="13" fill="url(#nordven-logo-sheen)" />
        <circle cx="16" cy="16" r="13" stroke="#161513" strokeOpacity="0.18" strokeWidth="1.5" />
      </svg>
      <span>{site.name}</span>
    </span>
  );
}
