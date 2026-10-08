/*
 * Desyne design engine: style × base × brand × radius × density × font → CSS variables.
 *
 * A *style* is a preset of structural tokens (radius levels, border width, field chrome,
 * shadows, focus ring, type) plus defaults for radius/density/font and small color tweaks.
 * Components read only tokens, so one component source renders every style.
 *
 * Framework-agnostic (no React, no DOM at import time): safe in server code, scripts and
 * the browser. `designToCssVars` returns the shape shadcn's `registry:theme` `cssVars` uses.
 */

export type StyleId = "default" | "soft" | "sharp" | "bold";
export type BaseId = "zinc" | "neutral" | "slate" | "stone" | "olive" | "mauve";
export type BrandId =
  | "indigo"
  | "blue"
  | "violet"
  | "rose"
  | "orange"
  | "amber"
  | "emerald"
  | "teal"
  | "sky"
  | "contrast";
export type Density = "compact" | "default" | "comfortable";
export type FontId = "inter" | "geist" | "system" | "plex" | "serif" | "mono";
export type Mode = "light" | "dark";

export interface Design {
  style: StyleId;
  base: BaseId;
  /** A preset id, or a custom color as `oklch(L C H)` (L 0–1, C, H degrees). */
  brand: BrandId | (string & {});
  /** Base radius in rem (`--radius`). The style turns it into control/box/overlay radii. */
  radius: number;
  density: Density;
  font: FontId;
}

/** CSS variable maps, keys without the leading `--` (shadcn `cssVars` shape). */
export type VarMap = Record<string, string>;
export interface DesignCssVars {
  /** Tailwind `@theme inline` entries (fonts). */
  theme: VarMap;
  /** `:root` — every token. */
  light: VarMap;
  /** `.dark` — color tokens plus the structural tokens that differ in dark mode. */
  dark: VarMap;
}

export const designStorageKey = "ds-design";

/* ------------------------------------------------------------------ */
/* Color helpers (oklch strings)                                       */
/* ------------------------------------------------------------------ */

interface Oklch {
  l: number;
  c: number;
  h: number;
  /** Alpha as written (`8%`, `0.5`), if any. */
  a?: string;
}

const OKLCH_RE =
  /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/i;

export function parseOklch(value: string): Oklch | null {
  const m = OKLCH_RE.exec(value.trim());
  if (!m) return null;
  const l = Number(m[1]) / (m[2] ? 100 : 1);
  const c = Number(m[3]);
  const h = Number(m[4]);
  if (![l, c, h].every(Number.isFinite) || l < 0 || l > 1 || c < 0 || c > 0.5)
    return null;
  return { l, c, h: ((h % 360) + 360) % 360, a: m[5] };
}

const round = (n: number, d: number) => Number(n.toFixed(d));

export function formatOklch({ l, c, h, a }: Oklch): string {
  const body = `${round(l, 3)} ${round(c, 3)} ${round(h, 2)}`;
  return a ? `oklch(${body} / ${a})` : `oklch(${body})`;
}

function scaleAlpha(a: string, f: number): string {
  if (a.endsWith("%"))
    return `${round(Math.min(100, Number.parseFloat(a) * f), 1)}%`;
  return `${round(Math.min(1, Number(a) * f), 3)}`;
}

/* ------------------------------------------------------------------ */
/* Bases (neutral palettes)                                            */
/* ------------------------------------------------------------------ */

/** Neutral tokens a base defines (everything except brand, status and charts 2–5). */
export const baseColorKeys = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
] as const;

type BaseColors = Record<(typeof baseColorKeys)[number], string>;

/** Today's palette (cool zinc, hue 286): the template every other base is derived from. */
const zincLight: BaseColors = {
  background: "oklch(0.984 0.002 286)",
  foreground: "oklch(0.205 0.006 286)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.205 0.006 286)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.205 0.006 286)",
  primary: "oklch(0.215 0.006 286)",
  "primary-foreground": "oklch(0.985 0 0)",
  secondary: "oklch(0.967 0.002 286)",
  "secondary-foreground": "oklch(0.25 0.006 286)",
  muted: "oklch(0.967 0.002 286)",
  "muted-foreground": "oklch(0.54 0.012 286)",
  accent: "oklch(0.955 0.003 286)",
  "accent-foreground": "oklch(0.205 0.006 286)",
  border: "oklch(0.925 0.003 286)",
  input: "oklch(0.895 0.004 286)",
  sidebar: "oklch(0.975 0.002 286)",
  "sidebar-foreground": "oklch(0.205 0.006 286)",
  "sidebar-primary": "oklch(0.215 0.006 286)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(1 0 0)",
  "sidebar-accent-foreground": "oklch(0.205 0.006 286)",
  "sidebar-border": "oklch(0.925 0.003 286)",
};

