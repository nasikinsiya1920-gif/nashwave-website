import { reasons, whyUsSection as copy } from "@/lib/content";
import { KineticIcon, Label } from "./ui";
import Reveal from "./Reveal";

/** "Why Nashwave" cards. Homepage and service pages show 3; /about shows all 6. */
export default function WhyUs({
  count = 3,
  showIntro = true,
  showExtension = true,
}: {
  count?: number;
  showIntro?: boolean;
  showExtension?: boolean;
}) {
  return (
    <section className="bg-plum px-5 py-24 text-white md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Label light>{copy.label}</Label>
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal as="div" delay={80}>
            <h2 className="display-title">
              {copy.titleLead} <span className="text-coral-soft">{copy.titleAccent}</span>
            </h2>
          </Reveal>
          {showIntro && (
            <Reveal as="p" delay={220} className="max-w-md self-end text-lg leading-8 text-white/65">
              {copy.intro}
            </Reveal>
          )}
        </div>
        <div className="mt-20 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
          {reasons.slice(0, count).map(({ title, copy: text }, index) => (
            <Reveal key={title} delay={(index % 3) * 110} className="flex bg-plum">
              <article className="usp-card min-h-72 w-full bg-plum p-8">
                <KineticIcon type={index} />
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-white/60">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {showExtension && (
          <Reveal as="p" className="mt-12 max-w-4xl text-2xl font-semibold">
            {copy.extension}
          </Reveal>
        )}
      </div>
    </section>
  );
}
