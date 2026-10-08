"use client";

import type { ReactNode } from "react";
import {
  composeRenderProps,
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupProps as RadioGroupPrimitiveProps,
  Radio as RadioPrimitive,
  type RadioProps as RadioPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Description, FieldError, Label } from "./field";

export interface RadioGroupProps
  extends Omit<RadioGroupPrimitiveProps, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children?: ReactNode;
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-2.5",
      )}
    >
      {label && <Label>{label}</Label>}
      {description && (
        <Description className="-mt-1">{description}</Description>
      )}
      <div className="flex flex-col gap-3 group-data-[orientation=horizontal]/field:flex-row group-data-[orientation=horizontal]/field:flex-wrap group-data-[orientation=horizontal]/field:gap-x-5">
        {children}
      </div>
      <FieldError>{errorMessage}</FieldError>
    </RadioGroupPrimitive>
  );
}

const dot = [
  "flex size-4 shrink-0 items-center justify-center rounded-full border-(length:--border-width) border-(--field-border) bg-(--field-bg) shadow-(--field-shadow) transition-[border-color,box-shadow]",
  "group-data-hovered/radio:border-brand group-data-selected/radio:border-brand",
  "group-data-focus-visible/radio:ring-(length:--ring-width) group-data-focus-visible/radio:ring-ring/25 group-data-invalid/radio:border-destructive",
].join(" ");

export interface RadioProps extends RadioPrimitiveProps {
  /** Secondary text under the label. */
  description?: ReactNode;
}

export function Radio({
  className,
  children,
  description,
  ...props
}: RadioProps) {
  return (
    <RadioPrimitive
      data-slot="radio"
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/radio flex gap-2 text-sm leading-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
          description ? "items-start" : "items-center",
        ),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          <span className={cn(dot, description && "mt-px")}>
            <span className="size-2 scale-0 rounded-full bg-brand transition-transform duration-150 group-data-selected/radio:scale-100" />
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
    </RadioPrimitive>
  );
}

export interface RadioCardProps extends RadioPrimitiveProps {
  title: ReactNode;
  description?: ReactNode;
  /** Icon or media shown on the leading side. */
  icon?: ReactNode;
}

/** A radio rendered as a selectable card — for plans, options and settings. */
export function RadioCard({
  className,
  title,
  description,
  icon,
  ...props
}: RadioCardProps) {
  return (
    <RadioPrimitive
      data-slot="radio-card"
      {...props}
      className={composeTailwindRenderProps(
        className,
        [
          "group/radio relative flex cursor-default items-start gap-3 rounded-lg border bg-card p-3.5 text-sm shadow-xs outline-none transition-[border-color,background-color,box-shadow]",
          "data-hovered:border-brand/50",
          "data-selected:border-brand data-selected:bg-brand/[0.04] data-selected:ring-1 data-selected:ring-brand",
          "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:opacity-50",
        ].join(" "),
      )}
    >
      {icon && (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground group-data-selected/radio:bg-brand/10 group-data-selected/radio:text-brand [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-medium leading-none">{title}</span>
        {description && (
          <span className="text-muted-foreground text-xs leading-snug">
            {description}
          </span>
        )}
      </span>
      <span className={dot}>
        <span className="size-2 scale-0 rounded-full bg-brand transition-transform duration-150 group-data-selected/radio:scale-100" />
      </span>
    </RadioPrimitive>
  );
}
