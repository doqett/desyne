"use client";

import type * as React from "react";
import {
  FieldError as FieldErrorPrimitive,
  type FieldErrorProps,
  Group,
  type GroupProps,
  Input as InputPrimitive,
  type InputProps as InputPrimitiveProps,
  Label as LabelPrimitive,
  type LabelProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

/**
 * Shared look for every text-like control (inputs, selects, pickers).
 * `variant`: outline (default) · filled · underlined — `size`: sm · md (default) · lg.
 * Styles key off React Aria's data attributes on the wrapping element
 * (`data-hovered`, `data-focus-within`, `data-invalid`, `data-disabled`).
 */
export const fieldVariants = tv({
  base: [
    "relative flex w-full min-w-0 items-center text-sm transition-[color,background-color,border-color,box-shadow] outline-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ],
  variants: {
    variant: {
      outline: [
        "rounded-(--radius-control) border-(length:--border-width) border-(--field-border) bg-(--field-bg) shadow-(--field-shadow)",
        "data-hovered:border-ring/60",
        "data-focus-within:border-ring data-focus-within:ring-(length:--ring-width) data-focus-within:ring-ring/20",
        "data-invalid:border-destructive data-invalid:data-focus-within:ring-destructive/20",
        "data-disabled:bg-muted",
      ],
      filled: [
        "rounded-(--radius-control) border-(length:--border-width) border-transparent bg-muted",
        "data-hovered:bg-muted/70 dark:data-hovered:bg-muted/80",
        "data-focus-within:border-ring data-focus-within:bg-card data-focus-within:ring-(length:--ring-width) data-focus-within:ring-ring/20",
        "data-invalid:border-destructive data-invalid:data-focus-within:ring-destructive/20",
      ],
      underlined: [
        "rounded-none border-input border-b bg-transparent px-0!",
        "data-hovered:border-foreground/40",
        "data-focus-within:border-ring data-focus-within:shadow-[inset_0_-1px_0_var(--ring)]",
        "data-invalid:border-destructive",
      ],
    },
    size: {
      sm: "h-(--control-h-sm) gap-1.5 px-(--control-px-xs) text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-(--control-h-md) gap-2 px-(--control-px-sm)",
      lg: "h-(--control-h-lg) gap-2 px-(--control-px-md) text-base",
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});

export type FieldVariantProps = VariantProps<typeof fieldVariants>;

/** Styles for an `<input>` that sits inside a `FieldGroup` (the group draws the chrome). */
export const bareInputStyles =
  "h-full w-full min-w-0 flex-1 bg-transparent text-inherit outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden";

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      {...props}
      className={cn(
        "flex w-fit select-none items-center gap-1.5 font-medium text-foreground text-sm leading-none",
        "group-data-disabled/field:cursor-not-allowed group-data-disabled/field:opacity-60",
        "group-data-required/field:after:text-destructive group-data-required/field:after:content-['*']",
        className,
      )}
    />
  );
}

export function Description({ className, ...props }: TextProps) {
  return (
    <Text
      data-slot="description"
      slot="description"
      {...props}
      className={cn("text-muted-foreground text-xs leading-relaxed", className)}
    />
  );
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldErrorPrimitive
      data-slot="field-error"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "text-destructive text-xs leading-relaxed",
      )}
    />
  );
}

export interface FieldGroupProps extends GroupProps, FieldVariantProps {}

/** Input chrome that can hold adornments (icons, buttons, text) around a bare input. */
export function FieldGroup({
  className,
  variant,
  size,
  ...props
}: FieldGroupProps) {
  return (
    <Group
      data-slot="field-group"
      {...props}
      className={composeTailwindRenderProps(
        className,
        fieldVariants({ variant, size }),
      )}
    />
  );
}

/** Bare input for use inside `FieldGroup`. */
export function FieldInput({ className, ...props }: InputPrimitiveProps) {
  return (
    <InputPrimitive
      data-slot="field-input"
      {...props}
      className={composeTailwindRenderProps(className, bareInputStyles)}
    />
  );
}

/** Same visuals as `fieldVariants`, keyed off the input's own `data-focused` attribute. */
export const inputVariants = tv({
  base: [
    "flex w-full min-w-0 text-sm transition-[color,background-color,border-color,box-shadow] outline-none placeholder:text-muted-foreground",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ],
  variants: {
    variant: {
      outline: [
        "rounded-(--radius-control) border-(length:--border-width) border-(--field-border) bg-(--field-bg) shadow-(--field-shadow)",
        "data-hovered:border-ring/60",
        "data-focused:border-ring data-focused:ring-(length:--ring-width) data-focused:ring-ring/20",
        "data-invalid:border-destructive data-invalid:data-focused:ring-destructive/20",
        "data-disabled:bg-muted",
      ],
      filled: [
        "rounded-(--radius-control) border-(length:--border-width) border-transparent bg-muted",
        "data-hovered:bg-muted/70",
        "data-focused:border-ring data-focused:bg-card data-focused:ring-(length:--ring-width) data-focused:ring-ring/20",
        "data-invalid:border-destructive",
      ],
      underlined: [
        "rounded-none border-input border-b bg-transparent px-0!",
        "data-hovered:border-foreground/40",
        "data-focused:border-ring data-focused:shadow-[inset_0_-1px_0_var(--ring)]",
        "data-invalid:border-destructive",
      ],
    },
    size: {
      sm: "h-(--control-h-sm) px-(--control-px-xs) text-xs",
      md: "h-(--control-h-md) px-(--control-px-sm)",
      lg: "h-(--control-h-lg) px-(--control-px-md) text-base",
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});

export interface InputProps
  extends Omit<InputPrimitiveProps, "size">,
    FieldVariantProps {}

/** Standalone styled input (no adornments). */
export function Input({ className, variant, size, ...props }: InputProps) {
  return (
    <InputPrimitive
      data-slot="input"
      {...props}
      className={composeTailwindRenderProps(
        className,
        inputVariants({ variant, size }),
      )}
    />
  );
}

/** Small inline adornment (prefix/suffix text or icon) inside a `FieldGroup`. */
export function FieldAddon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="field-addon"
      className={cn(
        "flex shrink-0 select-none items-center text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
