"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "./ui";

export default function Showreel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section
        id="work"
        className="relative overflow-visible bg-ink pb-24 pt-16 text-white lg:pb-32 lg:pt-20"
      >
        <div className="relative z-10 mx-auto mb-12 max-w-[1400px] px-5 md:px-10 lg:px-16">
          <Label light>In Motion</Label>
          <h2 className="display-title">See the work move.</h2>
          <p className="mt-8 max-w-xl border-t border-white/20 pt-5 text-sm leading-6 text-white/55">
            Strategy, content, campaigns and digital products, all in one flow. Here is Nashwave in sixty
            seconds.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play Nashwave showreel"
          className="showreel group relative z-10 block aspect-video w-full overflow-hidden text-left"
        >
          <Image
            src="/assets/nashwave-workspace.jpg"
            alt="Nashwave showreel preview"
            fill
            sizes="100vw"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-plum/90 via-ink/35 to-teal/45" />
          <span className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-[10px] font-bold uppercase tracking-[.16em] backdrop-blur md:size-32">
            Play reel
          </span>
          <div
            aria-hidden="true"
            className="kinetic-words absolute bottom-7 left-7 text-[clamp(2rem,6vw,7rem)] font-semibold leading-none tracking-[-0.06em] md:bottom-10 md:left-10 lg:left-16"
          >
            <span>Create.</span>
            <span>Connect.</span>
            <span>Convert.</span>
            <span>Grow.</span>
          </div>
        </button>
        <div className="mx-auto mt-6 flex max-w-[1400px] justify-between gap-5 px-5 md:px-10 lg:px-16">
          <p className="text-sm text-white/50">Media. Marketing. Digital. One team, one wave.</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-[10px] font-bold uppercase tracking-[.18em] text-coral-soft"
          >
            Watch full reel →
          </button>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nashwave showreel"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-deep/95 p-5"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close showreel"
            autoFocus
            className="absolute right-6 top-6 size-12 rounded-full border border-white/25 text-white"
          >
            ×
          </button>
          {/* Replace this placeholder with a <video> or YouTube/Vimeo embed when the reel is ready. */}
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden bg-ink text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/assets/nashwave-workspace.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <Image
                src="/assets/nashwave-wave-white.svg"
                unoptimized
                alt=""
                width={298}
                height={142}
                className="mb-8 h-auto w-36 opacity-60"
              />
              <p className="text-4xl font-semibold">Showreel footage coming soon.</p>
              <p className="mt-3 text-sm text-white/45">
                Replace this placeholder with the final 45–60 second production reel.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
