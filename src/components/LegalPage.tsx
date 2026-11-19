import { legal } from "@/lib/content";
import { Label, PAGE_TOP } from "./ui";

/*
 * ⚠️ LEGAL REVIEW REQUIRED ⚠️
 * Template used by /privacy and /terms. The wording in content.ts (privacyPage, termsPage, legal)
 * is a generic draft and must be reviewed by a qualified lawyer before the site goes live.
 */
export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <main className="bg-sand text-ink">
      <section className={`px-5 pb-24 md:px-10 lg:px-16 lg:pb-36 ${PAGE_TOP}`}>
        <div className="mx-auto max-w-3xl">
          <Label>{legal.label}</Label>
          <h1 className="display-title">{title}</h1>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-plum/65">
            {legal.effectiveLabel}: {legal.effectiveDate}
          </p>
          <p
            role="note"
            className="mt-6 rounded-2xl border border-dashed border-coral/60 bg-coral/10 px-5 py-4 text-sm font-semibold text-ink/75"
          >
            {legal.reviewNote}
          </p>
          <div className="legal-prose mt-10">
            <p>{intro}</p>
            {sections.map(({ heading, body }) => (
              <div key={heading}>
                <h2>{heading}</h2>
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
