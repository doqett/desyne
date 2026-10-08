"use client";

import type { ReactNode } from "react";
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
  type ProgressBarRenderProps,
} from "react-aria-components";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { box: 20, stroke: 3, text: "" },
  md: { box: 48, stroke: 4, text: "text-[0.7rem]" },
  lg: { box: 80, stroke: 6, text: "text-base" },
  xl: { box: 120, stroke: 8, text: "text-2xl" },
};

export interface ProgressCircleProps
  extends Omit<ProgressBarPrimitiveProps, "children"> {
  color?: Tone;
  size?: "sm" | "md" | "lg" | "xl";
  /** Ring thickness in px. Defaults to 3 / 4 / 6 / 8 by size. */
  strokeWidth?: number;
  /** Show the value text in the middle (md and up). */
  showValue?: boolean;
  /**
   * Custom content for the middle of the ring, replacing the value text.
   * Receives the render props (`percentage`, `valueText`, `isIndeterminate`).
   */
  children?: ReactNode | ((values: ProgressBarRenderProps) => ReactNode);
}

/**
 * Circular progress on React Aria's ProgressBar: determinate or indeterminate,
 * four sizes, and the value (or your own content) inside the ring.
 */
export function ProgressCircle({
  color = "brand",
  size = "md",
  strokeWidth,
  showValue = true,
  className,
  children,
  ...props
}: ProgressCircleProps) {
  const { box, stroke: defaultStroke, text } = sizes[size];
  const stroke = strokeWidth ?? defaultStroke;
  const r = (box - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <ProgressBarPrimitive
      data-slot="progress-circle"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "relative inline-flex shrink-0 items-center justify-center",
          tones[color],
        ),
      )}
    >
      {(renderProps) => {
        const { percentage = 0, valueText, isIndeterminate } = renderProps;
        const center =
          typeof children === "function" ? children(renderProps) : children;
        return (
          <>
            <svg
              width={box}
              height={box}
              viewBox={`0 0 ${box} ${box}`}
              className={cn(
                "-rotate-90",
                isIndeterminate && "animate-spin motion-reduce:animate-pulse",
              )}
              aria-hidden
            >
              <circle
                cx={box / 2}
                cy={box / 2}
                r={r}
                fill="none"
                strokeWidth={stroke}
                className="stroke-(--tone)/15"
              />
              <circle
                cx={box / 2}
                cy={box / 2}
                r={r}
                fill="none"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={
                  isIndeterminate ? c * 0.75 : c - (percentage / 100) * c
                }
                className="stroke-(--tone) transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
              />
            </svg>
            {center != null ? (
              <span
                data-slot="progress-circle-label"
                className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight"
              >
                {center}
              </span>
            ) : (
              showValue &&
              size !== "sm" &&
              !isIndeterminate && (
                <span
                  data-slot="progress-circle-label"
                  className={cn("absolute font-semibold tabular-nums", text)}
                >
                  {valueText}
                </span>
              )
            )}
          </>
        );
      }}
    </ProgressBarPrimitive>
  );
}
