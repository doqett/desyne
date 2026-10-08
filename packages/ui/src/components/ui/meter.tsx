"use client";

import type { ReactNode } from "react";
import {
  Meter as MeterPrimitive,
  type MeterProps as MeterPrimitiveProps,
} from "react-aria-components";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Label } from "./field";

export interface MeterProps extends MeterPrimitiveProps {
  label?: ReactNode;
  showValue?: boolean;
  /** Fixed tone. When omitted, the tone follows `thresholds`. */
  color?: Tone;
  /** Percentages where the bar turns warning / danger. Default `[75, 90]`. */
  thresholds?: [number, number];
  size?: "sm" | "md";
  /** Split the bar into this many segments (e.g. 10 for a battery look). */
  segments?: number;
}

export function Meter({
  label,
  showValue = true,
  color,
  thresholds = [75, 90],
  size = "md",
  segments,
  className,
  ...props
}: MeterProps) {
  return (
    <MeterPrimitive
      data-slot="meter"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex w-full flex-col gap-2",
      )}
    >
      {({ percentage, valueText }) => {
        const tone: Tone =
          color ??
          (percentage >= thresholds[1]
            ? "danger"
            : percentage >= thresholds[0]
              ? "warning"
              : "success");
        const h = size === "sm" ? "h-1.5" : "h-2";
        return (
          <>
            {(label || showValue) && (
              <div className="flex items-center justify-between gap-2 text-sm">
                {label && <Label>{label}</Label>}
                {showValue && (
                  <span className="ml-auto text-muted-foreground tabular-nums">
                    {valueText}
                  </span>
                )}
              </div>
            )}
            {segments ? (
              <div className={cn("flex w-full gap-1", tones[tone])}>
                {Array.from({ length: segments }, (_, i) => i).map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-full transition-colors",
                      h,
                      (i + 1) / segments <= percentage / 100 + 1e-9
                        ? "bg-(--tone)"
                        : "bg-muted",
                    )}
                  />
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  "w-full overflow-hidden rounded-full bg-muted",
                  h,
                  tones[tone],
                )}
              >
                <div
                  className="h-full rounded-full bg-(--tone) transition-[width] duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </>
        );
      }}
    </MeterPrimitive>
  );
}
