"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MENU_EVENT } from "@/lib/events";
import { ui } from "@/lib/content";

/**
 * The big "nashwave" wordmark in the hero that shrinks and docks into the header on scroll.
 *
 * - While large it plays the looping logo animation (public/assets/video/nashwave-logo-dark.mp4:
 *   white letters + coral wave on pure black). The whole logo uses mix-blend-mode: screen, so the
 *   black disappears on every browser, including Safari, which can't show transparent WebM video.
 * - As it docks it cross-fades to the static SVG wordmark, which stays crisp at header size.
 * - While the mobile menu is open the logo snaps to its docked spot in the header bar (and the page
 *   can't scroll), so it never travels across the open menu.
 */

// Where the finished logo sits inside the video frame, so its last frame lines up with the SVG.
// Video: 1920×364, final logo ink at x 382–1555, y 70–288. SVG: 1200×334, ink at x 17–1199, y 63–279.
const VIDEO_BOX = { width: "161.2%", left: "-30.66%", top: "-2.25%" };
// The logo's height relative to its width (SVG viewBox 1200×334).
const ASPECT = 334 / 1200;

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export default function MorphLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const menuOpen = useRef(false);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    let frame = 0;
    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const logo = ref.current;
      if (!logo) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 640;
      const headerH = 76;

      // Scroll distance over which the logo docks. It always finishes before the hero ends, so it is
      // in the header bar (not floating over the next section) on short screens like landscape phones.
      const hero = document.getElementById("top");
      const heroLimit = hero ? hero.offsetHeight * 0.8 : Infinity;
      const travel = Math.min(Math.max(h * 0.58, 260), heroLimit);
      const scrolled = Math.min(Math.max(window.scrollY / travel, 0), 1);
      const progress = menuOpen.current ? 1 : scrolled;

      // Large size: as wide as the screen allows, but never so tall (e.g. landscape phones) that it
      // reaches up under the header or down past the hero.
      const maxByWidth = Math.min(w * (isMobile ? 0.88 : 0.86), 1200);
      const maxByHeight = (h * 0.42) / ASPECT;
      const largeWidth = Math.min(maxByWidth, maxByHeight);
      const smallWidth = isMobile ? 112 : 136;
      const pageMargin = isMobile ? 20 : Math.max(20, (w - 1500) / 2 + 40);
      const centerX = w / 2;
      const centerY = Math.max(h * (isMobile ? 0.42 : 0.45), headerH + 24 + (largeWidth * ASPECT) / 2);
      const dockX = pageMargin + smallWidth / 2;
      const dockY = headerH / 2;

      logo.style.left = `${centerX + (dockX - centerX) * progress}px`;
      logo.style.top = `${centerY + (dockY - centerY) * progress}px`;
      logo.style.width = `${largeWidth + (smallWidth - largeWidth) * progress}px`;
      // 0 → video only, 1 → static wordmark only.
      logo.style.setProperty("--swap", String(smoothstep(0.45, 0.85, progress)));
      setDocked(progress > 0.015);

      // Only spend CPU on the video while it can be seen.
      if (video && !reduceMotion.matches) {
        if (progress < 0.85 && video.paused) video.play().catch(() => {});
        else if (progress >= 0.85 && !video.paused) video.pause();
      }
    };
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    const onMenu = (event: Event) => {
      menuOpen.current = (event as CustomEvent<boolean>).detail;
      schedule();
    };

    if (video) {
      if (reduceMotion.matches) video.pause();
      else video.play().catch(() => {});
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener(MENU_EVENT, onMenu);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener(MENU_EVENT, onMenu);
    };
  }, []);

  return (
    <a ref={ref} href="#top" aria-label={ui.homeLogoLabel} className={`morph-logo ${docked ? "is-docked" : ""}`}>
      <span className="morph-logo-video" style={VIDEO_BOX} aria-hidden="true">
        <video
          ref={videoRef}
          poster="/assets/video/nashwave-logo-dark-poster.webp"
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
        >
          <source src="/assets/video/nashwave-logo-dark.webm" type="video/webm" />
          <source src="/assets/video/nashwave-logo-dark.mp4" type="video/mp4" />
        </video>
      </span>
      <Image
        className="morph-logo-static"
        src="/assets/nashwave-logo-white.svg"
        alt=""
        width={1200}
        height={334}
        priority
        unoptimized
      />
    </a>
  );
}
