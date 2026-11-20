"use client";

import { useRef, useState } from "react";
import { taglineSection as copy } from "@/lib/content";

/** Homepage-only intro under the hero. Its links scroll within the homepage. */
export default function Tagline() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  return (
    <section
      className="tagline-stage relative flex min-h-[52vh] cursor-none items-center overflow-visible bg-deep px-5 py-20 text-white md:px-10 lg:px-16"
      onPointerEnter={() => setCursorVisible(true)}
      onPointerLeave={() => setCursorVisible(false)}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        if (cursorRef.current) {
          cursorRef.current.style.left = `${x}px`;
          cursorRef.current.style.top = `${y}px`;
        }
      }}
    >
      <div className="digital-grid absolute inset-0 opacity-15" />
      <div className="relative mx-auto w-full max-w-[1400px]">
        <h1 className="max-w-[1050px] text-[clamp(2.8rem,6.5vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
          <span className="block">{copy.line1}</span>
          <span className="block text-coral-soft">
            {copy.line2}
            <span className="ripple-dot">.</span>
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-white/55">{copy.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="btn-accent">
            {copy.primaryCta}
          </a>
          <a href="#services" className="btn-outline">
            {copy.secondaryCta}
          </a>
        </div>
        <a
          href="#about"
          className="mt-10 inline-flex gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-white/45"
        >
          {copy.scrollCue} <span className="animate-bounce">↓</span>
        </a>
      </div>
      <div
        ref={cursorRef}
        className={`tagline-dot-cursor ${cursorVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
    </section>
  );
}
