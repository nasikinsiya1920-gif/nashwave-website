# Nashwave website

Next.js (App Router) + TypeScript + Tailwind CSS v4, converted from the Figma Make design "Nashwave-Logo-Concepts".

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Where to edit things

| What | File |
|---|---|
| All text (services, steps, quotes, email, phone, social links) | `src/lib/content.ts` |
| Colours & fonts (design tokens) | `src/app/globals.css` → `@theme` block |
| SEO title / description / share image | `src/lib/content.ts` (`site`) and `src/app/layout.tsx` |
| Each page section | `src/components/*.tsx` (in page order in `src/app/page.tsx`) |
| Images & logos | `public/assets/` |
| Favicon | `src/app/icon.svg` |

## Deploying on Netlify

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo → **Deploy**.
   Netlify detects Next.js automatically (settings are also in `netlify.toml`).
3. Contact form: submissions show up in Netlify → your site → **Forms**.
   (Enable form detection under *Forms* if Netlify asks.) The form's field list lives in
   `public/__forms.html` — keep it in sync if you add or rename fields in `Contact.tsx`.

## Still to fill in

- Phone number, city and social links in `src/lib/content.ts` (currently placeholders from the design)
- Client logos and testimonials (currently placeholder names)
- Showreel video — replace the placeholder in `src/components/Showreel.tsx`
