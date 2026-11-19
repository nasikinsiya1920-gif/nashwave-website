# CLAUDE.md

Marketing site for Nashwave (nashwave.tech) — media marketing & digital solutions. Tagline: "Turn the Tide. Move the Business."

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), deployed on Netlify from GitHub.
- Fonts via `next/font/google`: DM Sans (body, `--font-dm-sans`) and Sora 800 (`--font-sora`).
- `Header` and `Footer` live in `src/app/layout.tsx` and wrap every page.

## Pages (`src/app/`)
| Route | File | Built from |
|---|---|---|
| `/` | `page.tsx` | MorphLogo, Hero, Tagline, Showreel, About, Services, WhyUs (3), Approach, Contact, FinalCta |
| `/about` | `about/page.tsx` | About (asPage), WhyUs (all 6), Approach, FinalCta |
| `/services` | `services/page.tsx` | Services (asPage), Approach, FinalCta |
| `/services/[slug]` | `services/[slug]/page.tsx` | ServiceHero, ServiceIncludes, Approach, WhyUs (3), Testimonials (single), Services (others), FinalCta |
| `/work` | `work/page.tsx` | Showreel (asPage), CaseStudies, ClientLogos, Testimonials, FinalCta |
| `/contact` | `contact/page.tsx` | Contact (asPage) via ContactFromParams in `<Suspense>` (reads `?service=<slug>`) |
| `/privacy`, `/terms` | `privacy/`, `terms/` | LegalPage — **draft text, needs legal review** |
| 404 | `not-found.tsx` | Unknown URLs and unknown service slugs (`dynamicParams = false`) |

## Conventions
- **All copy lives in `src/lib/content.ts`** — page and component files never contain text. Section copy is in `*Section` objects, page SEO in `pageMeta`, small UI strings in `ui`.
- Routes come from `routes` / `navLinks` / `footerNav` in content.ts. Use `next/link` for internal links; never `href="#"`.
- Section components take props (`asPage`, `count`, `items`, `ctaHref`, …) so the homepage and inner pages render the same components. `asPage` makes the section's heading an `h1` and adds `PAGE_TOP` padding to clear the fixed header.
- Homepage CTAs scroll to `#contact`; on every other page CTAs go to `/contact` (service pages use `/contact?service=<slug>`).
- The scroll-morph logo (`MorphLogo`) is only rendered on the homepage. Other pages get a static white logo inside `Header`.
- Empty placeholders hide themselves: social links, phone and city render only when set; the showreel modal embeds `site.showreelUrl` when set; case studies show a "coming soon" panel while empty. Sample clients/testimonials show a "Placeholder" tag until flagged as real.
- Per-page metadata via `pageMetadata()` in `src/lib/seo.ts`. Add every new route to `src/app/sitemap.ts`.
- Use the theme tokens from `globals.css` (`plum`, `coral`, `coral-soft`, `ink`, `sand`, `sand-deep`, `deep`, `teal`) — no new hard-coded hex values.
- Bespoke styles/animations are plain CSS classes in `globals.css`. Images via `next/image`; SVGs use `unoptimized`.
- Client components (`"use client"`) only where there is state, pointer/scroll logic or URL params: Header, MorphLogo, Hero, Tagline, Showreel, Approach (scroll-in + hover state for the process board), Testimonials, Contact, ContactFromParams.
- Contact form posts to Netlify Forms via `/__forms.html`; keep `public/__forms.html` field names (name, email, company, service, message) in sync with `Contact.tsx`.
- Always run `npm run build` and `npm run check:links` (against a running server) before pushing.
