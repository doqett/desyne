"use client";

import type * as React from "react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
  type InputProps as InputPrimitiveProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { FieldGroup, type FieldGroupProps, FieldInput } from "./field";

/*
 * InputGroup is the `FieldGroup` chrome (a React Aria `Group`) with zero padding,
 * so addons can be flush segments. Put it inside a React Aria `TextField`,
 * `NumberField` or `SearchField` and the focus ring wraps the whole group.
 */

export interface InputGroupProps extends FieldGroupProps {}

const paddings = {
  sm: "[--ig-px:var(--control-px-xs)]",
  md: "[--ig-px:var(--control-px-sm)]",
  lg: "[--ig-px:var(--control-px-md)]",
};

export function InputGroup({
  className,
  size,
  variant,
  ...props
}: InputGroupProps) {
  return (
    <FieldGroup
      data-slot="input-group"
      size={size}
      variant={variant}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "overflow-hidden px-0!",
          // Underlined fields have no side borders, so content sits flush.
          variant === "underlined" ? "[--ig-px:0px]" : paddings[size ?? "md"],
        ),
      )}
    />
  );
}

/** The text input inside an `InputGroup`. Receives value, label and validation from the field. */
export function InputGroupInput({ className, ...props }: InputPrimitiveProps) {
  return (
    <FieldInput
      data-slot="input-group-input"
      {...props}
      className={composeTailwindRenderProps(
        className,
        // Own padding at the edges; 2px extra next to a segment (the group gap supplies the rest).
        "first:ps-(--ig-px) last:pe-(--ig-px) [&:has(+[data-variant=segment])]:pe-0.5 [[data-variant=segment]+&]:ps-0.5",
      )}
    />
  );
}

const addonVariants = tv({
  base: "flex shrink-0 select-none items-center gap-1.5 whitespace-nowrap text-muted-foreground [&_svg]:pointer-events-none",
  variants: {
    variant: {
      /** Text or icon inside the field, e.g. a search icon or "kg". */
      inline: "first:ps-(--ig-px) last:pe-(--ig-px)",
      /** Flush, tinted segment divided by a border, e.g. "https://" or ".com". */
      segment:
        "self-stretch border-input bg-muted/60 px-(--ig-px) first:border-e last:border-s dark:bg-muted/40",
    },
  },
  defaultVariants: { variant: "inline" },
});

export interface InputGroupAddonProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof addonVariants> {}

export function InputGroupAddon({
  className,
  variant,
  ...props
}: InputGroupAddonProps) {
  return (
    <span
      data-slot="input-group-addon"
      data-variant={variant ?? "inline"}
      className={addonVariants({ variant, className })}
      {...props}
    />
  );
}

export interface InputGroupButtonProps
  extends ButtonPrimitiveProps,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  /**
   * `ghost` (default) sits inside the field; `segment` is a flush, full-height
   * button divided by a border.
   */
  variant?: "ghost" | "segment";
}

/** A button attached to the input: copy, reveal, clear, submit… */
export function InputGroupButton({
  className,
  variant = "ghost",
  size = "icon-xs",
  color = "neutral",
  ...props
}: InputGroupButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="input-group-button"
      data-variant={variant}
      {...props}
      className={composeRenderProps(className, (className) =>
        variant === "segment"
          ? cn(
              buttonVariants({
                variant: "ghost",
                color,
                size: size === "icon-xs" ? "sm" : size,
              }),
              "h-auto self-stretch rounded-none border-0 border-input px-(--ig-px) first:border-e last:border-s",
              "data-focus-visible:ring-0 data-focus-visible:bg-muted",
              className,
            )
          : cn(
              buttonVariants({ variant: "ghost", color, size }),
              "first:ms-1 last:me-1",
              className,
            ),
      )}
    />
  );
}
