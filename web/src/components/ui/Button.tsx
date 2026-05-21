import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-ink)] text-[color:var(--color-canvas)] hover:bg-[color:#2a2824] focus-visible:ring-[color:var(--color-ink)]",
  secondary:
    "bg-[color:var(--color-canvas-elevated)] text-[color:var(--color-ink)] border border-[color:var(--color-line-strong)] hover:border-[color:var(--color-ink)] focus-visible:ring-[color:var(--color-ink)]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-line)] focus-visible:ring-[color:var(--color-ink-soft)]",
};

const sizeStyles: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[var(--ease-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-canvas)] disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: never;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, iconLeft, iconRight } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  const body = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer">
          {body}
        </a>
      );
    }
    return (
      <Link className={classes} href={href}>
        {body}
      </Link>
    );
  }

  const { href: _href, ...rest } = props as NativeButtonProps;
  void _href;
  return (
    <button {...rest} className={classes}>
      {body}
    </button>
  );
}
