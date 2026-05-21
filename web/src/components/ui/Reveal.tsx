"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useMemo, type ElementType, type ReactNode } from "react";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 12,
  duration = 0.6,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const Component = useMemo(() => motion.create(as) as typeof motion.div, [as]);
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.32, 0.72, 0, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
