"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import {
  Description,
  FieldError,
  FieldGroup,
  FieldInput,
  type FieldVariantProps,
  Label,
} from "./field";

export interface NumberFieldProps
  extends NumberFieldPrimitiveProps,
    FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** `stacked`: chevrons on the right (default). `split`: − and + on either side. `none`: no steppers. */
  stepper?: "stacked" | "split" | "none";
}

const stepButton =
  "flex cursor-default items-center justify-center text-muted-foreground outline-none transition-colors data-hovered:bg-muted data-hovered:text-foreground data-pressed:bg-accent data-pressed:text-accent-foreground data-disabled:opacity-40 data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset";

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  variant,
  size,
  stepper = "stacked",
  className,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldPrimitive
      data-slot="number-field"
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
        className={cn("overflow-hidden", stepper !== "none" && "px-0")}
      >
        {stepper === "split" && (
          <Button
            slot="decrement"
            className={cn(
              stepButton,
              "h-full w-(--control-h-md) border-input border-r [&_svg]:size-3.5!",
            )}
          >
            <MinusIcon aria-hidden />
          </Button>
        )}
        <FieldInput
          placeholder={placeholder}
          className={cn(
            "tabular-nums",
            stepper === "split" ? "text-center" : "px-(--control-px-sm)",
            stepper === "none" && "px-0",
          )}
        />
        {stepper === "split" && (
          <Button
            slot="increment"
            className={cn(
              stepButton,
              "h-full w-(--control-h-md) border-input border-l [&_svg]:size-3.5!",
            )}
          >
            <PlusIcon aria-hidden />
          </Button>
        )}
        {stepper === "stacked" && (
          <div className="flex h-full w-6 flex-col border-input border-l">
            <Button
              slot="increment"
              className={cn(stepButton, "flex-1 [&_svg]:size-3!")}
            >
              <ChevronUpIcon aria-hidden />
            </Button>
            <Button
              slot="decrement"
              className={cn(
                stepButton,
                "flex-1 border-input border-t [&_svg]:size-3!",
              )}
            >
              <ChevronDownIcon aria-hidden />
            </Button>
          </div>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  );
}
