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
        tight ? "py-16 sm:py-20" : "py-24 sm:py-32 lg:py-40",
        className,
      )}
    />
  );
}
