import { cn } from "@/lib/utils";

/**
 * Desyne mark geometry on a 24-unit grid: a "D" built from two primitives —
 * a rounded stem and a half-disc bowl, separated by a 2-unit gap — like two
 * components snapped together. Filled shapes; shared by the header, favicons
 * and OG art.
 */
export const logoMark = {
  viewBox: "0 0 24 24",
  stem: "M4 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z",
  bowl: "M12 3a9 9 0 0 1 0 18h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z",
} as const;

/** The Desyne mark. Single colour (currentColor); size via className. */
export function LogoMark({
  className,
  accent = false,
  title,
}: {
  className?: string;
  /** Draw the bowl in the brand indigo. */
  accent?: boolean;
  /** Accessible name; omit when the mark sits next to the wordmark. */
  title?: string;
}) {
  return (
    <svg
      viewBox={logoMark.viewBox}
      fill="currentColor"
      className={cn("size-6 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={logoMark.stem} />
      <path d={logoMark.bowl} className={accent ? "text-brand" : undefined} />
    </svg>
  );
}

/** Mark + "Desyne" wordmark, with an optional "Pro" suffix. */
export function Logo({
  className,
  markClassName,
  pro = false,
  accent = false,
}: {
  className?: string;
  markClassName?: string;
  pro?: boolean;
  accent?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 font-semibold", className)}
    >
      <LogoMark className={markClassName} accent={accent} />
      <span className="tracking-[-0.02em]">Desyne</span>
      {pro ? (
        <span className="rounded-sm bg-foreground px-1.5 py-px font-medium text-[0.65rem] text-background">
          Pro
        </span>
      ) : null}
    </span>
  );
}
