export const site = {
  name: "Nine Cypresses",
  url: "https://ninecypresses.example",
  booking: "https://book.ninecypresses.example/",
  email: "hello@ninecypresses.example",
  phone: "+30 22850 00000",
  telephone: "+302285000000",
};

// The client copy is intentionally not paraphrased. Tests compare it with BRIEF.md.
export const copy = {
  opening: "Twelve rooms, nine cypresses, one beach.",
  introduction:
    "A small hotel on the south-west coast of Naxos, opening 15 May 2027. Built by hand on our family's orchard, five minutes' walk from Plaka beach.",
  place:
    "Nine Cypresses is what we always wanted to find on an island and never quite did: somewhere small enough that the people who run it know your name by the second morning, quiet enough to hear the sea from the courtyard, and close enough to the beach that you leave your sandals at the gate. Twelve rooms around a courtyard of lemon trees, a pool at the edge of the orchard, and a long table on the terrace where we cook three nights a week.",
  rooms:
    "All twelve rooms have a terrace or a balcony, a kingsize bed, a stone bath, and no television.",
  courtyard:
    "Courtyard rooms — eight rooms on the ground floor, opening onto the lemon courtyard. 28 m². From €240 a night.",
  sea:
    "Sea rooms — four rooms upstairs, facing west over the orchard to the sea. 34 m². From €320 a night.",
  prices:
    "Prices include breakfast and taxes, for two people. The rate rises in July and August; the booking engine shows exact prices for your dates.",
  offer:
    "Book any stay of three nights or more between 15 May and 30 June 2027 and we take 15% off. No code — the booking engine applies it. We will also leave a bottle of our neighbour's wine in your room, because you are among the first.",
  morning:
    "Morning. Breakfast is from the orchard and the village: figs, yoghurt from Filoti, honey from the hives behind the pool, bread from Katerina in Vivlos, eggs when the hens agree. Served in the courtyard until 11.",
  afternoon:
    "Afternoon. The pool, the beach, or the shade. We have bicycles, snorkels and a box of paperbacks.",
  evening:
    "Evening. Tuesday, Thursday and Saturday, Markos cooks one menu for whoever wants to eat, at one long table on the terrace, from eight. €45 a head with wine. Book at breakfast.",
  directions:
    "Fly to Athens, then a 40-minute flight or a 4–5 hour ferry to Naxos. We are 15 minutes from the port and 10 from the airport; we will collect you for €30, or you can rent a car at the port. From Naxos town, the road to Plaka.",
  waitlist:
    "Not ready to book? Leave your email and we will write twice: when the last summer rooms are released, and when the restaurant opens to non-residents.",
  contact:
    "Eleni and Markos Petrou · hello@ninecypresses.example · +30 22850 00000 · Plaka, Naxos 843 00, Greece",
};

export const photos = {
  house: {
    file: "house-morning.jpg",
    url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    width: 1600,
    height: 1600,
    alt: "White rendered house and covered entrance, with a young tree on the lawn beneath a clear blue sky.",
  },
  dusk: {
    file: "pool-dusk.jpg",
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    width: 1600,
    height: 1067,
    alt: "Palms and lantern-lit buildings reflected in still pool water beneath a pink-violet dusk sky.",
  },
  pool: {
    file: "pool-noon.jpg",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    width: 1600,
    height: 1067,
    alt: "White pool pavilion with open glass doors, a pale stone terrace and turquoise water at noon.",
  },
  courtyard: {
    file: "courtyard.jpg",
    url: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8",
    width: 1200,
    height: 1600,
    alt: "Palms and leafy planters around marble tables and green chairs on a patterned courtyard floor.",
  },
  room: {
    file: "room-evening.jpg",
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    width: 1600,
    height: 1067,
    alt: "Linen bed with blue cushions, a plywood headboard and a glowing glass bedside lamp.",
  },
  bath: {
    file: "bath.jpg",
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    width: 1600,
    height: 1067,
    alt: "Freestanding oval bath on white pebbles beside a grey rendered wall and a wooden towel ladder.",
  },
  terrace: {
    file: "terrace-evening.jpg",
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    width: 1600,
    height: 1200,
    alt: "Dinner tables beneath a canvas pergola with white curtains, overlooking the bay at sunset.",
  },
  breakfast: {
    file: "breakfast.jpg",
    url: "https://images.unsplash.com/photo-1493770348161-369560ae357d",
    width: 1600,
    height: 1067,
    alt: "Breakfast bowls of yoghurt and fruit, waffles, honey and coffee on a white marble table.",
  },
  village: {
    file: "village-lane.jpg",
    url: "https://images.unsplash.com/photo-1601581875039-e899893d520c",
    width: 1600,
    height: 1200,
    alt: "Whitewashed village lane with blue doors, café tables and pink-and-white bougainvillea.",
  },
} as const;

export type PhotoName = keyof typeof photos;
