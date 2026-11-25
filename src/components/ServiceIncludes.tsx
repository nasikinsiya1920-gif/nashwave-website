import { serviceDetail as copy } from "@/lib/content";
import { Label } from "./ui";
import Reveal from "./Reveal";

/** "What's included" list on a service detail page, built from the service's `includes` in content.ts. */
export default function ServiceIncludes({ items }: { items: string[] }) {
  return (
    <section className="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <Reveal>
            <Label>{copy.includesLabel}</Label>
          </Reveal>
          <h2 className="display-title">
            <Reveal as="span" variant="line">
              {copy.includesTitle}
            </Reveal>
          </h2>
        </div>
        <ul className="self-end border-t border-plum/15">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 80}
              className="group flex items-baseline gap-6 border-b border-plum/15 py-6 transition-colors hover:text-plum"
            >
              <span className="w-8 shrink-0 text-[10px] font-bold tracking-[.2em] text-coral">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-semibold tracking-[-.03em] transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                {item}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
