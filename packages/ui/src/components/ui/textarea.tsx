"use client";

import { type ReactNode, useState } from "react";
import {
  TextArea as TextAreaPrimitive,
  type TextAreaProps,
  TextField as TextFieldPrimitive,
  type TextFieldProps,
  type ValidationResult,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { Description, FieldError, Label } from "./field";

export const textareaVariants = tv({
  base: [
    "flex min-h-20 w-full text-sm transition-[color,background-color,border-color,box-shadow] outline-none placeholder:text-muted-foreground",
    "data-disabled:cursor-not-allowed data-disabled:opacity-60",
  ],
  variants: {
    variant: {
      outline: [
        "rounded-(--radius-control) border-(length:--border-width) border-(--field-border) bg-(--field-bg) px-(--control-px-sm) py-2 shadow-(--field-shadow)",
        "data-hovered:border-ring/60 data-focused:border-ring data-focused:ring-(length:--ring-width) data-focused:ring-ring/20",
        "data-invalid:border-destructive data-invalid:data-focused:ring-destructive/20 data-disabled:bg-muted",
      ],
      filled: [
        "rounded-(--radius-control) border-(length:--border-width) border-transparent bg-muted px-(--control-px-sm) py-2",
        "data-hovered:bg-muted/70 data-focused:border-ring data-focused:bg-card data-focused:ring-(length:--ring-width) data-focused:ring-ring/20",
        "data-invalid:border-destructive",
      ],
      underlined: [
        "rounded-none border-input border-b bg-transparent px-0 py-2",
        "data-hovered:border-foreground/40 data-focused:border-ring data-focused:shadow-[inset_0_-1px_0_var(--ring)]",
        "data-invalid:border-destructive",
      ],
    },
    resize: {
      none: "resize-none",
      vertical: "resize-y",
      auto: "field-sizing-content resize-none",
    },
  },
  defaultVariants: { variant: "outline", resize: "vertical" },
});

export interface TextareaProps
  extends TextAreaProps,
    VariantProps<typeof textareaVariants> {}

export function Textarea({
  className,
  variant,
  resize,
  ...props
}: TextareaProps) {
  return (
    <TextAreaPrimitive
      data-slot="textarea"
      {...props}
      className={composeTailwindRenderProps(
        className,
        textareaVariants({ variant, resize }),
      )}
    />
  );
}

export interface TextareaFieldProps
  extends TextFieldProps,
    VariantProps<typeof textareaVariants> {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  rows?: number;
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** Shows a live character count when `maxLength` is set. */
  showCount?: boolean;
}

export function TextareaField({
  label,
  description,
  errorMessage,
  placeholder,
  rows,
  variant,
  resize,
  showCount,
  className,
  onChange,
  ...props
}: TextareaFieldProps) {
  // Track the length ourselves so the count also works uncontrolled.
  const [uncontrolledLength, setUncontrolledLength] = useState(
    () => (props.defaultValue ?? "").length,
  );
  const count =
    props.value !== undefined ? props.value.length : uncontrolledLength;
  return (
    <TextFieldPrimitive
      data-slot="textarea-field"
      {...props}
      onChange={(value) => {
        setUncontrolledLength(value.length);
        onChange?.(value);
      }}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <Textarea
        placeholder={placeholder}
        rows={rows}
        variant={variant}
        resize={resize}
      />
      {(description || (showCount && props.maxLength)) && (
        <div className="flex items-start justify-between gap-3">
          {description ? <Description>{description}</Description> : <span />}
          {showCount && props.maxLength && (
            <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
              {count}/{props.maxLength}
            </span>
          )}
        </div>
      )}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  );
}
