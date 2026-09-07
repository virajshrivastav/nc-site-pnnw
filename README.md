# Nine Cypresses

One-page, mobile-first Next.js website for the supplied Nine Cypresses brief.

**Live website preview: [nc-site-pnnw.vercel.app](https://nc-site-pnnw.vercel.app/)**

**Immutable first-build preview:**
[nc-site-pnnw-3g9go18so-virajshrivastavs-projects.vercel.app](https://nc-site-pnnw-3g9go18so-virajshrivastavs-projects.vercel.app/)

Both URLs were verified publicly accessible with HTTP 200 on 7 September 2026.
The initial Vercel deployment is `READY`, built from `main` commit
[`539c430`](https://github.com/virajshrivastav/nc-site-pnnw/commit/539c43046a75365a10143f1c0a4f1555c5add69f).
The stable alias follows subsequent deployments of `main`; the immutable URL
preserves the first reviewed build.

The full browser QA suite was repeated successfully against the live stable
alias. See `QA.md` for tested behaviours and the distinction between automated
checks and human/real-device review.

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

The Vercel project is connected to `virajshrivastav/nc-site-pnnw`, production
branch `main`, framework Next.js, repository root, `npm ci` / `npm run build`.
Node.js 22 is pinned in `package.json` and was verified in the first deployment.
The project was imported with the operator's approval after confirming that no
matching project/link existed in the connected account.

- Set the **server-only** Vercel environment variable `WAITLIST_ENDPOINT` to the client's actual HTTPS endpoint, then redeploy. The literal placeholder is in `.env.example` and `lib/waitlist.mjs`. The endpoint receives JSON with required `email` and optional `name`.
- With no real endpoint, the waitlist truthfully reports that submissions are not saved; it does not simulate a signup.
- Booking, email, phone and the canonical production domain are test values from the brief. Change `lib/content.ts` when real launch details are supplied.
- The Instagram placeholder is not linked. There is no analytics, tracking, cookie banner, embed or chat widget.
- Photographs are loaded directly from the nine supplied URLs with responsive size parameters. Fonts are self-hosted; their licence files are in `public/fonts`.

The original client brief and asset list are preserved as `BRIEF.md` and `ASSETS.md`. Design decisions, implementation assumptions and harness caveats are in `NOTES.md`.
