"use client";

import type { ReactNode } from "react";
import {
  SliderFill,
  SliderOutput,
  Slider as SliderPrimitive,
  type SliderProps as SliderPrimitiveProps,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Label } from "./field";

export interface SliderProps<T extends number | number[]>
  extends SliderPrimitiveProps<T> {
  label?: ReactNode;
  showOutput?: boolean;
  color?: Tone;
  size?: "sm" | "md";
  /** Tick labels shown along the track, e.g. `[0, 25, 50, 75, 100]`. */
  marks?: number[];
  /**
   * Form field name. A string names every thumb's input (read a range with
   * `formData.getAll(name)`); an array names each thumb by index.
   */
  name?: string | string[];
  /** Id of a `<form>` to associate the thumbs' inputs with. */
  form?: string;
  /**
   * Accessible label for each thumb, by index. Two-thumb sliders default to
   * `["Minimum", "Maximum"]`.
   */
  thumbLabels?: string[];
  /** Value the fill starts from for a single thumb. Defaults to `minValue`. */
  fillOffset?: number;
}

const defaultRangeLabels = ["Minimum", "Maximum"];

export function Slider<T extends number | number[]>({
  label,
  showOutput = true,
  color = "brand",
  size = "md",
  marks,
  name,
  form,
  thumbLabels,
  fillOffset,
  className,
  ...props
}: SliderProps<T>) {
  const min = props.minValue ?? 0;
  const max = props.maxValue ?? 100;
  const vertical = props.orientation === "vertical";
  const sm = size === "sm";
  return (
    <SliderPrimitive
      data-slot="slider"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/field flex gap-2 data-disabled:opacity-50",
          vertical ? "h-48 flex-col items-center" : "w-full flex-col",
          tones[color],
        ),
      )}
    >
      {(label || showOutput) && (
        <div
          className={cn(
            "flex gap-2",
            vertical
              ? "flex-col items-center text-center"
              : "items-center justify-between",
          )}
        >
          {label && <Label>{label}</Label>}
          {showOutput && (
            <SliderOutput
              className={cn(
                "text-muted-foreground text-sm tabular-nums",
                !vertical && "ml-auto",
              )}
            />
          )}
        </div>
      )}
      <div
        className={cn(
          "flex",
          vertical ? "min-h-0 flex-1 flex-row gap-2" : "flex-col gap-2",
        )}
      >
        <SliderTrack
          data-slot="slider-track"
          className={cn(
            "relative",
            vertical ? "h-full" : "w-full",
            vertical ? (sm ? "w-4" : "w-5") : sm ? "h-4" : "h-5",
          )}
        >
          {({ state }) => {
            const count = state.values.length;
            const labels =
              thumbLabels ?? (count === 2 ? defaultRangeLabels : undefined);
            return (
              <>
                <div
                  className={cn(
                    "absolute overflow-hidden rounded-full bg-muted",
                    vertical
                      ? "inset-y-0 left-1/2 -translate-x-1/2"
                      : "inset-x-0 top-1/2 -translate-y-1/2",
                    vertical ? (sm ? "w-1" : "w-1.5") : sm ? "h-1" : "h-1.5",
                  )}
                >
                  <SliderFill
                    data-slot="slider-fill"
                    offset={fillOffset}
                    className="rounded-full bg-(--tone)"
                  />
                </div>
                {state.values.map((_, i) => (
                  <SliderThumb
                    // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
                    key={i}
                    index={i}
                    name={Array.isArray(name) ? name[i] : name}
                    form={form}
                    aria-label={labels?.[i]}
                    data-slot="slider-thumb"
                    className={cn(
                      "rounded-full border-2 border-(--tone) bg-white shadow-sm outline-none ring-(--tone)/20 transition-[box-shadow,width,height] data-dragging:ring-[5px] data-focus-visible:ring-[5px] data-hovered:ring-4",
                      vertical ? "left-1/2" : "top-1/2",
                      sm ? "size-3" : "size-4",
                    )}
                  />
                ))}
              </>
            );
          }}
        </SliderTrack>
        {marks && (
          <div
            aria-hidden
            className={cn(
              "relative text-muted-foreground text-xs tabular-nums",
              vertical ? "h-full min-w-6" : "h-4",
            )}
          >
            {marks.map((m) => {
              const pct = `${((m - min) / (max - min)) * 100}%`;
              return (
                <span
                  key={m}
                  className={cn(
                    "absolute leading-none",
                    vertical
                      ? "left-0 translate-y-1/2"
                      : "-translate-x-1/2 rtl:translate-x-1/2",
                  )}
                  style={vertical ? { bottom: pct } : { insetInlineStart: pct }}
                >
                  {m}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </SliderPrimitive>
  );
}
