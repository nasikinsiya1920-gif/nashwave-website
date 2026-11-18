import { steps } from "@/lib/content";
import { Label } from "./ui";

export default function Approach() {
  return (
    <section id="approach" className="bg-white px-5 py-24 md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Label>How We Work</Label>
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <h2 className="display-title">From first conversation to lasting momentum.</h2>
          <p className="max-w-lg self-end text-base leading-7 text-ink/58">
            Five steps that turn a challenge into a campaign, and a campaign into growth.
          </p>
        </div>
        <div className="approach-line grid lg:grid-cols-5">
          {steps.map(({ title, copy }, index) => (
            <article
              key={title}
              className="relative border-b border-plum/15 py-8 lg:border-b-0 lg:border-r lg:px-7 first:lg:pl-0 last:lg:border-r-0"
            >
              <span className="approach-node mb-9 flex size-12 items-center justify-center rounded-full bg-sand text-xs font-bold text-plum ring-1 ring-plum/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < steps.length - 1 && (
                <span className="approach-arrow" aria-hidden="true">
                  →
                </span>
              )}
              <h3 className="mb-4 text-2xl font-semibold">{title}.</h3>
              <p className="text-sm leading-6 text-ink/55">{copy}</p>
            </article>
          ))}
        </div>
        <a
          href="#contact"
          className="mt-14 inline-flex rounded-full bg-plum px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-white"
        >
          Start with a conversation
        </a>
      </div>
    </section>
  );
}