const zincDark: BaseColors = {
  background: "oklch(0.145 0.004 286)",
  foreground: "oklch(0.97 0.002 286)",
  card: "oklch(0.185 0.005 286)",
  "card-foreground": "oklch(0.97 0.002 286)",
  popover: "oklch(0.205 0.006 286)",
  "popover-foreground": "oklch(0.97 0.002 286)",
  primary: "oklch(0.965 0.002 286)",
  "primary-foreground": "oklch(0.2 0.006 286)",
  secondary: "oklch(0.235 0.006 286)",
  "secondary-foreground": "oklch(0.95 0.002 286)",
  muted: "oklch(0.225 0.006 286)",
  "muted-foreground": "oklch(0.7 0.012 286)",
  accent: "oklch(0.255 0.006 286)",
  "accent-foreground": "oklch(0.97 0.002 286)",
  border: "oklch(1 0 0 / 8%)",
  input: "oklch(1 0 0 / 13%)",
  sidebar: "oklch(0.165 0.005 286)",
  "sidebar-foreground": "oklch(0.97 0.002 286)",
  "sidebar-primary": "oklch(0.965 0.002 286)",
  "sidebar-primary-foreground": "oklch(0.2 0.006 286)",
  "sidebar-accent": "oklch(0.225 0.006 286)",
  "sidebar-accent-foreground": "oklch(0.97 0.002 286)",
  "sidebar-border": "oklch(1 0 0 / 8%)",
};

export interface BasePreset {
  id: BaseId;
  label: string;
  /** Swatch for pickers (light-mode muted-foreground). */
  swatch: string;
  light: BaseColors;
  dark: BaseColors;
}

/** Re-tint the zinc template: same lightness ladder, new hue, chroma × `scale`. */
function tint(colors: BaseColors, hue: number, scale: number): BaseColors {
  const out = {} as BaseColors;
  for (const key of baseColorKeys) {
    const v = parseOklch(colors[key]);
    out[key] =
      v && v.c > 0
        ? formatOklch({ ...v, c: v.c * scale, h: scale ? hue : 0 })
        : colors[key];
  }
  return out;
}

function makeBase(
  id: BaseId,
  label: string,
  hue: number,
  scale: number,
): BasePreset {
  const light = id === "zinc" ? zincLight : tint(zincLight, hue, scale);
  const dark = id === "zinc" ? zincDark : tint(zincDark, hue, scale);
  return { id, label, swatch: light["muted-foreground"], light, dark };
}

export const bases: Record<BaseId, BasePreset> = {
  zinc: makeBase("zinc", "Zinc", 286, 1),
  neutral: makeBase("neutral", "Neutral", 0, 0),
  slate: makeBase("slate", "Slate", 257, 3),
  stone: makeBase("stone", "Stone", 56, 1),
  olive: makeBase("olive", "Olive", 115, 1.8),
  mauve: makeBase("mauve", "Mauve", 322, 1.8),
};

/* ------------------------------------------------------------------ */
/* Brands                                                              */
/* ------------------------------------------------------------------ */

export interface BrandColors {
  brand: string;
  "brand-foreground": string;
}

export interface BrandPreset {
  id: BrandId;
  label: string;
  /** `null` for `contrast`, which uses the base's primary (ink in light, white in dark). */
  light: BrandColors | null;
  dark: BrandColors | null;
}

/** Approximate WCAG contrast between two OKLCH lightnesses (luminance ≈ L³). */
function contrastFromL(a: number, b: number): number {
  const ya = a ** 3;
  const yb = b ** 3;
  return (Math.max(ya, yb) + 0.05) / (Math.min(ya, yb) + 0.05);
}

/**
 * Foreground for a brand fill: whichever of near-white or a deep tint of the
 * brand gives more contrast (so mid-lightness brands in dark mode get dark text).
 */
