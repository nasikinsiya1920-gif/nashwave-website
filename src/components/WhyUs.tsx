import { reasons } from "@/lib/content";
import { KineticIcon, Label } from "./ui";

export default function WhyUs() {
  return (
    <section className="bg-plum px-5 py-24 text-white md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Label light>Why Us</Label>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <h2 className="display-title">
            Creative that thinks like a business.{" "}
            <span className="text-coral-soft">Technology that thinks like a creative.</span>
          </h2>
          <p className="max-w-md self-end text-lg leading-8 text-white/65">
            We believe marketing should do more than look good. It should move something: an audience, a
            number, a decision.
          </p>
        </div>
        <div className="mt-20 grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ title, copy }, index) => (
            <article key={title} className="usp-card min-h-72 bg-plum p-8">
              <KineticIcon type={index} />
              <h3 className="mb-3 text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-white/55">{copy}</p>
            </article>
          ))}
        </div>
        <p className="mt-12 text-2xl font-semibold">
          We work as an extension of your team: close, curious and accountable to results.
        </p>
      </div>
    </section>
  );
}
