/**
 * Sanity checks for lib/design.ts. Run: bun packages/ui/scripts/check-design.ts
 *  1. defaultDesign reproduces theme.css exactly (:root and .dark).
 *  2. encode/decode round-trips; bad input falls back to the default.
 *  3. every style × base × brand (× density × font) yields every required key.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  type BaseId,
  type BrandId,
  baseColorKeys,
  bases,
  brands,
  type Density,
  type Design,
  decodeDesign,
  defaultDesign,
  densities,
  densityKeys,
  designToCss,
  designToCssVars,
  encodeDesign,
  type FontId,
  fonts,
  parseOklch,
  type StyleId,
  structuralKeys,
  styles,
} from "../src/lib/design";

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`✗ ${msg}`);
};
const norm = (v: string) => v.replace(/\s+/g, " ").trim();

/* 1. default design === theme.css */
const css = readFileSync(
  fileURLToPath(new URL("../src/styles/theme.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

function collect(selector: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = new RegExp(
    `(^|\\n)${selector.replace(".", "\\.")}\\s*\\{([^}]*)\\}`,
    "g",
  );
  for (const [, , body] of css.matchAll(re))
    for (const [, k, v] of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g))
      out[k] = norm(v);
  return out;
}

const themeLight = collect(":root");
const themeDark = collect(".dark");
const vars = designToCssVars(defaultDesign);
/* Font tokens are additive: theme.css leaves fonts to the app (headings inherit). */
const optional = new Set(["font-heading"]);

for (const [mode, theme, ours] of [
  ["light", themeLight, vars.light],
  ["dark", themeDark, vars.dark],
] as const) {
  for (const [k, v] of Object.entries(theme)) {
    if (!(k in ours))
      fail(`${mode}: theme.css --${k} missing from defaultDesign`);
    else if (norm(ours[k]) !== v)
      fail(`${mode}: --${k} is "${ours[k]}", theme.css has "${v}"`);
  }
  for (const k of Object.keys(ours))
    if (!(k in theme) && !optional.has(k))
      fail(`${mode}: defaultDesign --${k} is not in theme.css`);
}

/* 2. encode / decode */
const samples: Design[] = [
  defaultDesign,
  {
    style: "soft",
    base: "slate",
    brand: "rose",
    radius: 1,
    density: "comfortable",
    font: "serif",
  },
  {
    style: "sharp",
    base: "neutral",
    brand: "oklch(0.62 0.19 145)",
    radius: 0,
    density: "compact",
    font: "mono",
  },
  {
    style: "bold",
    base: "mauve",
    brand: "contrast",
    radius: 0.375,
    density: "default",
    font: "plex",
  },
];
for (const d of samples) {
  const code = encodeDesign(d);
  if (!/^[\w.~-]+$/.test(code)) fail(`encoded design is not URL-safe: ${code}`);
  const back = decodeDesign(code);
  if (JSON.stringify(back) !== JSON.stringify(d))
    fail(`round-trip ${code} → ${JSON.stringify(back)}`);
}
for (const bad of [
  "",
  "garbage",
  "2~soft~zinc~indigo~1~default~inter",
  "1~x~y~z~NaN~q~w",
  "%E0%A4%A",
  "1~soft~zinc~oklch(9 9 9)~0.5~default~inter",
]) {
  const d = decodeDesign(bad);
  const ok = Object.entries(d).every(
    ([k, v]) => v !== undefined && v !== null && k,
  );
  if (!ok) fail(`decode(${bad}) produced ${JSON.stringify(d)}`);
}
const partial = decodeDesign("1~soft~nope~indigo~0.75~default~inter");
if (partial.style !== "soft" || partial.base !== defaultDesign.base)
  fail(`per-field fallback failed: ${JSON.stringify(partial)}`);

/* 3. completeness */
const colorKeys = [
  ...baseColorKeys,
  "brand",
  "brand-foreground",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar-ring",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
];
const lightKeys = [
  "radius",
  ...colorKeys,
  ...structuralKeys,
  ...densityKeys,
  "font-heading",
];
let combos = 0;
for (const style of Object.keys(styles) as StyleId[])
  for (const base of Object.keys(bases) as BaseId[])
    for (const brand of [
      ...(Object.keys(brands) as BrandId[]),
      "oklch(0.7 0.15 150)",
    ])
      for (const density of Object.keys(densities) as Density[])
        for (const font of Object.keys(fonts) as FontId[]) {
          combos++;
          const v = designToCssVars({
            style,
            base,
            brand,
            density,
            font,
            radius: 0.5,
          });
          const id = `${style}/${base}/${brand}/${density}/${font}`;
          for (const k of lightKeys)
            if (!v.light[k]) fail(`${id}: light --${k} missing`);
          for (const k of colorKeys)
            if (!v.dark[k]) fail(`${id}: dark --${k} missing`);
          if (!v.theme["font-sans"]) fail(`${id}: theme font-sans missing`);
          for (const [k, val] of [
            ...Object.entries(v.light),
            ...Object.entries(v.dark),
          ]) {
            if (/undefined|NaN|null/.test(val)) fail(`${id}: --${k} = ${val}`);
            if (val.startsWith("oklch(") && !parseOklch(val))
              fail(`${id}: --${k} bad color ${val}`);
            if (/shadow/.test(k) && /(^|,)\s*none\b/.test(val))
              fail(`${id}: --${k} uses none`);
          }
        }

if (!designToCss(defaultDesign).includes(":root {"))
  fail("designToCss has no :root");
if (
  !designToCss(defaultDesign, { scope: "[data-x]" }).includes(".dark [data-x]")
)
  fail("scoped designToCss has no dark block");

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log(
  `✓ design: default matches theme.css (${Object.keys(themeLight).length} light + ${Object.keys(themeDark).length} dark vars), ${samples.length} round-trips, ${combos} combinations complete`,
);
