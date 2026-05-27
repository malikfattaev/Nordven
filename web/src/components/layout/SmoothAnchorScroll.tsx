"use client";

import { useEffect } from "react";

const SCROLL_DURATION = 1100;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function SmoothAnchorScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number | null = null;

    function scrollToNode(node: HTMLElement) {
      if (prefersReducedMotion) {
        node.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      const startY = window.scrollY;
      const targetY = startY + node.getBoundingClientRect().top;
      const distance = targetY - startY;
      if (Math.abs(distance) < 1) return;

      const startTime = performance.now();
      if (rafId !== null) cancelAnimationFrame(rafId);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          rafId = null;
        }
      };
      rafId = requestAnimationFrame(step);
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

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
      scrollToNode(node);
      history.replaceState(null, "", `#${hash}`);
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
