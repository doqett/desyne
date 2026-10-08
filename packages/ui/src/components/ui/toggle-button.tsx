"use client";

import { createContext, useContext } from "react";
import {
  composeRenderProps,
  ToggleButton as ToggleButtonPrimitive,
  type ToggleButtonProps as ToggleButtonPrimitiveProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const toggleVariants = tv({
  base: [
    "inline-flex shrink-0 cursor-default select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-control) border-(length:--border-width) font-(weight:--button-weight) text-sm outline-none",
    "transition-[color,background-color,border-color,box-shadow] duration-150",
    "data-focus-visible:z-10 data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  variants: {
    variant: {
      default: [
        "border-transparent bg-transparent text-muted-foreground",
        "data-hovered:bg-muted data-hovered:text-foreground",
        "data-selected:bg-accent data-selected:text-accent-foreground",
      ],
      outline: [
        "border-input bg-card text-foreground shadow-(--shadow-control)",
        "data-hovered:bg-muted",
        "data-selected:z-[1] data-selected:border-brand data-selected:bg-brand/5 data-selected:text-brand",
      ],
      /** Used inside a segmented `ToggleButtonGroup`. */
      segmented: [
        "border-transparent bg-transparent text-muted-foreground",
        "data-hovered:text-foreground",
        "data-selected:bg-card data-selected:text-foreground data-selected:shadow-(--shadow-control) dark:data-selected:bg-input/40",
      ],
    },
    size: {
      xs: "h-(--control-h-xs) min-w-(--control-h-xs) gap-1 rounded-[calc(var(--radius-control)-2px)] px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-(--control-h-sm) min-w-(--control-h-sm) px-(--control-px-xs) text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-(--control-h-md) min-w-(--control-h-md) px-(--control-px-sm)",
      lg: "h-(--control-h-lg) min-w-(--control-h-lg) px-(--control-px-md)",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;

/** Lets `ToggleButtonGroup` pass its variant and size down to its buttons. */
export const ToggleGroupStyleContext = createContext<ToggleVariantProps>({});

export interface ToggleButtonProps
  extends ToggleButtonPrimitiveProps,
    ToggleVariantProps {}

export function ToggleButton({
  className,
  variant,
  size,
  ...props
}: ToggleButtonProps) {
  const group = useContext(ToggleGroupStyleContext);
  return (
    <ToggleButtonPrimitive
      data-slot="toggle-button"
      {...props}
      className={composeRenderProps(className, (className) =>
        toggleVariants({
          variant: variant ?? group.variant,
          size: size ?? group.size,
          className,
        }),
      )}
    />
  );
}
