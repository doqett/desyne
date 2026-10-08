"use client";

import type { ReactNode } from "react";
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
} from "react-aria-components";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Label } from "./field";

export interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: ReactNode;
  showValue?: boolean;
  color?: Tone;
  size?: "sm" | "md" | "lg";
}

const heights = { sm: "h-1", md: "h-2", lg: "h-3" };

export function ProgressBar({
  label,
  showValue = true,
  color = "brand",
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  return (
    <ProgressBarPrimitive
      data-slot="progress-bar"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn("group/field flex w-full flex-col gap-2", tones[color]),
      )}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {(label || (showValue && !isIndeterminate)) && (
            <div className="flex items-center justify-between gap-2 text-sm">
              {label && <Label>{label}</Label>}
              {showValue && !isIndeterminate && (
                <span className="ml-auto text-muted-foreground tabular-nums">
                  {valueText}
                </span>
              )}
            </div>
          )}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-full bg-(--tone)/15",
              heights[size],
            )}
          >
            <div
              className={cn(
                "h-full rounded-full bg-(--tone) transition-[width] duration-500 ease-out motion-reduce:transition-none",
                // Reduced motion: a full-width bar that fades, so it never reads as a value.
                isIndeterminate &&
                  "absolute w-1/3 animate-indeterminate motion-reduce:w-full motion-reduce:animate-pulse",
              )}
              style={
                isIndeterminate ? undefined : { width: `${percentage ?? 0}%` }
              }
            />
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  );
}

// ProgressCircle lives in its own file; re-exported here for existing imports.
export { ProgressCircle, type ProgressCircleProps } from "./progress-circle";
