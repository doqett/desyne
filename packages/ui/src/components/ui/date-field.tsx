"use client";

import type { ReactNode } from "react";
import {
  DateField as DateFieldPrimitive,
  type DateFieldProps as DateFieldPrimitiveProps,
  DateInput as DateInputPrimitive,
  type DateInputProps as DateInputPrimitiveProps,
  DateSegment,
  type DateValue,
  TimeField as TimeFieldPrimitive,
  type TimeFieldProps as TimeFieldPrimitiveProps,
  type TimeValue,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import {
  Description,
  FieldError,
  type FieldVariantProps,
  fieldVariants,
  Label,
} from "./field";

export const dateSegmentStyles = [
  "inline rounded-sm px-0.5 tabular-nums caret-transparent outline-none",
  "data-placeholder:text-muted-foreground data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground",
  "data-focused:bg-accent data-focused:text-accent-foreground data-invalid:text-destructive",
].join(" ");

export interface DateInputProps
  extends Omit<DateInputPrimitiveProps, "children">,
    FieldVariantProps {}

export function DateInput({
  className,
  variant,
  size,
  ...props
}: DateInputProps) {
  return (
    <DateInputPrimitive
      data-slot="date-input"
      {...props}
      className={composeTailwindRenderProps(
        className,
        // Segments sit flush; the field's `gap-*` is meant for adornments.
        fieldVariants({ variant, size, className: "gap-0" }),
      )}
    >
      {(segment) => (
        <DateSegment segment={segment} className={dateSegmentStyles}>
          {/* Server and browser Intl data can disagree on literal spacing
              (e.g. U+202F before "PM"); literals are aria-hidden text. */}
          {segment.type === "literal" ? (
            <span suppressHydrationWarning>{segment.text}</span>
          ) : undefined}
        </DateSegment>
      )}
    </DateInputPrimitive>
  );
}

interface FieldExtras extends FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export interface DateFieldProps<T extends DateValue>
  extends DateFieldPrimitiveProps<T>,
    FieldExtras {}

export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  variant,
  size,
  className,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldPrimitive
      data-slot="date-field"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <DateInput variant={variant} size={size} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  );
}

export interface TimeFieldProps<T extends TimeValue>
  extends TimeFieldPrimitiveProps<T>,
    FieldExtras {}

export function TimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  variant,
  size,
  className,
  ...props
}: TimeFieldProps<T>) {
  return (
    <TimeFieldPrimitive
      data-slot="time-field"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <DateInput variant={variant} size={size} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TimeFieldPrimitive>
  );
}
