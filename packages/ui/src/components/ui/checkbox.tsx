"use client";

import { CheckIcon, MinusIcon } from "lucide-react";
import type { ReactNode, Ref } from "react";
import {
  CheckboxButton,
  type CheckboxButtonProps,
  CheckboxField,
  type CheckboxFieldProps,
  CheckboxGroup as CheckboxGroupPrimitive,
  type CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  composeRenderProps,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Description, FieldError, Label } from "./field";

/**
 * The indicator box. It lives inside the `CheckboxButton` (`<label>`), which
 * carries every interaction attribute (`data-hovered`, `data-pressed`,
 * `data-focus-visible`, `data-selected`, …), so it styles off `group/checkbox`.
 */
const boxVariants = tv({
  base: [
    "flex shrink-0 items-center justify-center rounded-(--radius-checkbox) border-(length:--border-width) border-(--field-border) bg-(--field-bg) text-transparent shadow-(--field-shadow) transition-[color,background-color,border-color,box-shadow]",
    "group-data-hovered/checkbox:border-brand",
    "group-data-selected/checkbox:border-brand group-data-selected/checkbox:bg-brand group-data-selected/checkbox:text-brand-foreground",
    "group-data-indeterminate/checkbox:border-brand group-data-indeterminate/checkbox:bg-brand group-data-indeterminate/checkbox:text-brand-foreground",
    "group-data-focus-visible/checkbox:ring-(length:--ring-width) group-data-focus-visible/checkbox:ring-ring/25",
    "group-data-invalid/checkbox:border-destructive group-data-invalid/checkbox:group-data-selected/checkbox:bg-destructive",
  ],
  variants: {
    size: {
      sm: "size-3.5 [&_svg]:size-2.5",
      md: "size-4 [&_svg]:size-3",
      lg: "size-5 [&_svg]:size-3.5",
    },
  },
  defaultVariants: { size: "md" },
});

/** Left offset of text that sits under the label (box width + gap). */
const indent = {
  sm: "ms-5.5",
  md: "ms-6",
  lg: "ms-7",
} as const;

export interface CheckboxProps
  extends Omit<
      CheckboxFieldProps,
      "children" | "className" | "style" | "render"
    >,
    Pick<
      CheckboxButtonProps,
      | "children"
      | "className"
      | "style"
      | "render"
      | "onHoverStart"
      | "onHoverEnd"
      | "onHoverChange"
    > {
  size?: "sm" | "md" | "lg";
  /** Secondary text under the label. Linked to the input with `aria-describedby`. */
  description?: ReactNode;
  /** Replaces the default validation message of a standalone checkbox. */
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** Ref to the `<label>` (the `CheckboxButton`). */
  ref?: Ref<HTMLLabelElement>;
}

/**
 * A checkbox built on React Aria's `CheckboxField` + `CheckboxButton`.
 *
 * - `CheckboxField` (`<div data-slot="checkbox-field">`) owns the state, the
 *   hidden input's ARIA wiring, the description slot and the field error.
 * - `CheckboxButton` (`<label data-slot="checkbox">`) is the clickable area
 *   (box + label + description) and receives `className`, `style`, `render`,
 *   `children` and hover handlers, exactly like the old `Checkbox` root.
 */
export function Checkbox({
  className,
  style,
  render,
  children,
  size,
  description,
  errorMessage,
  onHoverStart,
  onHoverEnd,
  onHoverChange,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField
      data-slot="checkbox-field"
      {...props}
      className="group/checkbox-field flex flex-col gap-1.5"
    >
      <CheckboxButton
        data-slot="checkbox"
        ref={ref}
        style={style}
        render={render}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onHoverChange={onHoverChange}
        className={composeTailwindRenderProps(
          className,
          cn(
            "group/checkbox flex gap-2 text-sm leading-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
            description ? "items-start" : "items-center",
            size === "lg" && "text-base",
          ),
        )}
      >
        {composeRenderProps(children, (children, { isIndeterminate }) => (
          <>
            <span
              data-slot="checkbox-indicator"
              className={cn(boxVariants({ size }), description && "mt-px")}
            >
              {isIndeterminate ? (
                <MinusIcon aria-hidden strokeWidth={3} />
              ) : (
                <CheckIcon aria-hidden strokeWidth={3} />
              )}
            </span>
            {description ? (
              <span className="flex flex-col gap-1">
                <span className="font-medium">{children}</span>
                {/* Inside the label so the whole card stays clickable. It is
                    aria-hidden so it isn't repeated in the accessible name,
                    and still announced through aria-describedby. */}
                <Text
                  slot="description"
                  data-slot="description"
                  aria-hidden
                  className="text-muted-foreground text-xs leading-snug"
                >
                  {description}
                </Text>
              </span>
            ) : (
              children
            )}
          </>
        ))}
      </CheckboxButton>
      {/* Renders only for a standalone checkbox; inside a CheckboxGroup the
          group shows a single error message instead. */}
      <FieldError className={indent[size ?? "md"]}>{errorMessage}</FieldError>
    </CheckboxField>
  );
}

export interface CheckboxGroupProps
  extends Omit<CheckboxGroupPrimitiveProps, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
}

export function CheckboxGroup({
  label,
  description,
  errorMessage,
  orientation = "vertical",
  children,
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
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
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical"
            ? "flex-col"
            : "flex-row flex-wrap gap-x-5",
        )}
      >
        {children}
      </div>
      <FieldError>{errorMessage}</FieldError>
    </CheckboxGroupPrimitive>
  );
}
