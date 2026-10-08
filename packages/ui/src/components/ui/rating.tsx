"use client";

import { StarIcon } from "lucide-react";
import { type ReactNode, useId, useRef, useState } from "react";
import {
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupProps as RadioGroupPrimitiveProps,
  Radio as RadioPrimitive,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Description, FieldError, Label } from "./field";

const ratingVariants = tv({
  slots: {
    icon: "relative inline-flex shrink-0 [&_svg]:pointer-events-none [&_svg]:max-w-none [&_svg]:shrink-0 [&_svg]:fill-current",
    item: "rounded-sm",
  },
  variants: {
    size: {
      sm: { icon: "[&_svg]:size-4", item: "p-px" },
      md: { icon: "[&_svg]:size-5", item: "p-0.5" },
      lg: { icon: "[&_svg]:size-7", item: "p-0.5" },
    },
  },
  defaultVariants: { size: "md" },
});

/** One icon, filled from 0 (empty) to 1 (full). */
function RatingIcon({
  fill,
  icon,
  className,
}: {
  fill: number;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <span data-slot="rating-icon" aria-hidden className={className}>
      <span className="flex text-(--tone)/20 dark:text-muted-foreground/30">
        {icon}
      </span>
      {fill > 0 && (
        <span
          className="absolute inset-y-0 left-0 flex overflow-hidden text-(--tone) transition-[width] duration-150"
          style={{ width: `${fill * 100}%` }}
        >
          {icon}
        </span>
      )}
    </span>
  );
}

interface RatingBaseProps {
  label?: ReactNode;
  description?: ReactNode;
  /** Number of icons. Default 5. */
  maxValue?: number;
  size?: "sm" | "md" | "lg";
  /** Tone of the filled icons. Default `warning` (amber). */
  color?: Tone;
  /** Replaces the star, e.g. `<HeartIcon />`. */
  icon?: ReactNode;
  /** Shows the numeric value after the icons. */
  showValue?: boolean;
  className?: string;
}

export interface RatingProps
  extends RatingBaseProps,
    Omit<
      RadioGroupPrimitiveProps,
      | "value"
      | "defaultValue"
      | "onChange"
      | "children"
      | "orientation"
      | "className"
    > {
  /** Controlled value (0 = no rating). In read-only mode it may be fractional. */
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Renders a non-interactive display that supports half values. */
  isReadOnly?: boolean;
  /** Clicking the selected icon (or pressing Backspace/Delete) clears the rating. Default true. */
  allowClear?: boolean;
  /** Labels for each value, read by screen readers and shown on hover. Index 0 is value 1. */
  valueLabels?: string[];
  errorMessage?: string | ((validation: ValidationResult) => string);
}

/**
 * Star rating. Interactive ratings are a React Aria RadioGroup (arrow keys change
 * the value); `isReadOnly` renders a static image with half-star precision.
 */
export function Rating({
  label,
  description,
  maxValue = 5,
  size = "md",
  color = "warning",
  icon = <StarIcon />,
  showValue = false,
  value: valueProp,
  defaultValue = 0,
  onChange,
  isReadOnly,
  allowClear = true,
  valueLabels,
  errorMessage,
  className,
  ...props
}: RatingProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const pressed = useRef<number | null>(null);
  const labelId = useId();
  const value = valueProp ?? uncontrolled;
  const styles = ratingVariants({ size });
  const items = Array.from({ length: maxValue }, (_, i) => i + 1);
  const valueText = (
    <span
      data-slot="rating-value"
      className={cn(
        "ml-1.5 text-muted-foreground tabular-nums",
        size === "lg" ? "text-base" : "text-sm",
      )}
    >
      {Number.isInteger(value) ? value : value.toFixed(1)}
    </span>
  );

  if (isReadOnly) {
    const rounded = Math.round(value * 2) / 2;
    return (
      <div
        data-slot="rating"
        data-readonly=""
        className={cn(
          "group/field flex flex-col gap-2",
          tones[color],
          className,
        )}
      >
        {label && (
          <span
            id={labelId}
            className="font-medium text-foreground text-sm leading-none"
          >
            {label}
          </span>
        )}
        <div className="flex items-center">
          <div
            role="img"
            aria-label={`${rounded} out of ${maxValue}`}
            aria-labelledby={label ? `${labelId} ${labelId}-img` : undefined}
            id={`${labelId}-img`}
            className="flex items-center gap-0.5"
          >
            {items.map((i) => (
              <RatingIcon
                key={i}
                icon={icon}
                fill={Math.min(1, Math.max(0, rounded - (i - 1)))}
                className={styles.icon()}
              />
            ))}
          </div>
          {showValue && valueText}
        </div>
        {description && (
          <span className="text-muted-foreground text-xs leading-relaxed">
            {description}
          </span>
        )}
      </div>
    );
  }

  const setValue = (n: number) => {
    if (valueProp === undefined) setUncontrolled(n);
    onChange?.(n);
  };
  const shown = hovered ?? value;
  return (
    <RadioGroupPrimitive
      data-slot="rating"
      {...props}
      orientation="horizontal"
      value={value ? String(value) : null}
      onChange={(v) => setValue(Number(v))}
      className={composeTailwindRenderProps(
        className,
        cn("group/field flex flex-col gap-2", tones[color]),
      )}
    >
      {label && <Label>{label}</Label>}
      <div className="-mx-0.5 flex items-center">
        {/* biome-ignore lint/a11y/noStaticElementInteractions: delegates clicks/keys from the radios inside */}
        <div
          className="flex items-center"
          onPointerLeave={() => setHovered(null)}
          // A radio that's already checked fires no change event, so clearing is
          // handled here: remember which star the pointer went down on (and whether
          // it was the selected one), then clear on the click that follows.
          onPointerDownCapture={(e) => {
            const el = (e.target as Element).closest<HTMLElement>(
              "[data-rating-value]",
            );
            const v = Number(el?.dataset.ratingValue);
            pressed.current = allowClear && v > 0 && v === value ? v : null;
          }}
          onClickCapture={(e) => {
            if (pressed.current === null || props.isDisabled) return;
            pressed.current = null;
            // Stop the label from re-checking the radio we're about to clear.
            e.preventDefault();
            setValue(0);
            setHovered(null);
          }}
          onKeyDown={(e) => {
            if (
              allowClear &&
              !props.isDisabled &&
              value > 0 &&
              (e.key === "Backspace" || e.key === "Delete")
            ) {
              e.preventDefault();
              setValue(0);
            }
          }}
        >
          {items.map((i) => (
            <RadioPrimitive
              key={i}
              value={String(i)}
              data-rating-value={i}
              aria-label={valueLabels?.[i - 1] ?? `${i} of ${maxValue}`}
              onHoverStart={() => setHovered(i)}
              className={cn(
                styles.item(),
                "group/rating-item cursor-default outline-none transition-transform",
                "data-pressed:scale-90 data-disabled:cursor-not-allowed data-disabled:opacity-50",
                "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/30",
              )}
            >
              <RatingIcon
                icon={icon}
                fill={i <= shown ? 1 : 0}
                className={styles.icon()}
              />
            </RadioPrimitive>
          ))}
        </div>
        {showValue && valueText}
        {valueLabels && shown > 0 && (
          <span aria-hidden className="ml-2 text-muted-foreground text-sm">
            {valueLabels[shown - 1]}
          </span>
        )}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </RadioGroupPrimitive>
  );
}
