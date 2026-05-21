import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("container-page", className)} />;
}
