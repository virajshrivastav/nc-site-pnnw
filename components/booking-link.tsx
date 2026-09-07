import { site } from "@/lib/content";

export function BookingLink({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-blue"} ${className}`}
      href={site.booking}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book your stay (opens in a new tab)"
    >
      <span>Book your stay</span>
      <span className="arrow" aria-hidden="true">↗</span>
    </a>
  );
}
