import { cn } from "@/lib/utils";

/*
 * No "use client" and no react-aria import: this module is safe to import from
 * server components (Badge, Card, Spinner read `tones` during server rendering).
 */

/** Merge a React Aria `className` (string or render-prop fn) with Tailwind classes. */
export function composeTailwindRenderProps<T>(
  className: string | ((values: T) => string) | undefined,
  tw: string,
): string | ((values: T) => string) {
  return typeof className === "function"
    ? (values: T) => cn(tw, className(values))
    : cn(tw, className);
}

/** Keyboard focus ring: a soft colored glow (applied on `data-focus-visible`). */
export const focusRing =
  "outline-none data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25";

/**
 * Tones set `--tone` / `--tone-fg` CSS variables. Components style themselves with
 * `bg-(--tone)`, `text-(--tone)`, `bg-(--tone)/10`, … so one set of variant styles
 * works for every color.
 */
export const tones = {
  primary: "[--tone-fg:var(--primary-foreground)] [--tone:var(--primary)]",
  brand: "[--tone-fg:var(--brand-foreground)] [--tone:var(--brand)]",
  neutral: "[--tone-fg:var(--background)] [--tone:var(--foreground)]",
  danger:
    "[--tone-fg:var(--destructive-foreground)] [--tone:var(--destructive)]",
  success: "[--tone-fg:var(--success-foreground)] [--tone:var(--success)]",
  warning: "[--tone-fg:var(--warning-foreground)] [--tone:var(--warning)]",
  info: "[--tone-fg:var(--info-foreground)] [--tone:var(--info)]",
} as const;

export type Tone = keyof typeof tones;
