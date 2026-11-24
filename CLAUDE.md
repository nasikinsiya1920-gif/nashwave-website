# CLAUDE.md

Marketing site for Nashwave (nashwavetech.com, hosted on Cloudflare Workers) — media marketing & digital solutions. Tagline: "Turn the Tide. Move the Business."

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`).
- Built and served by **vinext** (Vite-based reimplementation of the Next.js API) on **Cloudflare Workers**, deployed from GitHub with Workers Builds. `next build` / `next dev` are not used: use `npm run dev`, `npm run build`, `npm run preview`.
- Worker config: `wrangler.jsonc` (Worker name `nashwave`, `ASSETS` + `IMAGES` bindings, `keep_vars: true`); Vite config: `vite.config.ts`. The build writes `dist/server/wrangler.json`, which `wrangler deploy` uses.
- Server code reads Cloudflare variables/secrets with `import { env } from "cloudflare:workers"` (typed in `src/cloudflare-env.d.ts`), not `process.env`. Local values go in `.dev.vars` (git-ignored; template in `.dev.vars.example`).
- Fonts via `next/font/google`: DM Sans (body, `--font-dm-sans`) and Sora 800 (`--font-sora`).
- `Header` and `Footer` live in `src/app/layout.tsx` and wrap every page.

## Pages (`src/app/`)
| Route | File | Built from |
|---|---|---|
| `/` | `page.tsx` | MorphLogo, Hero, Tagline, About, Services, WhyUs (3), Approach, Contact, FinalCta |
| `/about` | `about/page.tsx` | About (asPage), WhyUs (all 6), Approach, FinalCta |
| `/services` | `services/page.tsx` | Services (asPage), Approach, FinalCta |
| `/services/[slug]` | `services/[slug]/page.tsx` | ServiceHero, ServiceIncludes, Approach, WhyUs (3), Testimonials (single), Services (others), FinalCta |
| `/work` | `work/page.tsx` | CaseStudies (asPage), ClientLogos, Testimonials, FinalCta |
| `/contact` | `contact/page.tsx` | Contact (asPage) via ContactFromParams in `<Suspense>` (reads `?service=<slug>`) |
| `/privacy`, `/terms` | `privacy/`, `terms/` | LegalPage — **draft text, needs legal review** |
| `/api/contact` | `api/contact/route.ts` | POST handler: validates the contact form and emails it via Resend |
| 404 | `not-found.tsx` | Unknown URLs and unknown service slugs (`dynamicParams = false`) |

## Conventions
- **All copy lives in `src/lib/content.ts`** — page and component files never contain text. Section copy is in `*Section` objects, page SEO in `pageMeta`, small UI strings in `ui`.
- Routes come from `routes` / `navLinks` / `footerNav` in content.ts. Use `next/link` for internal links; never `href="#"`.
- Section components take props (`asPage`, `count`, `items`, `ctaHref`, …) so the homepage and inner pages render the same components. `asPage` makes the section's heading an `h1` and adds `PAGE_TOP` padding to clear the fixed header.
- Homepage CTAs scroll to `#contact`; on every other page CTAs go to `/contact` (service pages use `/contact?service=<slug>`).
- The scroll-morph logo (`MorphLogo`) is only rendered on the homepage. Other pages get a static white logo inside `Header`. While large it plays the looping logo video and cross-fades to the SVG wordmark as it docks; while the mobile menu is open it snaps to its docked spot (Header fires `MENU_EVENT` from `src/lib/events.ts`) and the page can't scroll.
- Logo videos live in `public/assets/video/` (WebM + MP4 + poster each), built from the transparent master animation: `nashwave-logo-dark.*` (white/coral on pure black, shown with `mix-blend-mode: screen`) and `nashwave-logo-light.*` (plum/coral on pure white, `mix-blend-mode: multiply`). Blending instead of alpha video is deliberate: Safari can't show transparent WebM. Keep the backgrounds pure black/white if they are re-made.
- Homepage tagline is a pinned scroll scene: `.tagline-stage` is 280vh with a sticky `.tagline-pin`; JS sets `--part`/`--reveal` (0→1) and CSS does the movement. Anything wrapping it must not use `overflow: hidden` (it breaks sticky) — `<main>` uses `overflow-x-clip`.
- Scroll reveals: wrap text in `<Reveal>` (`variant="line"` for heading lines, `delay` to stagger). "Start with a conversation" uses `.btn-attention` (animated colour sweep + pulse). Every animation has a `prefers-reduced-motion` fallback — keep it that way.
- Footer: big looping light logo (`FooterLogo`) above the links. When the whole footer fits on screen, `html.footer-curtain` pins it behind `<main>`, which lifts away like a curtain (rounded bottom + shadow); on phones it scrolls normally.
- Director contacts (`contacts` in content.ts) appear in Contact (via DirectContacts), Footer and FinalCta; WhatsApp links come from `whatsappLink()`.
- Empty placeholders hide themselves: social links render only when set; the showreel modal embeds `site.showreelUrl` when set; case studies show a "coming soon" panel while empty. Sample clients/testimonials show a "Placeholder" tag until flagged as real.
- Per-page metadata via `pageMetadata()` in `src/lib/seo.ts`. Add every new route to `src/app/sitemap.ts`.
- Use the theme tokens from `globals.css` (`plum`, `coral`, `coral-soft`, `ink`, `sand`, `sand-deep`, `deep`, `teal`) — no new hard-coded hex values.
- Bespoke styles/animations are plain CSS classes in `globals.css`. Images via `next/image`; SVGs use `unoptimized`.
- Client components (`"use client"`) only where there is state, pointer/scroll logic or URL params: Header, MorphLogo, Hero, Tagline, Showreel, Approach (scroll-in + hover state for the process board), Testimonials, Contact, ContactFromParams, Reveal, FooterLogo.
- Contact form POSTs `FormData` to `/api/contact`, which sends it with Resend using `RESEND_API_KEY` (secret), `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Keep the field names (name, email, company, service, message, bot-field honeypot) in sync between `Contact.tsx` and the route.
- Always run `npm run typecheck`, `npm run build`, and `npm run check:links` (against `npm run preview`) before pushing.
