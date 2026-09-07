# Nine Cypresses — website brief

Prepared for: the web team · From: Eleni Petrou, owner · September 2026

## Who we are

Nine Cypresses is a twelve-room hotel on the south-west coast of Naxos, in the Cyclades. It is my family's old
orchard plot above Plaka beach — the nine cypress trees along the boundary wall are the ones my grandfather
planted — and my husband Markos and I have spent three years building it. It is not a resort and it is not a
villa rental. It is a small hotel run by the two of us and a team of six, and we will be there every day.

We open on **15 May 2027**. Nothing exists online yet except an Instagram account with building-site photos.
This site is the first thing anyone will see of us.

## What the site is for

One page. Two jobs, in this order:

1. **Take bookings for the opening season** (15 May – 31 October 2027). The booking engine is live:
   `https://book.ninecypresses.example/` — it opens in a new tab and handles dates, rooms and payment. The site
   just has to get people to click it, confident.
2. **Collect a waitlist** for people who are not ready to book: name (optional) and email. We will email them once
   when the last rooms for summer are released and once when the restaurant opens. Send the two fields to
   `{{WAITLIST_ENDPOINT}}` — we will give you the real address; put a placeholder in and tell us where it lives.

## What I will judge it on

I have looked at a great many hotel websites over three years, and almost all of them look like each other. I
want the opposite. My test is simple: **someone lands on this page and, within a few seconds, thinks it is the
best hotel website they have seen.** On a laptop and on a phone. That is the whole brief for how it should look.
How you get there is your call — I am not a designer and I will not pretend to be one.

Two things I know about our guests that may help you: they book directly rather than through the big sites
because they want to feel they have found something, and most of them will see this page first on a phone,
late in the evening, at home.

## What must be true

- Every word of the copy below is used as written. Tidy punctuation if you must; do not rewrite, shorten or add
  marketing lines. It is short on purpose.
- Prices are shown as written, not hidden behind a click.
- Only our photographs (`ASSETS.md`). No stock photography.
- Nothing invented: no reviews (we have none yet — we have not opened), no awards, no press, no invented
  amenities, no made-up numbers.
- Works properly on a phone.
- No pop-ups, no chat widget, no cookie banner (we run no tracking yet — add none).
- English only for now; Greek and German come later.

## Copy — use as written

**Opening line:**
> Twelve rooms, nine cypresses, one beach.

**Under it:**
> A small hotel on the south-west coast of Naxos, opening 15 May 2027. Built by hand on our family's orchard,
> five minutes' walk from Plaka beach.

Buttons: **Book your stay** (booking link) · **Join the waitlist** (scrolls to the waitlist)

**The place**
> Nine Cypresses is what we always wanted to find on an island and never quite did: somewhere small enough that
> the people who run it know your name by the second morning, quiet enough to hear the sea from the courtyard,
> and close enough to the beach that you leave your sandals at the gate. Twelve rooms around a courtyard of
> lemon trees, a pool at the edge of the orchard, and a long table on the terrace where we cook three nights a
> week.

**The rooms**
> All twelve rooms have a terrace or a balcony, a kingsize bed, a stone bath, and no television.
>
> **Courtyard rooms** — eight rooms on the ground floor, opening onto the lemon courtyard. 28 m². From €240 a
> night.
>
> **Sea rooms** — four rooms upstairs, facing west over the orchard to the sea. 34 m². From €320 a night.
>
> Prices include breakfast and taxes, for two people. The rate rises in July and August; the booking engine
> shows exact prices for your dates.

**Opening offer**
> Book any stay of three nights or more between 15 May and 30 June 2027 and we take 15% off. No code — the
> booking engine applies it. We will also leave a bottle of our neighbour's wine in your room, because you are
> among the first.

**The day**
> **Morning.** Breakfast is from the orchard and the village: figs, yoghurt from Filoti, honey from the hives
> behind the pool, bread from Katerina in Vivlos, eggs when the hens agree. Served in the courtyard until 11.
>
> **Afternoon.** The pool, the beach, or the shade. We have bicycles, snorkels and a box of paperbacks.
>
> **Evening.** Tuesday, Thursday and Saturday, Markos cooks one menu for whoever wants to eat, at one long
> table on the terrace, from eight. €45 a head with wine. Book at breakfast.

**Getting here**
> Fly to Athens, then a 40-minute flight or a 4–5 hour ferry to Naxos. We are 15 minutes from the port and 10
> from the airport; we will collect you for €30, or you can rent a car at the port. From Naxos town, the road
> to Plaka.

**Waitlist**
> **Not ready to book?** Leave your email and we will write twice: when the last summer rooms are released, and
> when the restaurant opens to non-residents.

Fields: name (optional), email · Button: **Keep me posted**

**Contact**
> Eleni and Markos Petrou · hello@ninecypresses.example · +30 22850 00000 · Plaka, Naxos 843 00, Greece

## Things we have not decided

I would rather you decided these and told me why than asked:

- How much of the island and how much of the hotel to show.
- Whether the opening offer is the first thing people see or the last.
- What the page should feel like beyond the photographs and the words.
- Whether the rooms need more than the two paragraphs above (we have nothing else written).

## Technical notes

Next.js on Vercel — the repository and the Vercel project are set up for you. Domain will be
`ninecypresses.example`; treat it as production for metadata. No analytics, no tracking. Mark up the hotel so
Google understands what it is. The two supplied colours and the mark are in `ASSETS.md`; there are no other
brand guidelines. When you are done, the preview URL goes in the repository README.
