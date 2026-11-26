"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Site-wide scroll effects, driven by one scroll listener (mounted once in the layout):
 *  - a thin progress bar at the top of the page
 *  - [data-parallax="0.15"]: the element drifts at a different speed from the page (backgrounds)
 *  - [data-scroll-words]: sets --p (0→1) as it scrolls through the screen; ScrollWords lights up word by word
 *  - html.footer-in once the footer is a quarter uncovered (its logo and columns animate in)
 * With reduced motion: no parallax, and words are fully lit.
 */
export default function ScrollFx() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const words = [...document.querySelectorAll<HTMLElement>("[data-scroll-words]")];
    let frame = 0;

    const update = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;

      for (const el of parallax) {
        if (reduceMotion.matches) {
          el.style.transform = "";
          continue;
        }
        const r = el.parentElement?.getBoundingClientRect();
        if (!r || r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax || 0.15);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
      // Footer: reveal its contents once a quarter of it has been uncovered by the page above
      // (works whether or not the curtain pins it behind the page).
      const main = document.querySelector("body > main");
      const footer = document.querySelector<HTMLElement>(".site-footer");
      if (main && footer) {
        const uncovered = vh - main.getBoundingClientRect().bottom;
        document.documentElement.classList.toggle("footer-in", uncovered > Math.min(footer.offsetHeight, vh) * 0.25);
      }
      for (const el of words) {
        const r = el.getBoundingClientRect();
        const p = reduceMotion.matches ? 1 : Math.min(Math.max((vh * 0.88 - r.top) / (vh * 0.55), 0), 1);
        el.style.setProperty("--p", p.toFixed(3));
      }
    };
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
