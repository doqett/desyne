"use client";

import { CalendarIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  DateInput as DateInputPrimitive,
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  DateRangePicker as DateRangePickerPrimitive,
  type DateRangePickerProps as DateRangePickerPrimitiveProps,
  DateSegment,
  type DateValue,
  Dialog,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { Button } from "./button";
import { Calendar, type CalendarCaptionProps, RangeCalendar } from "./calendar";
import { dateSegmentStyles } from "./date-field";
import {
  Description,
  FieldError,
  FieldGroup,
  type FieldVariantProps,
  Label,
} from "./field";
import { Popover } from "./popover";

interface FieldExtras extends FieldVariantProps, CalendarCaptionProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function PickerButton({ variant }: FieldVariantProps) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      // The underlined variant has no horizontal padding to bleed into.
      className={variant === "underlined" ? "ml-auto" : "-mr-1 ml-auto"}
    >
      <CalendarIcon aria-hidden />
    </Button>
  );
}

export interface DatePickerProps<T extends DateValue>
  extends DatePickerPrimitiveProps<T>,
    FieldExtras {}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  variant,
  size,
  captionLayout,
  fromYear,
  toYear,
  className,
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePickerPrimitive
      data-slot="date-picker"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        variant={variant}
        size={size}
        className="group-data-open/field:border-ring"
      >
        <DateInputPrimitive className="flex flex-1 items-center">
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
        <PickerButton variant={variant} />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover placement="bottom start">
        <Dialog className="outline-none">
          <Calendar
            captionLayout={captionLayout}
            fromYear={fromYear}
            toYear={toYear}
          />
        </Dialog>
      </Popover>
    </DatePickerPrimitive>
  );
}

export interface DateRangePickerProps<T extends DateValue>
  extends DateRangePickerPrimitiveProps<T>,
    FieldExtras {}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  variant,
  size,
  captionLayout,
  fromYear,
  toYear,
  className,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <DateRangePickerPrimitive
      data-slot="date-range-picker"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        variant={variant}
        size={size}
        className="group-data-open/field:border-ring"
      >
        <DateInputPrimitive slot="start" className="flex items-center">
          {(segment) => (
            <DateSegment segment={segment} className={dateSegmentStyles}>
              {segment.type === "literal" ? (
                <span suppressHydrationWarning>{segment.text}</span>
              ) : undefined}
            </DateSegment>
          )}
        </DateInputPrimitive>
        <span aria-hidden className="px-1 text-muted-foreground">
          →
        </span>
        <DateInputPrimitive slot="end" className="flex items-center">
          {(segment) => (
            <DateSegment segment={segment} className={dateSegmentStyles}>
              {segment.type === "literal" ? (
                <span suppressHydrationWarning>{segment.text}</span>
              ) : undefined}
            </DateSegment>
          )}
        </DateInputPrimitive>
        <PickerButton variant={variant} />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover placement="bottom start">
        <Dialog className="outline-none">
          <RangeCalendar
            captionLayout={captionLayout}
            fromYear={fromYear}
            toYear={toYear}
          />
        </Dialog>
      </Popover>
    </DateRangePickerPrimitive>
  );
}
