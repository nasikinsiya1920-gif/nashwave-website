import Image from "next/image";
import { Label, LinkArrow } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand-deep">
      <Image
        src="/assets/nashwave-white-wave-floor.png"
        alt="Layered white floor with a flowing wave texture"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,234,.98)_0%,rgba(247,242,234,.92)_35%,rgba(247,242,234,.2)_72%,rgba(247,242,234,.05)_100%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 lg:px-16 lg:py-24">
        <Label>Meet Nashwave</Label>
        <h2 className="display-title max-w-4xl">
          When the market shifts,
          <br />
          we see a <em>wave.</em>
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="max-w-lg text-base leading-7 text-ink/65">
            <p>
              Markets shift. We turn those shifts into sharper stories, stronger digital experiences and
              momentum that moves brands forward.
            </p>
            <div className="pt-4">
              <LinkArrow href="#approach">Discover our approach</LinkArrow>
            </div>
          </div>
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
          <span className="flex size-12 items-center justify-center rounded-full border border-coral-soft/60 text-[10px] font-bold uppercase tracking-[0.15em] text-coral-soft">
            POV
          </span>
          <p className="max-w-5xl text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
            Challenges are just currents.{" "}
            <span className="text-coral-soft">The right strategy turns them into movement.</span>
          </p>
        </div>
      </blockquote>
    </section>
  );
}
