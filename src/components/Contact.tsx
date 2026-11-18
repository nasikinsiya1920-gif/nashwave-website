"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { budgetRanges, services, site } from "@/lib/content";
import { Label } from "./ui";

/**
 * Contact form powered by Netlify Forms.
 * Netlify detects the form from /public/__forms.html at build time;
 * submissions appear in Netlify → your site → Forms.
 */
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
    <section id="contact" className="bg-ink px-5 py-24 text-white md:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Label light>Let&apos;s Talk</Label>
        <div className="grid gap-16 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <h2 className="display-title">
              Start a project
              <br />
              with us.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/55">
              Tell us what you are facing and where you want to go. We will reply within one working day.
            </p>
            {status === "sent" ? (
              <div role="status" className="mt-14 border border-coral/40 bg-coral/10 p-8">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-coral-soft">
                  Brief received
                </span>
                <p className="mt-4 text-2xl font-semibold">Thanks. Your message has landed.</p>
                <p className="mt-2 text-sm text-white/55">We will be in touch within one working day.</p>
              </div>
            ) : (
              <form name="contact" onSubmit={submit} className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2">
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <label className="field">
                  <span>Name</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label className="field">
                  <span>Work email</span>
                  <input name="email" required type="email" autoComplete="email" />
                </label>
                <label className="field">
                  <span>Company</span>
                  <input name="company" required autoComplete="organization" />
                </label>
                <label className="field">
                  <span>What do you need?</span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="field md:col-span-2">
                  <span>Tell us about your project</span>
                  <textarea name="message" required rows={4} />
                </label>
                <label className="field">
                  <span>Budget range (optional)</span>
                  <select name="budget" defaultValue="">
                    <option value="">Select a range</option>
                    {budgetRanges.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
                <button type="submit" disabled={status === "sending"} className="btn-accent self-end">
                  {status === "sending" ? "Sending…" : "Send my brief"}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-coral-soft md:col-span-2">
                    Something went wrong. Please try again or email us at {site.email}.
                  </p>
                )}
              </form>
            )}
          </div>
          <aside className="border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12">
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">
              Get in touch
            </span>
            <a href={`mailto:${site.email}`} className="mt-9 block text-2xl font-semibold text-coral-soft">
              {site.email}
            </a>
            <p className="mt-5 text-sm leading-7 text-white/50">
              {site.phone}
              <br />
              {site.location}
            </p>
            <div className="mt-12 flex gap-6 text-[10px] font-bold uppercase tracking-[.17em] text-white/60">
              <a href={site.social.linkedin}>LinkedIn</a>
              <a href={site.social.instagram}>Instagram</a>
              <a href={site.social.youtube}>YouTube</a>
            </div>
            <div className="mt-20 rounded-[2rem] bg-plum p-8">
              <Image
                src="/assets/nashwave-wave-white.svg"
                unoptimized
                alt=""
                width={298}
                height={142}
                className="mb-20 h-auto w-28 opacity-70"
              />
              <p className="text-xl font-semibold">Close, curious and accountable to results.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
