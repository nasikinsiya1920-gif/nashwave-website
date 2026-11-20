# Nashwave website

Next.js (App Router) + TypeScript + Tailwind CSS v4, converted from the Figma Make design "Nashwave-Logo-Concepts".

## Run it locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build check
npm run check:links    # crawl every page of the running site for broken links (dev or `npm start`)
```

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

## Deploying on Netlify

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo → **Deploy**.
   Netlify detects Next.js automatically (settings are also in `netlify.toml`).
3. Contact form: submissions show up in Netlify → your site → **Forms**.
   (Enable form detection under *Forms* if Netlify asks.) The form's field list lives in
   `public/__forms.html` — keep it in sync if you add or rename fields in `Contact.tsx`.

## Still to fill in

All in `src/lib/content.ts` unless noted. Empty values are hidden on the site; placeholders are labelled.

- `site.social.linkedin`, `.instagram`, `.youtube` — profile URLs
- `site.showreelUrl` — YouTube/Vimeo link or video file for the showreel
- `clients` (then set `clientsArePlaceholder = false`) — client names
- `quotes` (then set `placeholder: false` on each) — real testimonials
- `caseStudies` — case studies for /work (images go in `public/assets/`)
- `legal.entityName`, `legal.address`, `legal.effectiveDate`, plus the `[TODO: …]` paragraphs in `privacyPage` and `termsPage` — **have both pages reviewed by a lawyer**
