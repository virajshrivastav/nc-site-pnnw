# Nine Cypresses

One-page, mobile-first Next.js website for the supplied Nine Cypresses brief.

**Live preview: not yet verified — deployment is blocked on Vercel access/linkage.**

The site was pushed to `main` at commit
[`27a5c8f`](https://github.com/virajshrivastav/nc-site-pnnw/commit/27a5c8f3206f1cc74e2cf1969c138e8d5a389160)
on 7 September 2026. GitHub reports no Vercel deployment/check for that commit.
The candidate default alias `https://nc-site-pnnw.vercel.app` returns
`404 DEPLOYMENT_NOT_FOUND`; it is not a verified project URL. The builder does not
currently have authenticated Vercel access. This README will name a preview URL
only after that URL is actually verified.

To unblock: in the existing Vercel project, confirm this repository is connected,
the framework is Next.js, the root is the repository root and the production
branch is `main`; deploy its latest commit. Alternatively, connect Vercel to the
builder so it can inspect and finish the deployment. Do not create a duplicate
project if the existing one is available.

## Development

Node.js 22, npm.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm test
npm run typecheck
npm run build
npm run start
# In a second terminal:
npx playwright install chromium
npm run qa -- http://localhost:3000
```

The browser checks cover exact copy from `BRIEF.md`, responsive overflow, image loading, booking links, form behaviour, accessibility, reduced motion, no cookies/storage and JavaScript-disabled content.

## Deployment and launch

Pushing to `main` is intended to deploy through the existing Vercel connection.
That connection has not yet been independently confirmed.

- Set the **server-only** Vercel environment variable `WAITLIST_ENDPOINT` to the client's actual HTTPS endpoint, then redeploy. The literal placeholder is in `.env.example` and `lib/waitlist.mjs`. The endpoint receives JSON with required `email` and optional `name`.
- With no real endpoint, the waitlist truthfully reports that submissions are not saved; it does not simulate a signup.
- Booking, email, phone and the canonical production domain are test values from the brief. Change `lib/content.ts` when real launch details are supplied.
- The Instagram placeholder is not linked. There is no analytics, tracking, cookie banner, embed or chat widget.
- Photographs are loaded directly from the nine supplied URLs with responsive size parameters. Fonts are self-hosted; their licence files are in `public/fonts`.

The original client brief and asset list are preserved as `BRIEF.md` and `ASSETS.md`. Design decisions, implementation assumptions and harness caveats are in `NOTES.md`.
