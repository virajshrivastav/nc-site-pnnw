import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { copy, photos, site } from "@/lib/content";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../public/fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "../public/fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = localFont({
  src: "../public/fonts/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Nine Cypresses — Plaka, Naxos",
  description: copy.introduction,
  alternates: { canonical: "/" },
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name} — ${copy.opening}`,
    description: copy.introduction,
    url: site.url,
    images: [{ url: `${photos.house.url}?w=1200&q=85`, width: 1200, height: 1200, alt: photos.house.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${copy.opening}`,
    description: copy.introduction,
    images: [`${photos.house.url}?w=1200&q=85`],
  },
};

export const viewport: Viewport = { themeColor: "#F3EFE6", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
