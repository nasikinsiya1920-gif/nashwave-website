"use client";

import { useEffect, useRef, useState } from "react";

/** The big "nashwave" wordmark in the hero that shrinks and docks into the header on scroll. */
function AnimatedHeroLogo() {
  return (
    <svg className="animated-hero-logo" viewBox="0 0 1200 334" role="img" aria-label="Nashwave">
      <text className="frame22-ave" x="781.65" y="251">
        ave
      </text>
      <image href="/assets/nashwave-wave-mark.svg" x="528.44" y="99.08" width="381.025" height="180.908" />
      <image href="/assets/nashwave-dot.svg" x="1166.97" y="220.18" width="33.028" height="33.028" />
      <text className="frame22-nash" x="0" y="251">
        nash
      </text>
    </svg>
  );
}

export default function MorphLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const logo = ref.current;
      if (!logo) return;
      const w = window.innerWidth;
      const isMobile = w < 640;

      const travel = Math.max(window.innerHeight * 0.58, 420);
      const progress = Math.min(Math.max(window.scrollY / travel, 0), 1);
      const largeWidth = Math.min(w * (isMobile ? 0.92 : 0.88), 1200);
      const smallWidth = isMobile ? 112 : 136;
      const pageMargin = isMobile ? 20 : Math.max(20, (w - 1500) / 2 + 40);
      const centerX = w / 2;
      const centerY = window.innerHeight * (isMobile ? 0.4 : 0.43);
      const dockX = pageMargin + smallWidth / 2;
      const dockY = 38;

      logo.style.left = `${centerX + (dockX - centerX) * progress}px`;
      logo.style.top = `${centerY + (dockY - centerY) * progress}px`;
      logo.style.width = `${largeWidth + (smallWidth - largeWidth) * progress}px`;
      setDocked(progress > 0.015);
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
  }, []);

  return (
    <a ref={ref} href="#top" aria-label="Nashwave home" className={`morph-logo ${docked ? "is-docked" : ""}`}>
      <AnimatedHeroLogo />
    </a>
  );
}
