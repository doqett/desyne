"use client";

import { Loader2Icon } from "lucide-react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { type Tone, tones } from "@/lib/primitive";

export const buttonVariants = tv({
  base: [
    "relative inline-flex shrink-0 cursor-default select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-control) border-(length:--border-width) font-(weight:--button-weight) text-sm outline-none",
    "transition-[color,background-color,border-color,box-shadow] duration-150",
    "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-(--tone)/25",
    "data-disabled:pointer-events-none data-disabled:opacity-50 data-pending:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  variants: {
    variant: {
      solid:
        "border-transparent bg-(--tone) text-(--tone-fg) shadow-(--shadow-solid) data-hovered:bg-(--tone)/88 data-pressed:bg-(--tone)/80",
      soft: "border-transparent bg-(--tone)/10 text-(--tone) data-hovered:bg-(--tone)/15 data-pressed:bg-(--tone)/20",
      outline:
        "border-(--tone)/40 bg-card text-(--tone) shadow-(--shadow-control) data-hovered:border-(--tone) data-hovered:bg-(--tone)/5 data-pressed:bg-(--tone)/10",
      dashed:
        "border-(--tone)/40 border-dashed bg-card text-(--tone) data-hovered:border-(--tone) data-hovered:bg-(--tone)/5 data-pressed:bg-(--tone)/10",
      ghost:
        "border-transparent text-(--tone) data-hovered:bg-(--tone)/10 data-pressed:bg-(--tone)/15",
      link: "h-auto! border-transparent px-0! text-(--tone) underline-offset-4 data-hovered:underline",
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
      xs: "h-(--control-h-xs) gap-1 rounded-[calc(var(--radius-control)-2px)] px-(--control-px-xs) text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-(--control-h-sm) gap-1.5 px-(--control-px-sm) text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-(--control-h-md) px-(--control-px-md)",
      /** shadcn alias for `md` */
      default: "h-(--control-h-md) px-(--control-px-md)",
      lg: "h-(--control-h-lg) px-(--control-px-lg)",
      "icon-xs":
        "size-(--control-h-xs) rounded-[calc(var(--radius-control)-2px)] [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-(--control-h-sm) [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-(--control-h-md)",
      "icon-lg": "size-(--control-h-lg)",
    },
  },
  compoundVariants: [
    // Neutral outline/dashed: a quiet white control that darkens slightly on hover.
    {
      variant: ["outline", "dashed"],
      color: "neutral",
      class:
        "border-input bg-card text-foreground data-hovered:border-foreground/20 data-hovered:bg-muted/70 data-pressed:bg-muted",
    },
    {
      variant: "ghost",
      color: "neutral",
      class:
        "text-foreground data-hovered:bg-accent data-hovered:text-accent-foreground data-pressed:bg-accent",
    },
    {
      variant: "soft",
      color: "neutral",
      class:
        "bg-secondary text-secondary-foreground data-hovered:bg-secondary/70",
    },
    {
      variant: "solid",
      color: "warning",
      class: "data-hovered:bg-(--tone)/90",
    },
    // Amber text needs extra contrast on light backgrounds.
    {
      variant: ["soft", "outline", "dashed", "ghost", "link"],
      color: "warning",
      class:
        "text-[color-mix(in_oklab,var(--tone),black_38%)] dark:text-(--tone)",
    },
  ],
  defaultVariants: { variant: "solid", size: "md" },
});

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
/** shadcn-compatible variant names. */
type LegacyVariant = "default" | "destructive" | "secondary";

export interface ButtonProps
  extends Omit<ButtonPrimitiveProps, "className">,
    Omit<VariantProps<typeof buttonVariants>, "variant" | "color"> {
  /** Visual style. `default` / `destructive` / `secondary` are aliases for shadcn compatibility. */
  variant?: Variant | LegacyVariant;
  /** Color tone. Defaults to `primary` (ink) for solid, `brand` for link and `neutral` otherwise. */
  color?: Tone;
  className?: ButtonPrimitiveProps["className"];
}

const legacy: Record<LegacyVariant, { variant: Variant; color: Tone }> = {
  default: { variant: "solid", color: "primary" },
  destructive: { variant: "solid", color: "danger" },
  secondary: { variant: "soft", color: "neutral" },
};

export function resolveButtonStyle(
  variant: ButtonProps["variant"] = "solid",
  color?: Tone,
) {
  const mapped =
    variant in legacy ? legacy[variant as LegacyVariant] : undefined;
  const v = mapped?.variant ?? (variant as Variant);
  const c =
    color ??
    mapped?.color ??
    (v === "link" ? "brand" : v === "solid" ? "primary" : "neutral");
  return { variant: v, color: c };
}

export function Button({
  className,
  variant,
  color,
  size,
  children,
  ...props
}: ButtonProps) {
  const style = resolveButtonStyle(variant, color);
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      className={composeRenderProps(className, (className) =>
        buttonVariants({ ...style, size, className }),
      )}
    >
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          {isPending && <Loader2Icon aria-hidden className="animate-spin" />}
          {children}
        </>
      ))}
    </ButtonPrimitive>
  );
}
