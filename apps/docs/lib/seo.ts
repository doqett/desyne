import type { Metadata } from "next";
import { gitConfig } from "./shared";

/**
 * SEO constants and helpers. Canonical URLs always point at production, so
 * preview deployments and local dev never compete with desyne.dev.
 * Override the origin with NEXT_PUBLIC_SITE_URL (e.g. for a staging domain).
 */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://desyne.dev"
).replace(/\/+$/, "");

export const siteName = "Desyne";

/** Only the production deployment is indexable. Previews and dev are not. */
export const isIndexable =
  (process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV) ===
  "production";

export const homeTitle =
  "Desyne — Accessible React Aria components for Tailwind v4";

export const homeDescription =
  "Accessible React components built on React Aria and Tailwind v4. Install them with the shadcn CLI, theme them with CSS variables and own every line.";

export const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export const organization = {
  "@type": "Organization",
  "@id": "https://desyne.dev/#organization",
  name: "Desyne",
  legalName: "Maithra Digital Pvt. Ltd.",
  url: "https://desyne.dev",
  logo: "https://desyne.dev/apple-icon.png",
  sameAs: [repoUrl],
} as const;

export const absoluteUrl = (path: string) =>
  path === "/" ? siteOrigin : `${siteOrigin}${path}`;

const strip = (text: string) =>
  text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Cuts copy to `max` characters at the last sentence or clause boundary
 * (" — ", "; ", ": ") that keeps at least 80 characters, else at a word.
 */
function shorten(text: string, max: number) {
  let best = "";
  const boundary = /[.!?](?=\s)|\s[—–]\s|;\s|:\s/g;
  for (const m of text.matchAll(boundary)) {
    const end = m.index + (m[0].startsWith(" ") ? 0 : 1);
    const cut = `${text.slice(0, end).replace(/[.!?,;:]$/, "")}.`;
    if (cut.length > max) break;
    best = cut;
  }
  if (best.length >= 80) return best;
  const words = text.slice(0, max - 1).split(" ");
  words.pop();
  return `${words.join(" ").replace(/[,;:—–-]+$/, "")}…`;
}

/**
 * Fits a description into the 140–160 character range search engines show:
 * long copy is cut at a sentence (or word) boundary, short copy gets the
 * longest supporting sentence from `extras` that still fits.
 */
export function metaDescription(
  text: string | undefined,
  extras: string[] = [],
  { min = 140, max = 160 } = {},
): string {
  let out = strip(text ?? "");
  if (out.length > max) out = shorten(out, max);
  if (out.length < min && !out.endsWith("…")) {
    const fits = extras
      .map((e) => `${out}${out ? " " : ""}${e}`.trim())
      .filter((c) => c.length <= max)
      .sort((a, b) => b.length - a.length);
    if (fits[0]) out = fits[0];
  }
  return out;
}

/** Title, description, canonical, Open Graph and Twitter in one place. */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image,
  type = "website",
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  /** Leave unset to inherit the nearest `opengraph-image` file. */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const ogTitle = absoluteTitle ?? `${title} · ${siteName}`;
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(images && { images }),
    },
  };
}
