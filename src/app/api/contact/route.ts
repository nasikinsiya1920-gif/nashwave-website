import { env } from "cloudflare:workers";

/**
 * Contact form endpoint: validates the submission and emails it via Resend (https://resend.com).
 *
 * Runs on Cloudflare Workers. Configuration comes from the Worker's environment:
 * - RESEND_API_KEY      (secret)   Resend API key
 * - CONTACT_TO_EMAIL    (variable) where submissions are sent; comma-separate several addresses
 * - CONTACT_FROM_EMAIL  (variable) sender, on a domain verified in Resend, e.g. "Nashwave <website@nashwavetech.com>"
 * Locally, put them in `.dev.vars` (see README).
 *
 * Keep the field names in sync with src/components/Contact.tsx.
 */

const MAX = { name: 200, email: 320, company: 200, service: 1000, message: 5000 } as const;
type Field = keyof typeof MAX;

const json = (body: Record<string, unknown>, status: number) => Response.json(body, { status });
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form data." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
  if (String(form.get("bot-field") ?? "").trim()) return json({ ok: true }, 200);

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(MAX) as Field[]) {
    const value = String(form.get(field) ?? "").trim();
    if (!value) return json({ error: `Missing field: ${field}.` }, 400);
    if (value.length > MAX[field]) return json({ error: `Field too long: ${field}.` }, 400);
    data[field] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ error: "Invalid email address." }, 400);

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return json({ error: "The contact form is not configured." }, 500);
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Services", data.service],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;
  const html =
    `<table>${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table>` +
    `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `New enquiry from ${data.name} (${data.company})`,
        text,
        html,
      }),
    });
  } catch (err) {
    console.error("Could not reach Resend:", err);
    return json({ error: "Could not send your message." }, 502);
  }

  if (!res.ok) {
    console.error(`Resend error ${res.status}: ${await res.text()}`);
    return json({ error: "Could not send your message." }, 502);
  }
  return json({ ok: true }, 200);
}
