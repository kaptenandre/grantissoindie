# GRANT: artist site

Two apps in one repo:

| Folder | What | Stack |
| --- | --- | --- |
| `web/` | The public site | Astro 7, static pages + Netlify functions for the API and server islands |
| `studio/` | The CMS | Sanity Studio 6 (deploy to `*.sanity.studio`) |

Design is intentionally bare: structure, data and integrations first. All visual tokens live in `web/src/styles/global.css`.

## Features

- **Video background**: MP4 + WebM + optional portrait mobile cut + poster. Pauses on reduced motion / data saver. Upload in Sanity (Site settings > Hero); until then `web/public/video/*` is used.
- **Top links**: `navLinks` in Site settings (Stream, Pre-save, Merch, Tour...).
- **Socials**: Instagram, TikTok, Facebook and more, editable in Sanity.
- **Newsletter with SMS**: `POST /api/subscribe` with email and/or phone, explicit consent, honeypot, phone normalised to E.164 (`070...` -> `+4670...`). Works without JS, enhanced with fetch when JS is available. Provider chosen by `NEWSLETTER_PROVIDER`:
  - `klaviyo`: email + SMS consent in one list (recommended)
  - `webhook`: JSON POST to any URL (Zapier/Make into Laylo, Mailchimp, a sheet...)
  - `log`: dev only
- **Lyrics**: `song` documents with Portable Text lyrics; `/lyrics` and `/lyrics/[slug]`. `showLyrics` hides them until release day.
- **Releases**: label defaults to Skolhaus, smart link / pre-save, per-service links, tracklist.
- **Bandsintown** (ready, off by default): enable in Site settings > Shows and set `BANDSINTOWN_APP_ID`. Rendered as an Astro server island, cached for an hour at the edge, so tour dates stay fresh without rebuilds.

## Local dev

```sh
cd studio && cp .env.example .env && npm i && npm run dev   # localhost:3333
cd web && cp .env.example .env && npm i && npm run dev      # localhost:4321
```

The site builds and runs without any env vars (falls back to defaults in `web/src/lib/settings.ts`).

## Deploy

1. **Sanity**: create a project, set `SANITY_STUDIO_PROJECT_ID` and run `npm run deploy` in `studio/`. Add the site URL as a CORS origin.
2. **Netlify**: new site from this repo, base directory `web`. Set the env vars from `web/.env.example`.
3. **Rebuild on publish**: create a Netlify build hook and add it as a Sanity webhook (Project > API > Webhooks).
4. **Domain (GoDaddy)**: add the domain in Netlify, then in GoDaddy DNS set an `A` record for `@` to `75.2.60.5` and a `CNAME` for `www` to `<site>.netlify.app` (or switch nameservers to Netlify DNS).
