# Verification

Local production build, 7 September 2026. These are lab checks, not a claim of
real-device testing or a subjective design score.

## Build and functional checks

- `npm run build`, `npm run typecheck`, and all 5 waitlist unit tests pass.
- Browser checks at **320, 390, 768, 1024, 1440 and 1920px**: no horizontal
  overflow; all 9 supplied photos load; the main booking CTA is in the first
  viewport.
- All **14 client-copy paragraphs** match the original `BRIEF.md` exactly after
  whitespace normalization. All rates and offer terms remain visible.
- Four booking links use the supplied URL, new-tab target and
  `noopener noreferrer`; the waitlist anchor works.
- Axe automated WCAG A/AA and best-practice scans report **0 violations** at
  390px and 1440px. This is not a complete manual accessibility certification.
- Keyboard skip link works. Reduced-motion mode has no animation/transition or
  smooth scrolling. JavaScript-disabled content and native form submission work.
- Invalid email returns 400; cross-origin submission returns 403; oversized
  payload returns 413. An unconfigured list returns **503**, says nothing was
  saved, and retains the entered fields for retry.
- Mocked upstream tests confirm field forwarding, optional name, confirmed 2xx
  success, and truthful errors. No email was sent to a real mailing list.
- No cookies or browser storage were created. The only external browser request
  host in local testing was `images.unsplash.com`; fonts are self-hosted.
- Hotel JSON-LD, canonical URL, English language and a single H1 are present.

## Lighthouse

Production server on localhost, Chromium, simulated Lighthouse settings:

| Category / metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 93 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First contentful paint | 0.8 s | 0.2 s |
| Largest contentful paint | 2.9 s | 0.6 s |
| Cumulative layout shift | 0 | 0 |
| Total blocking time | 160 ms | 0 ms |

Scores fluctuate and are not field Core Web Vitals. Direct supplied JPEGs and the
Next.js/React runtime are the remaining mobile payload costs. No replacement
imagery or analytics was introduced to improve a score.

Run `npm run qa -- <url>` to repeat the browser checks. Output and screenshots are
generated into the ignored `test-results` directory.

## Live deployment verification

Repeated the complete browser suite against
`https://nc-site-pnnw.vercel.app/` on 7 September 2026: **all checks passed**,
including all six viewport widths, exact copy, all nine images, automated
accessibility scans, keyboard/anchor behaviour, reduced motion, no cookies or
browser storage, API validation and JavaScript-disabled native form submission.

The stable alias and immutable URL in README both returned **HTTP 200** without
a login. Vercel reports deployment `dpl_9picLTxUGbsbSciUv4wdPrBEc2Ff` as **READY**,
and GitHub's Vercel status is successful for commit `539c430`.
The immutable deployment URL carries Vercel's `X-Robots-Tag: noindex`.
The only external browser request host was the supplied photo host, including
on the live deployment; no Vercel feedback toolbar or analytics script loaded.

## Still requires launch input

- Real booking/contact/domain values and the real waitlist endpoint.
- Confirmation the endpoint accepts JSON, with production rate limiting and
  consent/unsubscribe handling supplied by the mailing service.
- Human review on an actual phone and the client's subjective design judgment.
