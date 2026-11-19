"use client";

import { useState } from "react";
import { quotes, ui } from "@/lib/content";
import { PlaceholderTag } from "./ui";

/**
 * Testimonial quote. With `single`, shows one fixed quote (no controls);
 * otherwise it's a carousel through every quote in content.ts.
 */
export default function Testimonials({
  startIndex = 0,
  single = false,
  className = "py-24 lg:py-32",
}: {
  startIndex?: number;
  single?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(startIndex % quotes.length);
  if (quotes.length === 0) return null;
  const quote = quotes[index];

  return (
    <section className={className}>
      <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-5 md:px-10 lg:grid-cols-[1fr_auto] lg:px-16">
        <figure aria-live={single ? undefined : "polite"}>
          {quote.placeholder && (
            <div className="mb-6">
              <PlaceholderTag>{ui.sampleTestimonial}</PlaceholderTag>
            </div>
          )}
          <span aria-hidden="true" className="text-7xl text-coral">
            “
          </span>
          <blockquote className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-.04em] md:text-5xl">
            {quote.text}
          </blockquote>
          <figcaption className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-plum">
            {quote.author} — <span className="text-ink/40">{quote.role}</span>
          </figcaption>
        </figure>
        {!single && quotes.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={ui.prevQuote}
              onClick={() => setIndex((index - 1 + quotes.length) % quotes.length)}
              className="round-control"
            >
              ←
            </button>
            <button
              type="button"
              aria-label={ui.nextQuote}
              onClick={() => setIndex((index + 1) % quotes.length)}
              className="round-control"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
