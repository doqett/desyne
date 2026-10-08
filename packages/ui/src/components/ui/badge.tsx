import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { type Tone, tones } from "@/lib/primitive";

export const badgeVariants = tv({
  base: [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap border font-medium tabular-nums transition-colors",
    "[&>svg]:pointer-events-none [&>svg]:size-3",
  ],
  variants: {
    variant: {
      solid: "border-transparent bg-(--tone) text-(--tone-fg)",
      soft: "border-(--tone)/20 bg-(--tone)/10 text-(--tone)",
      outline: "border-(--tone)/40 bg-transparent text-(--tone)",
      /** Status dot + neutral text. */
      dot: "border-border bg-card text-foreground before:size-1.5 before:rounded-full before:bg-(--tone) before:content-['']",
    },
    color: {
      primary: tones.primary,
      brand: tones.brand,
      neutral: tones.neutral,
      danger: tones.danger,
      success: tones.success,
      warning: tones.warning,
      info: tones.info,
    },
    size: {
      sm: "h-5 rounded-[calc(var(--radius-badge)*0.5)] px-1.5 text-[0.7rem]",
      md: "h-6 rounded-(--radius-badge) px-2 text-xs",
    },
    shape: {
      default: "",
      pill: "rounded-full",
    },
  },
  compoundVariants: [
    {
      variant: "soft",
      color: "neutral",
      class: "border-border bg-secondary text-secondary-foreground",
    },
    {
      variant: "outline",
      color: "neutral",
      class: "border-border text-foreground",
    },
    {
      variant: ["soft", "outline"],
      color: "warning",
      class:
        "text-[color-mix(in_oklab,var(--tone),black_38%)] dark:text-(--tone)",
    },
    {
      // Mid-lightness tones are ~3:1 on their own tint in light mode; darken
      // the text so small badge labels meet WCAG AA (4.5:1).
      variant: ["soft", "outline"],
      color: ["success", "info", "danger"],
      class:
        "text-[color-mix(in_oklab,var(--tone),black_25%)] dark:text-(--tone)",
    },
  ],
  defaultVariants: {
    variant: "soft",
    color: "neutral",
    size: "md",
    shape: "default",
  },
});

type LegacyVariant = "default" | "secondary" | "destructive";
const legacy: Record<
  LegacyVariant,
  { variant: "solid" | "soft"; color: Tone }
> = {
  default: { variant: "solid", color: "primary" },
  secondary: { variant: "soft", color: "neutral" },
  destructive: { variant: "solid", color: "danger" },
};

export interface BadgeProps
  extends Omit<React.ComponentProps<"span">, "color">,
    Omit<VariantProps<typeof badgeVariants>, "variant"> {
  /** `default` / `secondary` / `destructive` are shadcn aliases. */
  variant?: VariantProps<typeof badgeVariants>["variant"] | LegacyVariant;
}

export function Badge({
  className,
  variant,
  color,
  size,
  shape,
  ...props
}: BadgeProps) {
  const mapped =
    variant && variant in legacy ? legacy[variant as LegacyVariant] : undefined;
  return (
    <span
      data-slot="badge"
      className={badgeVariants({
        variant:
          mapped?.variant ??
          (variant as "solid" | "soft" | "outline" | "dot" | undefined),
        color: color ?? mapped?.color,
        size,
        shape,
        className,
      })}
      {...props}
    />
  );
}
