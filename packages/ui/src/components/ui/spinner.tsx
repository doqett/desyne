import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { type Tone, tones } from "@/lib/primitive";

const spinnerVariants = tv({
  // Under prefers-reduced-motion the ring stops rotating and gently fades instead.
  base: "inline-block shrink-0 animate-spin motion-reduce:animate-pulse rounded-full border-2 border-current border-r-transparent",
  variants: {
    size: {
      xs: "size-3 border-[1.5px]",
      sm: "size-4",
      md: "size-5",
      lg: "size-8 border-[3px]",
    },
  },
  defaultVariants: { size: "sm" },
});

export interface SpinnerProps
  extends Omit<React.ComponentProps<"span">, "color">,
    VariantProps<typeof spinnerVariants> {
  /** Defaults to the current text color. */
  color?: Tone;
  label?: string;
}

export function Spinner({
  className,
  size,
  color,
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={spinnerVariants({
        size,
        className: [color && tones[color], color && "text-(--tone)", className],
      })}
      {...props}
    />
  );
}
