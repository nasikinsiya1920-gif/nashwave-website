import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Label, PAGE_TOP } from "@/components/ui";
import { notFoundPage as copy, pageMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: pageMeta.notFound.title,
  description: pageMeta.notFound.description,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      className={`relative flex min-h-[80vh] items-center overflow-hidden bg-deep px-5 pb-24 text-white md:px-10 lg:px-16 ${PAGE_TOP}`}
    >
      <Image src="/assets/nashwave-ocean.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-[#0A3842]/60 to-plum/70" />
      <div className="digital-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto w-full max-w-[1400px]">
        <Label light>{copy.label}</Label>
        <h1 className="display-title max-w-4xl">{copy.title}</h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-white/60">{copy.copy}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {copy.links.map(({ name, href }, i) => (
            <Link key={href} href={href} className={i === 0 ? "btn-accent" : "btn-outline"}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