export function brandForeground(color: string): string {
  const v = parseOklch(color);
  if (!v) return "oklch(0.99 0 0)";
  const light = 0.99;
  const dark = 0.22;
  return contrastFromL(v.l, light) >= contrastFromL(v.l, dark)
    ? formatOklch({ l: light, c: 0.005, h: v.h })
    : formatOklch({ l: dark, c: Math.min(v.c, 0.06), h: v.h });
}

/** Dark-mode variant of a light brand color: lighter, slightly less chroma. */
export function brandDark(color: string): string {
  const v = parseOklch(color);
  if (!v) return color;
  const l = v.l < 0.7 ? Math.min(0.78, v.l + 0.13) : Math.min(0.85, v.l + 0.03);
  return formatOklch({ l, c: v.c * 0.86, h: v.h });
}

function brand(
  id: BrandId,
  label: string,
  light: string,
  dark: string,
  fg?: { light?: string; dark?: string },
): BrandPreset {
  return {
    id,
    label,
    light: {
      brand: light,
      "brand-foreground": fg?.light ?? brandForeground(light),
    },
    dark: {
      brand: dark,
      "brand-foreground": fg?.dark ?? brandForeground(dark),
    },
  };
}

export const brands: Record<BrandId, BrandPreset> = {
  indigo: brand(
    "indigo",
    "Indigo",
    "oklch(0.54 0.21 277)",
    "oklch(0.67 0.18 277)",
    // Dark mode takes the computed deep-indigo text: white on the lighter
    // dark-mode indigo is only ~3:1, below WCAG AA for small text.
    { light: "oklch(0.99 0.005 277)" },
  ),
  blue: brand("blue", "Blue", "oklch(0.55 0.2 260)", "oklch(0.67 0.17 257)"),
  violet: brand(
    "violet",
    "Violet",
    "oklch(0.54 0.23 293)",
    "oklch(0.68 0.19 293)",
  ),
  rose: brand("rose", "Rose", "oklch(0.58 0.22 16)", "oklch(0.68 0.19 14)"),
  orange: brand(
    "orange",
    "Orange",
    "oklch(0.62 0.19 42)",
    "oklch(0.69 0.17 45)",
  ),
  amber: brand("amber", "Amber", "oklch(0.77 0.16 70)", "oklch(0.8 0.15 75)", {
    light: "oklch(0.25 0.06 70)",
    dark: "oklch(0.25 0.06 70)",
  }),
  emerald: brand(
    "emerald",
    "Emerald",
    "oklch(0.58 0.14 163)",
    "oklch(0.72 0.15 163)",
  ),
  teal: brand("teal", "Teal", "oklch(0.58 0.1 186)", "oklch(0.72 0.12 186)"),
  sky: brand("sky", "Sky", "oklch(0.59 0.14 237)", "oklch(0.72 0.13 233)"),
  contrast: { id: "contrast", label: "Contrast", light: null, dark: null },
};

/** Resolve a preset id or custom `oklch()` to light/dark brand colors for a base. */
export function resolveBrand(
  value: string,
  base: BasePreset,
): Record<Mode, BrandColors> {
  const preset = brands[value as BrandId];
  if (preset) {
    return {
      light: preset.light ?? {
        brand: base.light.primary,
        "brand-foreground": base.light["primary-foreground"],
      },
      dark: preset.dark ?? {
        brand: base.dark.primary,
        "brand-foreground": base.dark["primary-foreground"],
      },
    };
  }
  const v = parseOklch(value);
  if (!v || v.a) return resolveBrand("indigo", base);
  const light = formatOklch(v);
  const dark = brandDark(light);
  return {
    light: { brand: light, "brand-foreground": brandForeground(light) },
    dark: { brand: dark, "brand-foreground": brandForeground(dark) },
  };
}

/** Status + chart colors shared by every base (chart-1 follows the brand). */
const fixedLight: VarMap = {
  destructive: "oklch(0.585 0.22 25)",
  "destructive-foreground": "oklch(0.99 0 0)",
  success: "oklch(0.62 0.16 150)",
  "success-foreground": "oklch(0.99 0 0)",
  warning: "oklch(0.76 0.16 70)",
  "warning-foreground": "oklch(0.25 0.06 70)",
  info: "oklch(0.6 0.16 240)",
  "info-foreground": "oklch(0.99 0 0)",
  "chart-2": "oklch(0.7 0.13 185)",
  "chart-3": "oklch(0.78 0.15 75)",
  "chart-4": "oklch(0.65 0.2 350)",
  "chart-5": "oklch(0.7 0.12 235)",
};

