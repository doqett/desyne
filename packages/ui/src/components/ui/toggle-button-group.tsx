"use client";

import {
  ToggleButtonGroup as ToggleButtonGroupPrimitive,
  type ToggleButtonGroupProps as ToggleButtonGroupPrimitiveProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { ToggleGroupStyleContext } from "./toggle-button";

const groupVariants = tv({
  base: "flex w-fit",
  variants: {
    variant: {
      /** Buttons joined into one bar (Ant's radio-button group). */
      attached: [
        "*:rounded-none *:shadow-none",
        "data-[orientation=horizontal]:*:first:rounded-l-(--radius-control) data-[orientation=horizontal]:*:last:rounded-r-(--radius-control) data-[orientation=horizontal]:*:not-first:-ml-(--border-width)",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:*:first:rounded-t-(--radius-control) data-[orientation=vertical]:*:last:rounded-b-(--radius-control) data-[orientation=vertical]:*:not-first:-mt-(--border-width)",
      ],
      /** Pill track with a raised selection (Ant's Segmented). */
      segmented:
        "gap-0.5 rounded-[calc(var(--radius-control)+2px)] bg-muted p-0.5 data-[orientation=vertical]:flex-col",
      /** Separate buttons with a gap. */
      spaced: "gap-1 data-[orientation=vertical]:flex-col",
    },
  },
  defaultVariants: { variant: "attached" },
});

export interface ToggleButtonGroupProps
  extends ToggleButtonGroupPrimitiveProps {
  variant?: "attached" | "segmented" | "spaced";
  size?: "xs" | "sm" | "md" | "lg";
}

export function ToggleButtonGroup({
  className,
  variant = "attached",
  size,
  ...props
}: ToggleButtonGroupProps) {
  const itemVariant =
    variant === "segmented"
      ? "segmented"
      : variant === "attached"
        ? "outline"
        : undefined;
  return (
    <ToggleGroupStyleContext.Provider value={{ variant: itemVariant, size }}>
      <ToggleButtonGroupPrimitive
        data-slot="toggle-button-group"
        {...props}
        className={composeTailwindRenderProps(
          className,
          groupVariants({ variant }),
        )}
      />
    </ToggleGroupStyleContext.Provider>
  );
}
