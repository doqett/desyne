import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Inter,
  Source_Serif_4,
} from "next/font/google";

/*
 * Web fonts for the design engine's font presets (`fonts` in `@/lib/design`).
 * Inter is the site font (preloaded); the rest load only when a design uses them.
 * Each exposes a CSS variable on <html> (see `designFontVariables`), e.g.
 * `var(--ds-font-geist)`, for pages that want to reference them directly.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--ds-font-inter",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--ds-font-geist",
  preload: false,
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--ds-font-geist-mono",
  preload: false,
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ds-font-plex",
  preload: false,
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--ds-font-source-serif",
  preload: false,
});

/** Class names that define every `--ds-font-*` variable; put them on <html>. */
export const designFontVariables = [
  inter.variable,
  geist.variable,
  geistMono.variable,
  plex.variable,
  sourceSerif.variable,
].join(" ");

/**
 * design.ts writes family names (`"Geist"`); next/font self-hosts them under
 * generated names. Swap each known family for the generated one.
 */
const families: [string, string][] = [
  ['"Inter"', inter.style.fontFamily],
  ['"Geist"', geist.style.fontFamily],
  ['"Geist Mono"', geistMono.style.fontFamily],
  ['"IBM Plex Sans"', plex.style.fontFamily],
  ['"Source Serif 4"', sourceSerif.style.fontFamily],
];

export function resolveFontStack(stack: string): string {
  let out = stack;
  for (const [name, actual] of families) out = out.split(name).join(actual);
  return out;
}
