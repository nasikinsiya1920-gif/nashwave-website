import Image from "next/image";
import { aboutSection as copy, routes } from "@/lib/content";
import { Label, LinkArrow, PAGE_TOP, Title } from "./ui";
import Reveal from "./Reveal";

/** "Meet Nashwave" intro plus the POV quote. `asPage` makes it the opening section of /about. */
export default function About({ asPage = false }: { asPage?: boolean }) {
  return (
    <section id="about" className="relative overflow-hidden bg-sand-deep">
      <Image
        src="/assets/nashwave-white-wave-floor.png"
        alt={copy.imageAlt}
        fill
        priority={asPage}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,234,.98)_0%,rgba(247,242,234,.92)_35%,rgba(247,242,234,.2)_72%,rgba(247,242,234,.05)_100%)]" />
      <div
        className={`relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 lg:px-16 lg:py-24 ${asPage ? PAGE_TOP : ""}`}
      >
        <Reveal>
          <Label>{copy.label}</Label>
        </Reveal>
        <Title asPage={asPage} className="display-title max-w-4xl">
          <Reveal as="span" variant="line">
            {copy.titleLine1}
          </Reveal>
          <Reveal as="span" variant="line" delay={110}>
            {copy.titleLine2}
            <em>{copy.titleEmphasis}</em>
          </Reveal>
        </Title>

        <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal delay={220} className="max-w-lg text-base leading-7 text-ink/65">
            <p>{copy.intro}</p>
            <div className="pt-4">
              <LinkArrow href={asPage ? "#approach" : routes.approach}>{copy.approachLink}</LinkArrow>
            </div>
          </Reveal>
        </div>
      </div>
      <blockquote className="relative w-full overflow-hidden bg-plum px-5 py-10 text-white shadow-[0_30px_80px_rgba(45,24,37,.18)] md:px-10 md:py-12 lg:px-16 lg:py-16">
        <span
          aria-hidden="true"
          className="absolute -right-5 -top-24 font-display text-[16rem] font-extrabold leading-none text-white/[0.06]"
        >
          ~
        </span>
        <div className="relative mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <span className="flex h-12 w-fit min-w-12 items-center justify-center self-start whitespace-nowrap rounded-full border border-coral-soft/60 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-coral-soft">
            {copy.povTag}
          </span>
          <Reveal
            as="p"
            delay={120}
            className="max-w-5xl text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
          >
            {copy.povLead} <span className="text-coral-soft">{copy.povAccent}</span>
          </Reveal>
        </div>
      </blockquote>
    </section>
  );
}
