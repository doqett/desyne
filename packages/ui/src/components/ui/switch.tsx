"use client";

import type { ReactNode } from "react";
import {
  composeRenderProps,
  Switch as SwitchPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

const switchVariants = tv({
  slots: {
    track: [
      "inline-flex shrink-0 items-center rounded-(--radius-pill) border border-transparent bg-input p-px shadow-inner transition-colors duration-200",
      "group-data-hovered/switch:bg-foreground/25 group-data-selected/switch:bg-brand group-data-selected/switch:group-data-hovered/switch:bg-brand/90",
      "group-data-focus-visible/switch:ring-(length:--ring-width) group-data-focus-visible/switch:ring-ring/25",
    ],
    thumb:
      "pointer-events-none block rounded-(--radius-pill) bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out",
  },
  variants: {
    size: {
      sm: {
        track: "h-4 w-7",
        thumb: "size-3.5 group-data-selected/switch:translate-x-3",
      },
      md: {
        track: "h-5 w-9",
        thumb: "size-4.5 group-data-selected/switch:translate-x-4",
      },
      lg: {
        track: "h-6 w-11",
        thumb: "size-5.5 group-data-selected/switch:translate-x-5",
      },
    },
  },
  defaultVariants: { size: "md" },
});

export interface SwitchProps extends SwitchPrimitiveProps {
  size?: "sm" | "md" | "lg";
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Put the switch after the label (settings-list style). */
  labelPlacement?: "end" | "start";
}

export function Switch({
  className,
  children,
  size,
  description,
  labelPlacement = "end",
  ...props
}: SwitchProps) {
  const { track, thumb } = switchVariants({ size });
  return (
    <SwitchPrimitive
      data-slot="switch"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/switch flex gap-2.5 text-sm leading-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
          description ? "items-start" : "items-center",
          labelPlacement === "start" && "flex-row-reverse justify-between",
        ),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          <span className={track()}>
            <span className={thumb()} />
          </span>
          {description ? (
            <span className="flex flex-col gap-1">
              <span className="font-medium">{children}</span>
              <span className="text-muted-foreground text-xs leading-snug">
                {description}
              </span>
            </span>
          ) : (
            children
          )}
        </>
      ))}
    </SwitchPrimitive>
  );
}
