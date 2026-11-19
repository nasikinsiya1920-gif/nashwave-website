"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { showreelSection as copy, site } from "@/lib/content";
import { Label, PAGE_TOP, Title } from "./ui";

/** Turns a YouTube / Vimeo link into an embeddable player URL; anything else is treated as a video file. */
function toEmbed(url: string): { kind: "iframe" | "video"; src: string } {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  return { kind: "video", src: url };
}

export default function Showreel({ asPage = false }: { asPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const reel = site.showreelUrl ? toEmbed(site.showreelUrl) : null;

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
        className={`relative overflow-visible bg-ink pb-24 pt-16 text-white lg:pb-32 lg:pt-20 ${asPage ? PAGE_TOP : ""}`}
      >
        <div className="relative z-10 mx-auto mb-12 max-w-[1400px] px-5 md:px-10 lg:px-16">
          <Label light>{copy.label}</Label>
          <Title asPage={asPage}>{copy.title}</Title>
          <p className="mt-8 max-w-xl border-t border-white/20 pt-5 text-sm leading-6 text-white/55">
            {copy.intro}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={copy.playLabel}
          className="showreel group relative z-10 block aspect-video w-full overflow-hidden text-left"
        >
          <Image
            src="/assets/nashwave-workspace.jpg"
            alt={copy.previewAlt}
            fill
            priority={asPage}
            sizes="100vw"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-plum/90 via-ink/35 to-teal/45" />
          <span className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-[10px] font-bold uppercase tracking-[.16em] backdrop-blur md:size-32">
            {copy.playButton}
          </span>
          <div
            aria-hidden="true"
            className="kinetic-words absolute bottom-7 left-7 text-[clamp(2rem,6vw,7rem)] font-semibold leading-none tracking-[-0.06em] md:bottom-10 md:left-10 lg:left-16"
          >
            {copy.kineticWords.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </button>
        <div className="mx-auto mt-6 flex max-w-[1400px] justify-between gap-5 px-5 md:px-10 lg:px-16">
          <p className="text-sm text-white/50">{copy.footerLine}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-[10px] font-bold uppercase tracking-[.18em] text-coral-soft"
          >
            {copy.watchFull}
          </button>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialogLabel}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-deep/95 p-5"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={copy.close}
            autoFocus
            className="absolute right-6 top-6 size-12 rounded-full border border-white/25 text-white"
          >
            ×
          </button>
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden bg-ink text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {reel?.kind === "iframe" && (
              <iframe
                src={reel.src}
                title={copy.dialogLabel}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            )}
            {reel?.kind === "video" && (
              <video src={reel.src} controls autoPlay playsInline className="absolute inset-0 size-full bg-black" />
            )}
            {!reel && (
              <>
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
                  <p className="text-4xl font-semibold">{copy.comingSoonTitle}</p>
                  <p className="mt-3 text-sm text-white/45">{copy.comingSoonNote}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
