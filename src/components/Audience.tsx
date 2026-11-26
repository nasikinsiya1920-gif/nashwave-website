import Link from "next/link";
import { audienceSection as copy, routes } from "@/lib/content";
import Reveal from "./Reveal";
import { Label } from "./ui";

/**
 * "Who we work with": the kinds of business owners we help. The last card ("Feeling stuck?") is
 * highlighted and carries the call to action. The homepage passes "#contact"; other pages link to /contact.
 */
export default function Audience({ ctaHref = routes.contact }: { ctaHref?: string }) {
  const last = copy.items.length - 1;
  return (
    <section id="who-we-work-with" className="scroll-mt-20 bg-sand-deep px-5 py-24 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Label>{copy.label}</Label>
        </Reveal>
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <h2 className="display-title services-title">
            {copy.title.map((line, i) => (
              <Reveal key={line} as="span" variant="line" delay={i * 110}>
                {line}
              </Reveal>
            ))}
          </h2>
          <Reveal as="p" delay={260} className="max-w-sm text-base leading-7 text-ink/60 lg:pb-2">
            {copy.intro}
          </Reveal>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map(({ title, copy: text }, i) => (
            <Reveal key={title} as="li" delay={(i % 3) * 110} className="flex">
              <article className={`audience-card w-full ${i === last ? "is-highlight" : ""}`}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {i === last && (
                  <Link href={ctaHref} className="btn-attention mt-auto self-start">
                    <span>{copy.cta}</span>
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
