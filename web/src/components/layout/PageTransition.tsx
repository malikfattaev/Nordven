"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [animating, setAnimating] = useState(true);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationStart={() => setAnimating(true)}
      onAnimationComplete={() => setAnimating(false)}
      style={animating ? { willChange: "opacity, transform" } : undefined}
    >
      {children}
    </motion.div>
  );
}