const fixedDark: VarMap = {
  destructive: "oklch(0.66 0.2 22)",
  "destructive-foreground": "oklch(0.99 0 0)",
  success: "oklch(0.72 0.15 150)",
  "success-foreground": "oklch(0.2 0.05 150)",
  warning: "oklch(0.8 0.15 75)",
  "warning-foreground": "oklch(0.25 0.06 70)",
  info: "oklch(0.7 0.14 240)",
  "info-foreground": "oklch(0.2 0.05 240)",
  "chart-2": "oklch(0.74 0.12 185)",
  "chart-3": "oklch(0.8 0.14 75)",
  "chart-4": "oklch(0.7 0.18 350)",
  "chart-5": "oklch(0.74 0.12 235)",
};

/* ------------------------------------------------------------------ */
/* Fonts (stacks only: loading the files is the app's job)             */
/* ------------------------------------------------------------------ */

export interface FontPreset {
  id: FontId;
  label: string;
  /** Body / UI stack (`--font-sans`). */
  sans: string;
  /** Heading stack (`--font-heading`); defaults to `sans`. */
  heading?: string;
  /** Overrides the style's `--heading-weight` (e.g. serif display faces look best lighter). */
  headingWeight?: number;
}

const systemStack =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const fonts: Record<FontId, FontPreset> = {
  inter: {
    id: "inter",
    label: "Inter",
    sans: `"Inter", "Inter Fallback", ${systemStack}`,
  },
  geist: {
    id: "geist",
    label: "Geist",
    sans: `"Geist", "Geist Fallback", ${systemStack}`,
  },
  system: { id: "system", label: "System", sans: systemStack },
  plex: {
    id: "plex",
    label: "IBM Plex Sans",
    sans: '"IBM Plex Sans", "Source Sans 3", "Segoe UI", Seravek, Ubuntu, Calibri, sans-serif',
  },
  serif: {
    id: "serif",
    label: "Serif headings",
    sans: `"Inter", "Inter Fallback", ${systemStack}`,
    heading:
      '"Source Serif 4", Charter, "Iowan Old Style", Georgia, "Times New Roman", serif',
    headingWeight: 600,
  },
  mono: {
    id: "mono",
    label: "Mono",
    sans: '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
};

/* ------------------------------------------------------------------ */
/* Styles (structural tokens)                                          */
/* ------------------------------------------------------------------ */

/** Every structural token a style defines (mode-independent part). */
export const structuralKeys = [
  "radius-control",
  "radius-box",
  "radius-overlay",
  "radius-badge",
  "radius-checkbox",
  "radius-pill",
  "border-width",
  "field-bg",
  "field-border",
  "field-shadow",
  "shadow-control",
  "shadow-solid",
  "shadow-box",
  "shadow-elevated",
  "shadow-overlay",
  "shadow-dialog",
  "ring-width",
  "heading-weight",
  "heading-tracking",
  "title-weight",
  "button-weight",
] as const;

export type StructuralKey = (typeof structuralKeys)[number];
export type StructuralTokens = Record<StructuralKey, string>;

/** Density tokens (set by `Design.density`). */
export const densityKeys = [
  "control-h-xs",
  "control-h-sm",
  "control-h-md",
  "control-h-lg",
  "control-px-xs",
  "control-px-sm",
  "control-px-md",
  "control-px-lg",
  "cell-px",
  "cell-py",
] as const;

export type DensityKey = (typeof densityKeys)[number];

export const densities: Record<Density, Record<DensityKey, string>> = {
  compact: {
    "control-h-xs": "1.375rem",
    "control-h-sm": "1.625rem",
    "control-h-md": "1.875rem",
    "control-h-lg": "2.25rem",
    "control-px-xs": "0.5rem",
    "control-px-sm": "0.5rem",
    "control-px-md": "0.625rem",
    "control-px-lg": "0.875rem",
    "cell-px": "0.625rem",
    "cell-py": "0.4375rem",
  },
  default: {
    "control-h-xs": "1.5rem",
    "control-h-sm": "1.75rem",
    "control-h-md": "2rem",
    "control-h-lg": "2.5rem",
    "control-px-xs": "0.5rem",
    "control-px-sm": "0.625rem",
    "control-px-md": "0.75rem",
    "control-px-lg": "1rem",
    "cell-px": "0.75rem",
    "cell-py": "0.625rem",
  },
  comfortable: {
    "control-h-xs": "1.625rem",
    "control-h-sm": "2rem",
    "control-h-md": "2.25rem",
    "control-h-lg": "2.75rem",
    "control-px-xs": "0.625rem",
    "control-px-sm": "0.75rem",
    "control-px-md": "0.875rem",
    "control-px-lg": "1.125rem",
    "cell-px": "1rem",
    "cell-py": "0.75rem",
  },
};

/** Lightness / alpha adjustments a style applies to the base's borders. */
interface BorderTweak {
  /** Added to light-mode lightness (negative = stronger). */
  light: number;
  /** Multiplies dark-mode alpha (> 1 = stronger). */
  dark: number;
}

export interface StylePreset {
  id: StyleId;
  label: string;
  description: string;
  defaults: Pick<Design, "radius" | "density" | "font">;
  /** Structural tokens; may reference `var(--radius)` and color tokens. */
  tokens: StructuralTokens;
  /** Structural tokens that differ in dark mode. */
  dark: Partial<StructuralTokens>;
  /** Border contrast tweaks (`border` + `sidebar-border`, and `input`). */
  borders?: { border: BorderTweak; input: BorderTweak };
}

const NONE = "0 0 #0000";

const defaultStyle: StylePreset = {
  id: "default",
  label: "Default",
  description: "Crisp hairlines, soft depth and medium radii.",
  defaults: { radius: 0.625, density: "default", font: "inter" },
  tokens: {
    "radius-control": "calc(var(--radius) - 2px)",
    "radius-box": "calc(var(--radius) + 4px)",
    "radius-overlay": "var(--radius)",
    "radius-badge": "calc(var(--radius) - 2px)",
    "radius-checkbox": "4px",
    "radius-pill": "calc(infinity * 1px)",
    "border-width": "1px",
    "field-bg": "var(--card)",
    "field-border": "var(--input)",
    "field-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "shadow-control": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "shadow-solid":
      "inset 0 1px 0 rgb(255 255 255 / 0.14), 0 1px 2px rgb(0 0 0 / 0.12)",
    "shadow-box": "0 1px 2px rgb(0 0 0 / 0.04)",
    "shadow-elevated":
      "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.08)",
    "shadow-overlay":
      "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
    "shadow-dialog": "0 25px 50px -12px rgb(0 0 0 / 0.1)",
    "ring-width": "3px",
    "heading-weight": "600",
    "heading-tracking": "-0.025em",
    "title-weight": "500",
    "button-weight": "500",
  },
  dark: {
    "field-bg": "color-mix(in oklab, var(--input) 20%, transparent)",
    "field-border": "var(--input)",
    "shadow-box": NONE,
    "shadow-elevated":
      "0 1px 2px rgb(0 0 0 / 0.3), 0 8px 24px -8px rgb(0 0 0 / 0.3)",
    "shadow-overlay":
      "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  },
};

export const styles: Record<StyleId, StylePreset> = {
  default: defaultStyle,
  soft: {
    id: "soft",
    label: "Soft",
    description: "Rounder shapes, filled fields, gentle diffused shadows.",
    defaults: { radius: 0.875, density: "default", font: "inter" },
    tokens: {
      "radius-control": "calc(var(--radius) - 2px)",
      "radius-box": "calc(var(--radius) + 6px)",
      "radius-overlay": "calc(var(--radius) + 2px)",
      "radius-badge": "calc(infinity * 1px)",
      "radius-checkbox": "calc(var(--radius) * 0.4)",
      "radius-pill": "calc(infinity * 1px)",
      "border-width": "1px",
      "field-bg": "var(--muted)",
      "field-border": "color-mix(in oklab, var(--input) 80%, transparent)",
      "field-shadow": NONE,
      "shadow-control": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
      "shadow-solid":
        "inset 0 1px 0 rgb(255 255 255 / 0.12), 0 1px 2px rgb(0 0 0 / 0.08), 0 4px 10px -4px rgb(0 0 0 / 0.2)",
      "shadow-box":
        "0 1px 2px rgb(0 0 0 / 0.03), 0 4px 16px -4px rgb(0 0 0 / 0.07)",
      "shadow-elevated":
        "0 2px 4px rgb(0 0 0 / 0.03), 0 16px 40px -12px rgb(0 0 0 / 0.16)",
      "shadow-overlay":
        "0 4px 12px -2px rgb(0 0 0 / 0.06), 0 16px 36px -8px rgb(0 0 0 / 0.14)",
      "shadow-dialog": "0 24px 64px -16px rgb(0 0 0 / 0.24)",
      "ring-width": "3px",
      "heading-weight": "600",
      "heading-tracking": "-0.02em",
      "title-weight": "500",
      "button-weight": "500",
    },
    dark: {
      "field-bg": "var(--muted)",
      "field-border": "color-mix(in oklab, var(--input) 75%, transparent)",
      "shadow-box": NONE,
      "shadow-elevated": "0 16px 40px -12px rgb(0 0 0 / 0.5)",
      "shadow-overlay":
        "0 4px 12px -2px rgb(0 0 0 / 0.3), 0 16px 36px -8px rgb(0 0 0 / 0.45)",
      "shadow-dialog": "0 24px 64px -16px rgb(0 0 0 / 0.6)",
    },
    borders: {
      border: { light: 0.012, dark: 0.85 },
      input: { light: 0.01, dark: 0.9 },
    },
  },
  sharp: {
    id: "sharp",
    label: "Sharp",
    description:
      "Square corners, hairline borders, dense controls, no shadows.",
    defaults: { radius: 0.25, density: "compact", font: "geist" },
    tokens: {
      "radius-control": "calc(var(--radius) * 0.5)",
      "radius-box": "var(--radius)",
      "radius-overlay": "var(--radius)",
      "radius-badge": "calc(var(--radius) * 0.5)",
      "radius-checkbox": "calc(var(--radius) * 0.5)",
      "radius-pill": "calc(var(--radius) * 0.5)",
      "border-width": "1px",
      "field-bg": "var(--card)",
      "field-border": "var(--input)",
      "field-shadow": NONE,
      "shadow-control": NONE,
      "shadow-solid": NONE,
      "shadow-box": NONE,
      "shadow-elevated": NONE,
      "shadow-overlay": NONE,
      "shadow-dialog": NONE,
      "ring-width": "2px",
      "heading-weight": "600",
      "heading-tracking": "-0.015em",
      "title-weight": "600",
      "button-weight": "500",
    },
    dark: {
      "field-bg": "transparent",
      "field-border": "var(--input)",
    },
    borders: {
      border: { light: -0.02, dark: 1.4 },
      input: { light: -0.04, dark: 1.3 },
    },
  },
  bold: {
    id: "bold",
    label: "Bold",
    description: "Thick borders, strong contrast, chunky controls, heavy type.",
    defaults: { radius: 0.5, density: "comfortable", font: "inter" },
    tokens: {
      "radius-control": "var(--radius)",
      "radius-box": "calc(var(--radius) + 4px)",
      "radius-overlay": "var(--radius)",
      "radius-badge": "calc(var(--radius) - 2px)",
      "radius-checkbox": "calc(var(--radius) * 0.625)",
      "radius-pill": "calc(infinity * 1px)",
      "border-width": "2px",
      "field-bg": "var(--card)",
      "field-border": "var(--input)",
      "field-shadow": NONE,
      "shadow-control": "0 2px 0 0 var(--input)",
      "shadow-solid":
        "inset 0 1px 0 rgb(255 255 255 / 0.16), inset 0 -2px 0 rgb(0 0 0 / 0.22)",
      "shadow-box": "0 3px 0 0 var(--border)",
      "shadow-elevated":
        "0 4px 0 0 var(--input), 0 16px 32px -12px rgb(0 0 0 / 0.18)",
      "shadow-overlay":
        "0 4px 0 0 var(--border), 0 18px 40px -12px rgb(0 0 0 / 0.22)",
      "shadow-dialog": "0 32px 64px -16px rgb(0 0 0 / 0.3)",
      "ring-width": "3px",
      "heading-weight": "700",
      "heading-tracking": "-0.03em",
      "title-weight": "600",
      "button-weight": "600",
    },
    dark: {
      "field-bg": "color-mix(in oklab, var(--input) 20%, transparent)",
      "field-border": "var(--input)",
      "shadow-overlay":
        "0 4px 0 0 var(--border), 0 18px 40px -12px rgb(0 0 0 / 0.5)",
      "shadow-dialog": "0 32px 64px -16px rgb(0 0 0 / 0.6)",
    },
    borders: {
      border: { light: -0.065, dark: 1.9 },
      input: { light: -0.13, dark: 1.9 },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Design → CSS variables                                              */
/* ------------------------------------------------------------------ */

export const defaultDesign: Design = {
  style: "default",
  base: "zinc",
  brand: "indigo",
  radius: 0.625,
  density: "default",
  font: "inter",
};

/** A design that starts from a style's own defaults (radius, density, font). */
export function designForStyle(
  style: StyleId,
  rest: Partial<Omit<Design, "style">> = {},
): Design {
  return { ...defaultDesign, ...styles[style].defaults, ...rest, style };
}

function tweakBorder(value: string, t: BorderTweak, mode: Mode): string {
  const v = parseOklch(value);
  if (!v) return value;
  if (mode === "dark" && v.a)
    return formatOklch({ ...v, a: scaleAlpha(v.a, t.dark) });
  if (mode === "light" && !v.a)
    return formatOklch({ ...v, l: Math.max(0, Math.min(1, v.l + t.light)) });
  return value;
}

function colorVars(design: Design, mode: Mode): VarMap {
  const base = bases[design.base] ?? bases.zinc;
  const style = styles[design.style] ?? styles.default;
  const colors: VarMap = { ...base[mode] };
  if (style.borders) {
    for (const key of ["border", "sidebar-border"] as const)
      colors[key] = tweakBorder(colors[key], style.borders.border, mode);
    colors.input = tweakBorder(colors.input, style.borders.input, mode);
  }
  const b = resolveBrand(design.brand, base)[mode];
  return {
    ...colors,
    brand: b.brand,
    "brand-foreground": b["brand-foreground"],
    ring: b.brand,
    "chart-1": b.brand,
    "sidebar-ring": b.brand,
    ...(mode === "light" ? fixedLight : fixedDark),
  };
}

const remString = (n: number) => `${round(n, 4)}rem`;

/** Structural tokens only (shape, density, type): what the components need besides colors. */
export function structuralCssVars(design: Design): {
  light: VarMap;
  dark: VarMap;
} {
  const style = styles[design.style] ?? styles.default;
  const font = fonts[design.font] ?? fonts.inter;
  const light: VarMap = {
    ...style.tokens,
    ...(densities[design.density] ?? densities.default),
  };
  if (font.headingWeight) light["heading-weight"] = String(font.headingWeight);
  // Tokens that read color variables are repeated in `.dark`, so they resolve against
  // the dark palette even when `.dark` sits below the element that declares them.
  const dark: VarMap = {};
  for (const [key, value] of Object.entries(light))
    if (/var\(--(?!radius)/.test(value)) dark[key] = value;
  return { light, dark: { ...dark, ...style.dark } };
}

/** All variables for a design, in shadcn `cssVars` shape (keys without `--`). */
export function designToCssVars(input: Partial<Design> = {}): DesignCssVars {
  const design = normalizeDesign(input);
  const font = fonts[design.font];
  const structural = structuralCssVars(design);
  return {
    theme: { "font-sans": font.sans },
    light: {
      radius: remString(design.radius),
      ...colorVars(design, "light"),
      ...structural.light,
      "font-heading": font.heading ?? font.sans,
    },
    dark: { ...colorVars(design, "dark"), ...structural.dark },
  };
}

function block(selector: string, vars: VarMap): string {
  const body = Object.entries(vars)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n");
  return `${selector} {\n${body}\n}`;
}

/**
 * The design as a stylesheet: `:root{…} .dark{…}`. Pass `scope` (any selector) to
 * theme a subtree instead, e.g. `designToCss(d, { scope: "[data-design]" })`; the dark
 * block then matches the scope inside `.dark` or carrying `.dark` itself.
 */
export function designToCss(
  input: Partial<Design> = {},
  options: { scope?: string } = {},
): string {
  const vars = designToCssVars(input);
  const scope = options.scope;
  const light = { ...vars.theme, ...vars.light };
  return scope
    ? `${block(scope, light)}\n${block(`.dark ${scope},\n${scope}.dark`, vars.dark)}\n`
    : `${block(":root", light)}\n${block(".dark", vars.dark)}\n`;
}

/* ------------------------------------------------------------------ */
/* Validation + URL encoding                                           */
/* ------------------------------------------------------------------ */

const isKey = <T extends string>(obj: Record<T, unknown>, v: unknown): v is T =>
  typeof v === "string" && Object.hasOwn(obj, v);

const densityIds: Density[] = ["compact", "default", "comfortable"];

/** Fill gaps and drop invalid values (each field falls back to the default). */
export function normalizeDesign(
  input: Partial<Design> | null | undefined,
): Design {
  const d = input ?? {};
  const brandOk =
    isKey(brands, d.brand) ||
    (typeof d.brand === "string" &&
      !!parseOklch(d.brand) &&
      !parseOklch(d.brand)?.a);
  const radius = Number(d.radius);
  return {
    style: isKey(styles, d.style) ? d.style : defaultDesign.style,
    base: isKey(bases, d.base) ? d.base : defaultDesign.base,
    brand: brandOk ? (d.brand as string) : defaultDesign.brand,
    radius:
      Number.isFinite(radius) && radius >= 0 && radius <= 2
        ? round(radius, 3)
        : defaultDesign.radius,
    density: densityIds.includes(d.density as Density)
      ? (d.density as Density)
      : defaultDesign.density,
    font: isKey(fonts, d.font) ? d.font : defaultDesign.font,
  };
}

const VERSION = "1";

/**
 * Short, URL-safe, human-readable: `1~soft~zinc~indigo~0.75~default~inter`.
 * A custom brand `oklch(0.6 0.2 30)` is written `o0.6_0.2_30`.
 */
export function encodeDesign(input: Partial<Design>): string {
  const d = normalizeDesign(input);
  let brand = d.brand;
  if (!isKey(brands, brand)) {
    const v = parseOklch(brand);
    brand = v
      ? `o${round(v.l, 3)}_${round(v.c, 3)}_${round(v.h, 2)}`
      : "indigo";
  }
  return [VERSION, d.style, d.base, brand, d.radius, d.density, d.font].join(
    "~",
  );
}

/** Inverse of `encodeDesign`. Never throws: bad input yields the default design. */
export function decodeDesign(value: string | null | undefined): Design {
  try {
    if (typeof value !== "string") return { ...defaultDesign };
    const parts = decodeURIComponent(value.trim()).split("~");
    if (parts.length !== 7 || parts[0] !== VERSION) return { ...defaultDesign };
    const [, style, base, rawBrand, radius, density, font] = parts;
    let brand = rawBrand;
    const m = /^o([\d.]+)_([\d.]+)_([\d.]+)$/.exec(rawBrand);
    if (m) brand = `oklch(${m[1]} ${m[2]} ${m[3]})`;
    return normalizeDesign({
      style: style as StyleId,
      base: base as BaseId,
      brand,
      radius: Number(radius),
      density: density as Density,
      font: font as FontId,
    });
  } catch {
    return { ...defaultDesign };
  }
}

/* ------------------------------------------------------------------ */
/* DOM helper                                                          */
/* ------------------------------------------------------------------ */

const applied = new WeakMap<HTMLElement, string[]>();

/**
 * Theme one element (and its subtree) with inline variables, e.g. a preview frame.
 * `mode` defaults to the surrounding color mode (an ancestor with `.dark`). In dark mode the
 * element gets the `dark` class so `dark:` utilities inside it apply. Returns a cleanup.
 * Call again when the design or the color mode changes.
 */
export function applyDesign(
  el: HTMLElement,
  design: Partial<Design>,
  mode?: Mode,
): () => void {
  const resolved =
    mode ?? (el.parentElement?.closest(".dark") ? "dark" : "light");
  const vars = designToCssVars(design);
  const next: VarMap = {
    ...vars.theme,
    ...vars.light,
    ...(resolved === "dark" ? vars.dark : {}),
  };
  for (const name of applied.get(el) ?? [])
    if (!(name.slice(2) in next)) el.style.removeProperty(name);
  const names: string[] = [];
  for (const [key, value] of Object.entries(next)) {
    el.style.setProperty(`--${key}`, value);
    names.push(`--${key}`);
  }
  applied.set(el, names);
  el.style.fontFamily = "var(--font-sans)";
  el.classList.toggle("dark", resolved === "dark");
  el.style.colorScheme = resolved;
  return () => {
    for (const name of applied.get(el) ?? []) el.style.removeProperty(name);
    applied.delete(el);
    el.style.removeProperty("font-family");
    el.style.removeProperty("color-scheme");
    el.classList.remove("dark");
  };
}
