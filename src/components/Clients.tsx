"use client";

import { useState } from "react";
import { clients, quotes } from "@/lib/content";
import { Label } from "./ui";

export default function Clients() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  return (
    <section className="border-y border-plum/15 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16">
        <Label>Trusted By</Label>
        <h2 className="display-title max-w-4xl">Brands that chose to move with us.</h2>
      </div>
      <div className="logo-marquee mt-16 overflow-hidden border-y border-plum/15 bg-white py-8">
        <div className="marquee-track flex w-max gap-20 px-10">
          {[0, 1].flatMap((r) =>
            clients.map((logo, i) => (
              <span
                key={`${r}-${i}`}
                aria-hidden={r === 1}
                className="text-2xl font-bold text-ink/28 hover:text-plum"
              >
                {logo}
              </span>
            )),
          )}
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1400px] items-end gap-10 px-5 md:px-10 lg:grid-cols-[1fr_auto] lg:px-16">
        <figure aria-live="polite">
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
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous quote"
            onClick={() => setIndex((index - 1 + quotes.length) % quotes.length)}
            className="round-control"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next quote"
            onClick={() => setIndex((index + 1) % quotes.length)}
            className="round-control"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
