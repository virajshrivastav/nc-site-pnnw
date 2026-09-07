# Nine Cypresses

One-page, mobile-first Next.js website for the supplied Nine Cypresses brief.

**Live preview:** deployment pending verification. This line will be replaced with the actual Vercel URL after the first push.

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

- Set the **server-only** Vercel environment variable `WAITLIST_ENDPOINT` to the client's actual HTTPS endpoint, then redeploy. The literal placeholder is in `.env.example` and `lib/waitlist.mjs`. The endpoint receives JSON with required `email` and optional `name`.
- With no real endpoint, the waitlist truthfully reports that submissions are not saved; it does not simulate a signup.
- Booking, email, phone and the canonical production domain are test values from the brief. Change `lib/content.ts` when real launch details are supplied.
- The Instagram placeholder is not linked. There is no analytics, tracking, cookie banner, embed or chat widget.
- Photographs are loaded directly from the nine supplied URLs with responsive size parameters. Fonts are self-hosted; their licence files are in `public/fonts`.

The original client brief and asset list are preserved as `BRIEF.md` and `ASSETS.md`. Design decisions, implementation assumptions and harness caveats are in `NOTES.md`.
