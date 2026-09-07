# Nine Cypresses — assets

Everything visual the client has. Nothing here says how the assets should be used.

## Photographs

Nine photographs. Use these URLs directly (they serve JPEG at any width via `?w=` and `&q=`; the base URL without
parameters is the full-size original). Alt text is your job; the description column is what is in the picture.

| file (call it this) | URL | ratio | what is in the picture |
|---|---|---|---|
| `house-morning.jpg` | https://images.unsplash.com/photo-1523217582562-09d0def993a6 | 1:1 | the main house from the lawn, mid-morning: white rendered cubes, a covered entrance, a young tree by the door, a stone pine behind, hard blue sky |
| `pool-dusk.jpg` | https://images.unsplash.com/photo-1551882547-ff40c63fe5fa | 3:2 | the pool at dusk: white buildings, tall palms reflected in still water, lanterns lit, a pink-violet sky, a couple walking in the distance |
| `pool-noon.jpg` | https://images.unsplash.com/photo-1512917774080-9991f1c4c750 | 3:2 | the pool pavilion at noon: white flat-roofed building, glass sliding doors open onto a pale stone terrace, turquoise water bottom right, a palm and a glossy shrub in the foreground |
| `courtyard.jpg` | https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8 | 3:4 (portrait) | the inner courtyard: tall palms and big-leaved plants in concrete planters, a patterned tile floor in grey, white and green, round marble tables with green wire chairs, a gallery above |
| `room-evening.jpg` | https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af | 3:2 | a corner of a courtyard room at evening: linen bedding, blue and patterned cushions, a plywood headboard, a small bedside table with a lit glass lamp, pale grey walls |
| `bath.jpg` | https://images.unsplash.com/photo-1507652313519-d4e9174996dd | 3:2 | the stone bath: a freestanding oval tub on white pebbles against a rough grey rendered wall, a palm in the corner, towels on a wooden ladder, soft light from above |
| `terrace-evening.jpg` | https://images.unsplash.com/photo-1559339352-11d035aa65de | 4:3 | the terrace at sunset, tables laid for dinner under a canvas pergola with white curtains, the bay and hills across the water behind |
| `breakfast.jpg` | https://images.unsplash.com/photo-1493770348161-369560ae357d | 3:2 | breakfast from above on white marble: bowls of yoghurt and fruit, waffles with honeycomb, a jar of honey, coffee, a branch of green flowers |
| `village-lane.jpg` | https://images.unsplash.com/photo-1601581875039-e899893d520c | 4:3 | a lane in the village: whitewashed walls, blue shutters and doors, café tables under a pink-and-white bougainvillea, flagstones outlined in white |

Licence: Unsplash Licence (free for commercial use, no attribution required). Verified to resolve 2026-09-07.
Photographers are credited on the Unsplash page of each photo.

## Mark

The only graphic the client has. An SVG, nine vertical strokes on a baseline. Colour is not fixed — `currentColor`.
There is no wordmark; the name is set in type.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-label="Nine Cypresses">
<path d="M12 52V22M24 52V14M36 52V26M48 52V10M60 52V20M72 52V8M84 52V24M96 52V16M108 52V28"/>
<path d="M4 56h112" stroke-width="2"/>
</svg>
```

## Colours the client likes

Two, from the building. There is no palette beyond these.

- `#F3EFE6` — the lime-washed walls
- `#2B4C7E` — the blue of the shutters and doors

## Links and fields

- Booking engine: `https://book.ninecypresses.example/` (external, opens in a new tab)
- Waitlist endpoint: `{{WAITLIST_ENDPOINT}}` — accepts POST with `email` (required) and `name` (optional); the real
  address is supplied at launch
- Email: `hello@ninecypresses.example` · Phone: `+30 22850 00000`
- Instagram: `https://instagram.com/ninecypresses.example` (placeholder handle)
