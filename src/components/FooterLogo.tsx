"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { routes, ui } from "@/lib/content";

/**
 * The big looping logo at the top of the footer, plus the footer's "curtain" reveal switch.
 *
 * Video: plum letters + coral wave on pure white (public/assets/video/nashwave-logo-light.*), shown with
 * mix-blend-mode: multiply so the white disappears into the footer's sand background on every browser.
 * It only plays while on screen; with reduced motion it shows the finished logo (poster) instead.
 *
 * Curtain: when the whole footer fits on screen, <html> gets the "footer-curtain" class and the CSS pins
 * the footer behind the page, so the last section lifts away to reveal it. A footer taller than the
 * screen (phones) just scrolls normally.
 */
export default function FooterLogo() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const footer = linkRef.current?.closest("footer");
    const video = videoRef.current;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const fit = () => {
      // Must fit below the fixed 76px header, with a little breathing room.
      if (footer) root.classList.toggle("footer-curtain", footer.offsetHeight <= window.innerHeight - 76 - 16);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (footer) ro.observe(footer);
    window.addEventListener("resize", fit);

    const io = new IntersectionObserver(([entry]) => {
      if (!video) return;
      if (entry.isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
      else video.pause();
    });
    if (video) io.observe(video);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", fit);
      root.classList.remove("footer-curtain");
    };
  }, []);

  return (
    <Link ref={linkRef} href={routes.home} aria-label={ui.homeLogoLabel} className="footer-logo">
      <video
        ref={videoRef}
        poster="/assets/video/nashwave-logo-light-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src="/assets/video/nashwave-logo-light.webm" type="video/webm" />
        <source src="/assets/video/nashwave-logo-light.mp4" type="video/mp4" />
      </video>
    </Link>
  );
}
