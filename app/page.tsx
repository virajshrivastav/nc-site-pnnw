import { BookingLink } from "@/components/booking-link";
import { Mark } from "@/components/mark";
import { Photo } from "@/components/photo";
import { WaitlistForm } from "@/components/waitlist-form";
import { copy, photos, site } from "@/lib/content";
import { resolveWaitlistEndpoint } from "@/lib/waitlist.mjs";

function RoomDescription({ text }: { text: string }) {
  const [name, details] = text.split(" — ");
  const [description, rate] = details.split(" From ");
  return (
    <p className="room-description" data-copy>
      <strong className="room-name">{name}</strong>
      {" — "}<span>{description}</span>{" "}
      <span className="room-rate">From {rate}</span>
    </p>
  );
}

function DayDescription({ text }: { text: string }) {
  const separator = text.indexOf(".");
  return (
    <p className="day-description" data-copy>
      <strong className="day-name">{text.slice(0, separator + 1)}</strong>{" "}
      {text.slice(separator + 2)}
    </p>
  );
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel`,
    name: site.name,
    description: copy.introduction,
    url: `${site.url}/`,
    image: [photos.house.url, photos.room.url, photos.courtyard.url],
    telephone: site.phone,
    email: site.email,
    numberOfRooms: 12,
    priceRange: "From €240 a night.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaka",
      addressLocality: "Naxos",
      postalCode: "843 00",
      addressCountry: "GR",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="identity" href="#top" aria-label="Nine Cypresses — back to top">
            <Mark className="header-mark" />
            <span>Nine Cypresses</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#place">The place</a>
            <a href="#rooms">The rooms</a>
            <a href="#day">The day</a>
          </nav>
          <BookingLink className="header-booking" />
        </div>
      </header>

      <main id="main">
        <section className="hero page-width" id="top" aria-labelledby="opening">
          <div className="hero-copy">
            <h1 id="opening" data-copy>
              <span>Twelve rooms,</span>{" "}
              <span>nine cypresses,</span>{" "}
              <em>one beach.</em>
            </h1>
            <p className="hero-introduction" data-copy>{copy.introduction}</p>
            <div className="hero-actions">
              <BookingLink />
              <a className="text-link" href="#waitlist">
                Join the waitlist <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Photo name="house" className="hero-house" sizes="(max-width: 760px) 88vw, (max-width: 1100px) 46vw, 42vw" priority />
            <Photo name="dusk" className="hero-inset" sizes="(max-width: 760px) 40vw, 19vw" />
          </div>
          <a className="hero-next" href="#place">
            <span>The place</span><span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="place-section page-width section-space" id="place" aria-labelledby="place-title">
          <div className="place-copy">
            <h2 className="eyebrow" id="place-title">The place</h2>
            <p className="place-story" data-copy>{copy.place}</p>
            <Mark className="place-mark" />
          </div>
          <Photo name="courtyard" className="place-photo" sizes="(max-width: 760px) 82vw, 35vw" />
        </section>

        <section className="rooms-section page-width section-space" id="rooms" aria-labelledby="rooms-title">
          <div className="section-heading">
            <h2 id="rooms-title">The rooms</h2>
            <p data-copy>{copy.rooms}</p>
          </div>
          <div className="rooms-gallery" aria-label="Room and bath photographs">
            <Photo name="room" className="room-photo" sizes="(max-width: 760px) 90vw, 55vw" />
            <Photo name="bath" className="bath-photo" sizes="(max-width: 760px) 60vw, 33vw" />
          </div>
          <div className="room-options">
            <div><RoomDescription text={copy.courtyard} /></div>
            <div><RoomDescription text={copy.sea} /></div>
          </div>
          <div className="rooms-bottom">
            <p className="price-note" data-copy>{copy.prices}</p>
            <BookingLink />
          </div>
        </section>

        <section className="offer-section" aria-labelledby="offer-title">
          <div className="offer-inner page-width">
            <Mark className="offer-mark" />
            <div>
              <h2 id="offer-title">Opening offer</h2>
              <p data-copy>{copy.offer}</p>
            </div>
            <BookingLink light />
          </div>
        </section>

        <section className="day-section page-width section-space" id="day" aria-labelledby="day-title">
          <h2 id="day-title">The day</h2>
          <div className="day-grid">
            <article>
              <Photo name="breakfast" className="day-photo" sizes="(max-width: 760px) 90vw, 28vw" />
              <DayDescription text={copy.morning} />
            </article>
            <article className="afternoon">
              <Photo name="pool" className="day-photo" sizes="(max-width: 760px) 90vw, 28vw" />
              <DayDescription text={copy.afternoon} />
            </article>
            <article>
              <Photo name="terrace" className="day-photo" sizes="(max-width: 760px) 90vw, 28vw" />
              <DayDescription text={copy.evening} />
            </article>
          </div>
        </section>

        <section className="directions-section page-width section-space" id="getting-here" aria-labelledby="directions-title">
          <Photo name="village" className="village-photo" sizes="(max-width: 760px) 82vw, 40vw" />
          <div className="directions-copy">
            <h2 id="directions-title">Getting here</h2>
            <p data-copy>{copy.directions}</p>
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <div className="closing">
          <section className="waitlist-section page-width" id="waitlist" aria-labelledby="waitlist-title">
            <div>
              <p className="eyebrow">Waitlist</p>
              <div data-copy>
                <h2 id="waitlist-title">Not ready to book?</h2>{" "}
                <p className="waitlist-description">{copy.waitlist.slice("Not ready to book? ".length)}</p>
              </div>
            </div>
            <WaitlistForm configured={Boolean(resolveWaitlistEndpoint(process.env.WAITLIST_ENDPOINT))} />
          </section>
          <footer className="site-footer page-width">
            <div className="footer-top">
              <a className="footer-identity" href="#top" aria-label="Nine Cypresses — back to top">
                <Mark />
                <span>Nine Cypresses</span>
              </a>
              <div className="contact">
                <h2 className="eyebrow">Contact</h2>
                <address data-copy>
                  <span>Eleni and Markos Petrou</span>{" · "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>{" · "}
                  <a href={`tel:${site.telephone}`}>{site.phone}</a>{" · "}
                  <span>Plaka, Naxos 843 00, Greece</span>
                </address>
              </div>
              <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
