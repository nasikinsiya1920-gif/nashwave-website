"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { heroSection } from "@/lib/content";

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  return (
    <section
      id="top"
      className="hero-logo-stage relative flex min-h-[78vh] cursor-none items-center overflow-hidden px-5 pb-16 pt-32 text-white md:px-10 lg:px-16"
      onPointerEnter={() => setCursorVisible(true)}
      onPointerLeave={() => setCursorVisible(false)}
      onPointerMove={(event) => {
        const cursor = cursorRef.current;
        if (!cursor) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        cursor.style.left = `${event.clientX - bounds.left}px`;
        cursor.style.top = `${event.clientY - bounds.top}px`;
      }}
    >
      <div data-parallax="0.25" className="parallax-layer">
        <Image
          src="/assets/nashwave-ocean.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,17,27,.96)_8%,rgba(5,42,52,.72)_56%,rgba(32,0,42,.6))]" />
      <div className="digital-grid absolute inset-0 opacity-25" />
      <p className="absolute left-5 top-28 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50 md:left-10 lg:left-16">
        {heroSection.eyebrow}
      </p>
      <div ref={cursorRef} className={`hero-cursor ${cursorVisible ? "is-visible" : ""}`} aria-hidden="true">
        <div>
          {heroSection.cursorWords.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
