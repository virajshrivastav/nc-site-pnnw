import { photos, type PhotoName } from "@/lib/content";

export function Photo({
  name,
  className = "",
  sizes,
  priority = false,
}: {
  name: PhotoName;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const photo = photos[name];
  const widths = [360, 540, 720, 960, 1280, 1600, 2000];
  return (
    <div className={`photo ${className}`} data-photo={photo.file}>
      {/* Direct client URLs are deliberate; no proxy or replacement photography. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${photo.url}?w=960&q=80`}
        srcSet={widths.map((width) => `${photo.url}?w=${width}&q=80 ${width}w`).join(", ")}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
