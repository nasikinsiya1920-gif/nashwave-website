import Image from "next/image";
import type { Service } from "@/lib/content";
import { Breadcrumbs, PAGE_TOP } from "./ui";
import Reveal from "./Reveal";

/** Dark opening section of a service detail page: breadcrumbs, number, title and description. */
export default function ServiceHero({ service }: { service: Service }) {
  return (
    <section
      className={`relative overflow-hidden bg-deep px-5 pb-24 text-white md:px-10 lg:px-16 lg:pb-32 ${PAGE_TOP}`}
    >
      <Image src="/assets/nashwave-ocean.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,17,27,.96)_8%,rgba(5,42,52,.72)_56%,rgba(32,0,42,.6))]" />
      <div className="digital-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1400px]">
        <Breadcrumbs current={service.title} />
        <Reveal as="span" className="mt-16 block text-sm font-bold tracking-[.2em] text-coral">
          {service.number}
        </Reveal>
        <h1 className="display-title mt-6 max-w-5xl">
          <Reveal as="span" variant="line" delay={80}>
            {service.title}
          </Reveal>
        </h1>
        <Reveal
          as="p"
          delay={220}
          className="mt-10 max-w-2xl border-t border-white/20 pt-6 text-lg leading-8 text-white/70"
        >
          {service.copy}
        </Reveal>
      </div>
    </section>
  );
}
