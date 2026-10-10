import localFont from "next/font/local";

/*
 * Web fonts for the design engine's font presets (`fonts` in `@/lib/design`).
 * Self-hosted variable fonts (latin subset, SIL OFL) in `assets/fonts`, so
 * builds never depend on Google Fonts. Inter is the site font (preloaded);
 * the rest load only when a design uses them. Each exposes a CSS variable on
 * <html> (see `designFontVariables`), e.g. `var(--ds-font-geist)`.
 */
export const inter = localFont({
  src: "../assets/fonts/inter.woff2",
  weight: "100 900",
  variable: "--ds-font-inter",
});
const geist = localFont({
  src: "../assets/fonts/geist.woff2",
  weight: "100 900",
  variable: "--ds-font-geist",
  preload: false,
});
const geistMono = localFont({
  src: "../assets/fonts/geist-mono.woff2",
  weight: "100 900",
  variable: "--ds-font-geist-mono",
  preload: false,
});
const plex = localFont({
  src: "../assets/fonts/ibm-plex-sans.woff2",
  weight: "100 700",
  variable: "--ds-font-plex",
  preload: false,
});
const sourceSerif = localFont({
  src: "../assets/fonts/source-serif-4.woff2",
  weight: "200 900",
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
