---
version: alpha
name: Nine Cypresses
description: Project-scoped design system for the Nine Cypresses website; not a studio-wide rebrand.
colors:
  primary: "#2B4C7E"
  wall: "#F3EFE6"
  shutter: "#2B4C7E"
  ink: "color-mix(in srgb, #2B4C7E 72%, black)"
  muted: "color-mix(in srgb, #2B4C7E 80%, #F3EFE6)"
  line: "color-mix(in srgb, #2B4C7E 26%, #F3EFE6)"
typography:
  display:
    fontFamily: Cormorant Garamond
    fontSize: 6.5rem
    fontWeight: 400
    lineHeight: 0.93
    letterSpacing: "-0.045em"
  heading:
    fontFamily: Cormorant Garamond
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.035em"
  reading:
    fontFamily: Cormorant Garamond
    fontSize: 2.125rem
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: DM Sans
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: 0px
spacing:
  unit: 8px
  gutter: 24px
  section: 112px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.wall}"
    rounded: "{rounded.none}"
    padding: 16px
  reading-text:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  price-note:
    textColor: "{colors.muted}"
  section-rule:
    backgroundColor: "{colors.line}"
voice:
  tone: "The client's supplied copy, unchanged. Functional UI feedback is plain and factual."
  person: "As supplied; no new marketing copy."
  formality: "As supplied."
messaging:
  product-name: Nine Cypresses
  tagline: "Twelve rooms, nine cypresses, one beach."
  value-prop: "A small hotel on the south-west coast of Naxos, opening 15 May 2027. Built by hand on our family's orchard, five minutes' walk from Plaka beach."
  banned-phrases: "Invented reviews, awards, amenities, scarcity or marketing lines."
licensing:
  assets-path: brand/assets
  logo: "Exact SVG paths supplied in ASSETS.md; colour uses currentColor."
  fonts: "Cormorant Garamond and DM Sans, SIL Open Font License; self-hosted Latin WOFF2 files with licence copies."
  attribution: "Supplied photo list states Unsplash Licence, no attribution required."
---

## Overview

Scope: this client website only. The two colours, mark and copy are supplied facts.
Typography, sizing, spacing and component treatments are implementation choices
made under the brief's express instruction to decide the unspecified design and
record the reasons. They are not represented as pre-existing client guidelines.

The page is an editorial spread rather than a resort template: generous serif
type, rectangular photographic compositions, thin rules, visible prices and a
plain, persistent route to booking.

## Colors

Cream and shutter blue are the only independent hues. Ink, muted text, borders
and hover states are mixtures of those colours and black/transparent.

## Typography

Cormorant Garamond carries the opening line and section headings. DM Sans carries
the practical details and forms. Fonts are self-hosted and Latin-only; no Google
Fonts runtime request. Responsive sizes are computed from these type roles.

## Layout

One page with a mobile-first reading order. The hotel leads; the village image
belongs to directions. The offer follows rooms and visible rates, not the hero.
No invented sea-room photograph is implied.

## Components

Square blue booking buttons, underlined secondary links, visible form labels,
high-contrast keyboard focus, and inline truthful submission feedback.

## Voice

Do not rewrite the supplied copy or invent testimonials. Form errors, field
labels, navigation and accessibility labels are utility text, not marketing.

## Licensing

Use only the exact photographic URLs in the supplied asset list. The original
mark is reused as the sole decorative graphic. No stock search or generated art.

## Do's and Don'ts

- Show the full room descriptions and prices without interaction.
- Let all substantive content exist in server-rendered HTML.
- Do not hide content behind entrance effects or a loading screen.
- Do not add tracking, cookies, social embeds or a non-functional success state.
