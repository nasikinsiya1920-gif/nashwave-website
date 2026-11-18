import { services } from "@/lib/content";
import { Label, LinkArrow } from "./ui";

export default function Services() {
  return (
    <section id="services" className="px-5 py-24 md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Label>Our Services</Label>
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <h2 className="display-title">Everything a brand needs to move.</h2>
          <p className="max-w-lg self-end text-base leading-7 text-ink/58">
            Six connected capabilities, built to work alone or as one integrated engine.
          </p>
        </div>
        <div className="grid border-l border-t border-plum/15 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ number, title, copy }) => (
            <article key={title} className="service-card group">
              <span className="text-[10px] font-bold tracking-[.2em] text-coral">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#contact">Learn more →</a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <LinkArrow href="#contact">Explore all services</LinkArrow>
        </div>
      </div>
    </section>
  );
}
