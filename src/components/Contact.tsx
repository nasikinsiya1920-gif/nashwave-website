"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { contactSection as copy, getService, services, site } from "@/lib/content";
import DirectContacts from "./DirectContacts";
import { Label, PAGE_TOP, SocialLinks, Title } from "./ui";

/**
 * Contact form powered by Netlify Forms.
 * Netlify detects the form from /public/__forms.html at build time;
 * submissions appear in Netlify → your site → Forms.
 * Keep the field names (name, email, company, service, message) in sync with that file.
 * Several services can be chosen; they are sent as one comma-separated `service` field.
 *
 * `serviceSlugs` pre-selects services (used by /contact?service=<slug> or ?service=<slug>,<slug>).
 */
export default function Contact({
  asPage = false,
  serviceSlugs = [],
}: {
  asPage?: boolean;
  serviceSlugs?: string[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selected, setSelected] = useState<string[]>(() =>
    serviceSlugs.map((slug) => getService(slug)?.title).filter((t): t is string => Boolean(t)),
  );
  const options = [...services.map((s) => s.title), copy.fields.serviceUnsure];
  const available = options.filter((o) => !selected.includes(o));
  const add = (title: string) => title && setSelected((cur) => (cur.includes(title) ? cur : [...cur, title]));
  const remove = (title: string) => setSelected((cur) => cur.filter((t) => t !== title));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData(event.currentTarget);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className={`scroll-mt-20 bg-ink px-5 py-24 text-white md:px-10 lg:px-16 lg:py-36 ${asPage ? PAGE_TOP : ""}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <Label light>{copy.label}</Label>
        <div className="grid gap-16 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <Title asPage={asPage}>
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
            </Title>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/55">{copy.intro}</p>
            {status === "sent" ? (
              <div role="status" className="mt-14 border border-coral/40 bg-coral/10 p-8">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-coral-soft">
                  {copy.sentTag}
                </span>
                <p className="mt-4 text-2xl font-semibold">{copy.sentTitle}</p>
                <p className="mt-2 text-sm text-white/55">{copy.sentCopy}</p>
              </div>
            ) : (
              <form name="contact" onSubmit={submit} className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2">
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    {copy.honeypot} <input name="bot-field" />
                  </label>
                </p>
                <label className="field">
                  <span>{copy.fields.name}</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label className="field">
                  <span>{copy.fields.email}</span>
                  <input name="email" required type="email" autoComplete="email" />
                </label>
                <label className="field">
                  <span>{copy.fields.company}</span>
                  <input name="company" required autoComplete="organization" />
                </label>
                <div className="field">
                  <label htmlFor="service-picker">
                    <span>{copy.fields.service}</span>
                  </label>
                  {/* The picker has no name: the chosen services are submitted via the hidden input.
                      It is `required` only while nothing is chosen, so the browser blocks an empty submit. */}
                  <select
                    id="service-picker"
                    value=""
                    required={selected.length === 0}
                    disabled={available.length === 0}
                    onChange={(e) => add(e.target.value)}
                  >
                    <option value="" disabled>
                      {selected.length ? copy.fields.serviceAddAnother : copy.fields.servicePlaceholder}
                    </option>
                    {available.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  <input type="hidden" name="service" value={selected.join(", ")} />
                </div>
                {selected.length > 0 && (
                  <ul aria-label={copy.fields.serviceSelectedLabel} className="flex flex-wrap gap-2 md:col-span-2">
                    {selected.map((title) => (
                      <li key={title} className="service-chip">
                        {title}
                        <button
                          type="button"
                          onClick={() => remove(title)}
                          aria-label={`${copy.fields.serviceRemove} ${title}`}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <label className="field md:col-span-2">
                  <span>{copy.fields.message}</span>
                  <textarea name="message" required rows={4} />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-accent justify-self-start md:col-span-2"
                >
                  {status === "sending" ? copy.sending : copy.submit}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-coral-soft md:col-span-2">
                    {copy.error} {site.email}.
                  </p>
                )}
              </form>
            )}
          </div>
          <aside className="border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12">
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">
              {copy.asideTitle}
            </span>
            <a href={`mailto:${site.email}`} className="mt-9 block text-2xl font-semibold text-coral-soft">
              {site.email}
            </a>
            <DirectContacts />
            <SocialLinks className="mt-12 flex gap-6 text-[10px] font-bold uppercase tracking-[.17em] text-white/60" />
            <div className="mt-20 rounded-[2rem] bg-plum p-8">
              <Image
                src="/assets/nashwave-wave-white.svg"
                unoptimized
                alt=""
                width={298}
                height={142}
                className="mb-20 h-auto w-28 opacity-70"
              />
              <p className="text-xl font-semibold">{copy.cardLine}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
