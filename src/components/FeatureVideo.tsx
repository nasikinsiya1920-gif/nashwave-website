"use client";

import { useEffect, useRef, useState } from "react";
import { featureVideo as copy } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Homepage video right after "Turn the Tide": loops silently, pops up subtly as it scrolls in.
 * With a mouse, the cursor over the video becomes a pill reading "Play sound" / "Sound off";
 * clicking toggles the sound. Touch and keyboard users get the same control as a corner button.
 * It only plays while on screen. With reduced motion it doesn't autoplay ("Play video" starts it).
 * Hidden until a video file is set in `featureVideo` (content.ts).
 */
export default function FeatureVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        // In view: play (with reduced motion, only once the visitor has started it). Out of view: pause.
        if (!entry.isIntersecting) video.pause();
        else if (!reduceMotion.matches || video.dataset.started) video.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (!copy.webm && !copy.mp4) return null;

  const label = !playing ? copy.playVideo : muted ? copy.playSound : copy.soundOff;

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.dataset.started = "1";
    if (video.paused) {
      video.muted = false;
      setMuted(false);
      video.play().catch(() => {});
      return;
    }
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section aria-label={copy.label} className="bg-deep px-5 pb-20 pt-4 md:px-10 lg:px-16 lg:pb-28">
      <Reveal variant="pop" className="mx-auto max-w-[1400px]">
        <div
          className={`feature-video ${hover ? "is-hovering" : ""}`}
          onClick={toggle}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          onPointerMove={(e) => {
            const cursor = cursorRef.current;
            if (!cursor) return;
            const box = e.currentTarget.getBoundingClientRect();
            cursor.style.left = `${e.clientX - box.left}px`;
            cursor.style.top = `${e.clientY - box.top}px`;
          }}
        >
          <video
            ref={videoRef}
            poster={copy.poster || undefined}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {copy.webm && <source src={copy.webm} type="video/webm" />}
            {copy.mp4 && <source src={copy.mp4} type="video/mp4" />}
          </video>
          <span ref={cursorRef} className="feature-video-cursor" aria-hidden="true">
            {label}
          </span>
          <button
            type="button"
            className="feature-video-btn"
            aria-pressed={playing && !muted}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            {label}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
