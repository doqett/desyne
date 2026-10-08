/**
 * Small oklch ↔ sRGB helpers for the theme builder: hex for the color picker,
 * WCAG contrast for the readout. Accepts the `oklch(L C H)` strings design.ts emits.
 */
import { parseOklch } from "@/lib/design";

type Rgb = [number, number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** oklch → linear sRGB (unclamped). */
function oklchToLinear(l: number, c: number, h: number): Rgb {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const toGamma = (x: number) =>
  x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
const toLinear = (x: number) =>
  x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;

/** Relative luminance of an opaque `oklch()` color, or null if unparseable. */
export function luminance(color: string): number | null {
  const v = parseOklch(color);
  if (!v) return null;
  const [r, g, b] = oklchToLinear(v.l, v.c, v.h).map(clamp01);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2 contrast ratio between two opaque colors. */
export function contrast(fg: string, bg: string): number | null {
  const a = luminance(fg);
  const b = luminance(bg);
  if (a === null || b === null) return null;
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

export function oklchToHex(color: string): string {
  const v = parseOklch(color);
  if (!v) return "#6366f1";
  return `#${oklchToLinear(v.l, v.c, v.h)
    .map((x) =>
      Math.round(clamp01(toGamma(clamp01(x))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

export function hexToOklch(hex: string): string | null {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim());
  if (!m) return null;
  const [r, g, b] = m
    .slice(1)
    .map((x) => toLinear(Number.parseInt(x, 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const mm = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * mm - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s;
  const C = Math.sqrt(A * A + B * B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  const r3 = (n: number) => Number(n.toFixed(3));
  return `oklch(${r3(Math.min(1, L))} ${r3(Math.min(0.37, C))} ${C < 0.002 ? 0 : Number(H.toFixed(1))})`;
}
