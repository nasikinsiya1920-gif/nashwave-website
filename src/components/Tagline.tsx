"use client";

import { useEffect, useRef, useState } from "react";
import { taglineSection as copy } from "@/lib/content";

/**
 * Homepage-only intro under the hero: a pinned scroll scene.
 *  1. "Turn the Tide." | "Move the Business." sit centred, parted in the middle of the screen
 *     (one line on wide screens, two stacked lines on phones/tablets).
 *  2. Scrolling down slides the phrases out — left and right — and off the screen.
 *  3. Scrolling further brings the description and buttons up into the centre.
 * Scrolling back up plays it in reverse. JS only writes two CSS variables (--part, --reveal, 0→1);
 * all movement lives in globals.css. With reduced motion the section is static and fully visible.
 */
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const ease = (t: number) => t * t * (3 - 2 * t);

export default function Tagline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (reduceMotion.matches) {
        section.style.setProperty("--part", "0");
        section.style.setProperty("--reveal", "1");
        setRevealed(true);
        return;
      }
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight; // how far the pinned scene scrolls
      const p = range > 0 ? clamp01(-rect.top / range) : 0;
      const part = ease(clamp01((p - 0.05) / 0.45)); // phrases part during 5%–50%
      const reveal = ease(clamp01((p - 0.42) / 0.33)); // description arrives during 42%–75%
      section.style.setProperty("--part", part.toFixed(4));
      section.style.setProperty("--reveal", reveal.toFixed(4));
      setRevealed(reveal > 0.5);
    };
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduceMotion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduceMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="tagline-stage relative bg-deep text-white"
      onPointerEnter={() => setCursorVisible(true)}
      onPointerLeave={() => setCursorVisible(false)}
      onPointerMove={(event) => {
        const cursor = cursorRef.current;
        if (!cursor) return;
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      }}
    >
      <div className="tagline-pin">
        <div className="digital-grid absolute inset-0 opacity-15" />

        <h1 className="tagline-split">
          <span className="tagline-half tagline-half--left">{copy.line1}</span>
          <span className="tagline-half tagline-half--right text-coral-soft">
            {copy.line2}
            <span className="ripple-dot">.</span>
          </span>
        </h1>

        <a href="#about" className="tagline-cue" aria-hidden={revealed} tabIndex={revealed ? -1 : undefined}>
          {copy.scrollCue} <span className="animate-bounce">↓</span>
        </a>

        <div className={`tagline-reveal ${revealed ? "is-revealed" : ""}`}>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">{copy.intro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn-accent">
              {copy.primaryCta}
            </a>
            <a href="#services" className="btn-outline">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      <div ref={cursorRef} className={`tagline-dot-cursor ${cursorVisible ? "is-visible" : ""}`} aria-hidden="true" />
    </section>
  );
}
