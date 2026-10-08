"use client";

import type { ReactNode } from "react";
import {
  TextField as TextFieldPrimitive,
  type TextFieldProps as TextFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import {
  Description,
  FieldAddon,
  FieldError,
  FieldGroup,
  FieldInput,
  type FieldVariantProps,
  Label,
} from "./field";

export interface TextFieldProps
  extends TextFieldPrimitiveProps,
    FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** Icon or text shown before the input. */
  prefix?: ReactNode;
  /** Icon, text or button shown after the input. */
  suffix?: ReactNode;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  variant,
  size,
  className,
  ...props
}: TextFieldProps) {
  return (
    <TextFieldPrimitive
      data-slot="text-field"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup variant={variant} size={size}>
        {prefix && <FieldAddon>{prefix}</FieldAddon>}
        <FieldInput placeholder={placeholder} />
        {suffix && <FieldAddon>{suffix}</FieldAddon>}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  );
}
