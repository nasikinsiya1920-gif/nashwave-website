import { clients, clientsArePlaceholder, clientsSection as copy, ui } from "@/lib/content";
import { Label, PlaceholderTag } from "./ui";

/** "Trusted by" heading plus the scrolling client-name strip. */
export default function ClientLogos() {
  if (clients.length === 0) return null;
  return (
    <section className="border-t border-plum/15 pt-24 lg:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16">
        <Label>{copy.label}</Label>
        <h2 className="display-title max-w-4xl">{copy.title}</h2>
        {clientsArePlaceholder && (
          <div className="mt-6">
            <PlaceholderTag>{ui.sampleClients}</PlaceholderTag>
          </div>
        )}
      </div>
      <div className="logo-marquee mt-16 overflow-hidden border-y border-plum/15 bg-white py-8">
        <div className="marquee-track flex w-max gap-20 px-10">
          {[0, 1].flatMap((r) =>
            clients.map((logo, i) => (
              <span
                key={`${r}-${i}`}
                aria-hidden={r === 1}
                className="text-2xl font-bold text-ink/28 hover:text-plum"
              >
                {logo}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
