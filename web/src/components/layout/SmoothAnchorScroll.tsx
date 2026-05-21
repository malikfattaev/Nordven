"use client";

import { useEffect } from "react";

export function SmoothAnchorScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      let hash: string | null = null;
      if (href.startsWith("#")) {
        hash = href.slice(1);
      } else if (href.includes("#")) {
        try {
          const url = new URL(href, window.location.href);
          if (url.pathname === window.location.pathname && url.hash) {
            hash = url.hash.slice(1);
          }
        } catch {
          return;
        }
      }
      if (!hash) return;

      const node = document.getElementById(hash);
      if (!node) return;

      event.preventDefault();
      node.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", `#${hash}`);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
