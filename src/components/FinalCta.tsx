import Image from "next/image";
import { site } from "@/lib/content";
import { Label } from "./ui";

export default function FinalCta() {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-deep px-5 py-24 text-center text-white">
      <Image src="/assets/nashwave-ocean.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-[#0A3842]/60 to-plum/70" />
      <div className="relative max-w-5xl">
        <div className="flex justify-center">
          <Label light>One last thing</Label>
        </div>
        <h2 className="display-title">
          The tide is turning.
          <br />
          <span className="text-coral-soft">Be ready to move.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-white/60">
          Whether you are facing a challenge or chasing an opportunity, let&apos;s start the conversation.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a href="#contact" className="btn-accent">
            Start a Project
          </a>
          <a href={`mailto:${site.email}`} className="text-xs text-white/70">
            Or write to us at {site.email}
          </a>
        </div>
        <p className="mt-20 text-[10px] font-bold uppercase tracking-[.25em] text-white/35">{site.tagline}</p>
      </div>
    </section>
  );
}
