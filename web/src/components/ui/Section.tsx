import { cn } from "@/lib/cn";
import type { ElementType, HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tight?: boolean;
};

export function Section({ as: Tag = "section", className, tight = false, ...props }: SectionProps) {
  return (
    <Tag
      {...props}
      className={cn(
        "relative",
        tight ? "py-12 sm:py-16" : "py-16 sm:py-20 lg:py-24",
        className,
      )}
    />
  );
}
