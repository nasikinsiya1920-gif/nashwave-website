"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { approachSection as copy, routes, steps } from "@/lib/content";
import Reveal from "./Reveal";
import { Label } from "./ui";

/**
 * "How We Work" — the 5 approach steps as a loose, hand-drawn-looking flow chart.
 * Desktop (≥1024px with a mouse): scattered, tilted cards joined by connector lines.
 * Touch / narrower screens: a stacked list with one vertical line through the number badges.
 * The DOM is always an ordered list in step order; positioning is purely visual.
 * Always carries id="approach" (linked from /about#approach).
 */

// Desktop card positions (percent of the board) and tilt. Layout only — copy lives in content.ts.
const LAYOUT = [
  { x: 3, y: 3, r: -6 },
  { x: 58, y: 9, r: -4 },
  { x: 26, y: 37, r: 5 },
  { x: 2, y: 70, r: -5 },
  { x: 62, y: 62, r: -4 },
];

const LIFT = 6; // px a card rises when active (matches the CSS)

type Segment = { x1: number; y1: number; x2: number; y2: number };

/** Point where a ray from the card's centre towards (tx, ty) leaves the card's (rotated) border. */
function edgePoint(card: HTMLElement, r: number, lift: number, tx: number, ty: number) {
  const hw = card.offsetWidth / 2;
  const hh = card.offsetHeight / 2;
  const cx = card.offsetLeft + hw;
  const cy = card.offsetTop + hh - lift;
  const dx = tx - cx;
  const dy = ty - cy;
  const a = (-r * Math.PI) / 180;
  const lx = dx * Math.cos(a) - dy * Math.sin(a);
  const ly = dx * Math.sin(a) + dy * Math.cos(a);
  const t = Math.min(lx ? hw / Math.abs(lx) : Infinity, ly ? hh / Math.abs(ly) : Infinity);
  return { x: cx + dx * t, y: cy + dy * t };
}

export default function Approach({ ctaHref = routes.contact }: { ctaHref?: string }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [segments, setSegments] = useState<Segment[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [entering, setEntering] = useState(false);

  const measure = useCallback(() => {
    const board = boardRef.current;
    const cards = cardRefs.current;
    if (!board || cards.some((c) => !c)) return;
    setSize({ w: board.offsetWidth, h: board.offsetHeight });
    const geo = cards.map((card, i) => {
      const el = card as HTMLLIElement;
      const isActive = i === active;
      return {
        el,
        r: isActive ? 0 : LAYOUT[i].r,
        lift: isActive ? LIFT : 0,
        cx: el.offsetLeft + el.offsetWidth / 2,
        cy: el.offsetTop + el.offsetHeight / 2 - (isActive ? LIFT : 0),
      };
    });
    setSegments(
      geo.slice(0, -1).map((from, i) => {
        const to = geo[i + 1];
        const a = edgePoint(from.el, from.r, from.lift, to.cx, to.cy);
        const b = edgePoint(to.el, to.r, to.lift, from.cx, from.cy);
        return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
      }),
    );
  }, [active]);

  // Keep the connector lines attached when the board or any card changes size.
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (boardRef.current) ro.observe(boardRef.current);
    cardRefs.current.forEach((c) => c && ro.observe(c));
    return () => ro.disconnect();
  }, [measure]);

  // Drop the cards in (and draw the lines) the first time the board scrolls into view.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntering(true);
        setVisible(true);
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(board);
    return () => io.disconnect();
  }, []);

  // Stagger delays only apply while entering, so later hover transitions stay instant.
  useEffect(() => {
    if (!entering) return;
    const t = window.setTimeout(() => setEntering(false), steps.length * 160 + 1400);
    return () => window.clearTimeout(t);
  }, [entering]);

  const year = new Date().getFullYear();

  return (
    <section id="approach" className="process-section scroll-mt-20 bg-sand px-5 py-24 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div aria-hidden="true" className="process-micro mb-14 flex justify-between">
          <span>{copy.cornerTop}</span>
          <span suppressHydrationWarning>©{year}</span>
        </div>

        <Reveal>
          <Label>{copy.label}</Label>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <h2 className="display-title">
            <Reveal as="span" variant="line">
              {copy.title}
            </Reveal>
          </h2>
          <Reveal as="p" delay={200} className="max-w-sm text-base leading-7 text-ink/58 lg:pb-2">
            {copy.intro}
          </Reveal>
        </div>

        <div
          ref={boardRef}
          className={`process-board ${visible ? "is-visible" : ""} ${entering ? "is-entering" : ""} ${
            active !== null ? "has-active" : ""
          }`}
        >
          <svg
            className="process-lines"
            aria-hidden="true"
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            preserveAspectRatio="none"
          >
            {segments.map((s, i) => (
              <path
                key={i}
                d={`M${s.x1} ${s.y1}L${s.x2} ${s.y2}`}
                pathLength={1}
                className={`process-line ${active === i || active === i + 1 ? "is-active" : ""}`}
                style={{ "--d": `${(i + 1) * 160 + 450}ms` } as React.CSSProperties}
              />
            ))}
          </svg>

          <ol className="process-steps">
            {steps.map(({ title, eyebrow, copy: text }, i) => (
              <li
                key={title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                tabIndex={0}
                className={`process-card ${active === i ? "is-active" : ""}`}
                style={
                  {
                    "--x": `${LAYOUT[i].x}%`,
                    "--y": `${LAYOUT[i].y}%`,
                    "--r": `${LAYOUT[i].r}deg`,
                    "--i": i,
                  } as React.CSSProperties
                }
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              >
                <span className="process-badge" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="process-eyebrow">{eyebrow}</span>
                <h3 className="process-step-title">{title}</h3>
                <div className="process-desc">
                  <div>
                    <p>{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
          <span aria-hidden="true" className="process-micro">
            {copy.cornerBottom}
          </span>
          <Link href={ctaHref} className="btn-attention">
            <span>{copy.cta}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
