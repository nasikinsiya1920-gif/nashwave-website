# Nashwave website

Next.js (App Router) + TypeScript + Tailwind CSS v4, converted from the Figma Make design "Nashwave-Logo-Concepts".
Hosted on **Cloudflare Workers** using [vinext](https://github.com/cloudflare/vinext), Cloudflare's recommended way to run Next.js apps on Workers.
vinext builds the same `src/app` code with Vite instead of `next build`.

## Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars   # then put a real Resend API key in .dev.vars (needed only for the contact form)
npm run dev            # http://localhost:3000 (Vite dev server, runs in the Workers runtime)
npm run build          # production build into dist/
npm run preview        # build, then serve the built Worker locally with Wrangler on http://localhost:3000
npm run typecheck      # TypeScript check
npm run check:links    # crawl every page of the running site for broken links (run `npm run preview` first)
```

`.dev.vars` holds local secrets and is git-ignored — never commit it.

## Pages

| Page | URL |
|---|---|
| Home | `/` |
| About (incl. approach) | `/about`, `/about#approach` |
| Services overview | `/services` |
| Service detail (×6) | `/services/brand-creative`, `/services/media-content-production`, `/services/social-community`, `/services/websites-digital-products`, `/services/web-apps-data-automation`, `/services/brand-assets-design` |
| Work | `/work` |
| Contact | `/contact` (add `?service=<slug>` to pre-select a service) |
| Privacy / Terms | `/privacy`, `/terms` |

## Where to edit things

Almost everything is edited in **`src/lib/content.ts`** — the pages read from it, so a change there updates every page that shows it.

| What | Where in `src/lib/content.ts` |
|---|---|
| Email, social links, showreel video | `site` |
| Directors' names, roles, phone & WhatsApp numbers | `contacts` |
| Navigation & footer links | `routes`, `navLinks`, `footerNav` |
| Services (title, description, "What's included", URL slug) | `services` |
| "Why Us" reasons (homepage shows the first 3, /about all 6) | `reasons` |
| Approach steps | `steps` |
| Client names, testimonials, case studies | `clients`, `quotes`, `caseStudies` |
| Section headings & intros | `heroSection`, `taglineSection`, `aboutSection`, `servicesSection`, … |
| Page titles & share descriptions | `pageMeta` (site-wide defaults in `site`) |
| Privacy & terms text | `legal`, `privacyPage`, `termsPage` |

Other places:

| What | File |
|---|---|
| Colours & fonts (design tokens) | `src/app/globals.css` → `@theme` block |
| Section layouts | `src/components/*.tsx` |
| Images & logos | `public/assets/` |
| Favicon | `src/app/icon.svg` |
| Sitemap | `src/app/sitemap.ts` |
| Contact form email sending | `src/app/api/contact/route.ts` |
| Cloudflare Worker settings | `wrangler.jsonc` (build settings: `vite.config.ts`) |

## Deploying on Cloudflare Workers

The site deploys from GitHub with **Workers Builds** to a Worker named **`nashwave`** (the `name` in `wrangler.jsonc` must match the Worker name in the dashboard).

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick this repo.
2. Settings:
   - Project / Worker name: `nashwave`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/` (leave empty)
3. After the first deploy, open the Worker → **Settings → Variables and Secrets** and add:
   - `RESEND_API_KEY` — type **Secret** — your Resend API key
   - `CONTACT_TO_EMAIL` — type **Text** — where enquiries go, e.g. `sales@nashwavetech.com` (comma-separate several)
   - `CONTACT_FROM_EMAIL` — type **Text** — the sender, on a domain verified in Resend, e.g. `Nashwave Website <website@nashwavetech.com>`
4. Add the custom domain under the Worker → **Settings → Domains & Routes**.

`wrangler.jsonc` sets `keep_vars: true` so deploys don't delete the dashboard variables.
`npm run build` writes the final Worker config to `dist/server/wrangler.json`, and `npx wrangler deploy` picks it up automatically.
To deploy from your own machine instead: `npx wrangler login`, then `npm run deploy`.

### CI checks (GitHub Actions)

`.github/workflows/ci.yml` runs on every pull request and every push to `main`: typecheck, build, the local Cloudflare preview (`wrangler dev`), the link check, and a contact-API validation test (no email is sent).
Results show as a **CI** check on each pull request. It only checks: Cloudflare Workers Builds still does the deploys.

### Contact form

The form posts to `/api/contact` (`src/app/api/contact/route.ts`), which emails each enquiry via [Resend](https://resend.com) with the visitor's address as reply-to.
Verify your sending domain (e.g. nashwavetech.com) in Resend first, or Resend will reject the `CONTACT_FROM_EMAIL` address.
Errors are visible in the Worker's **Logs** in the Cloudflare dashboard.

### Images

`next/image` images are resized by Cloudflare Images through the `IMAGES` binding in `wrangler.jsonc` (served from `/_next/image`).
Cloudflare Images transformations are billed per unique transformation beyond the free allowance.

## Still to fill in

All in `src/lib/content.ts` unless noted. Empty values are hidden on the site; placeholders are labelled.

- `site.social.linkedin`, `.instagram`, `.youtube` — profile URLs
- `site.showreelUrl` — YouTube/Vimeo link or video file for the showreel
- `clients` (then set `clientsArePlaceholder = false`) — client names
- `quotes` (then set `placeholder: false` on each) — real testimonials
- `caseStudies` — case studies for /work (images go in `public/assets/`)
- `legal.entityName`, `legal.address`, `legal.effectiveDate`, plus the `[TODO: …]` paragraphs in `privacyPage` and `termsPage` — **have both pages reviewed by a lawyer**
