"use client";

import { SearchIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  Keyboard,
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import {
  Description,
  FieldError,
  FieldGroup,
  FieldInput,
  type FieldVariantProps,
  Label,
} from "./field";

export interface SearchFieldProps
  extends SearchFieldPrimitiveProps,
    FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** Keyboard hint shown while the field is empty, e.g. "⌘K". */
  shortcut?: string;
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder = "Search…",
  shortcut,
  variant,
  size,
  className,
  ...props
}: SearchFieldProps) {
  return (
    <SearchFieldPrimitive
      data-slot="search-field"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup variant={variant} size={size}>
        <SearchIcon aria-hidden />
        <FieldInput placeholder={placeholder} />
        {shortcut && (
          <Keyboard className="pointer-events-none hidden h-5 select-none items-center rounded-[calc(var(--radius-badge)*0.5)] border bg-muted px-1.5 font-medium font-sans text-[0.7rem] text-muted-foreground group-data-empty/field:inline-flex">
            {shortcut}
          </Keyboard>
        )}
        <Button className="-mr-1 flex size-5 cursor-default items-center justify-center rounded-sm text-muted-foreground outline-none data-hovered:bg-muted data-hovered:text-foreground data-focus-visible:ring-2 data-focus-visible:ring-ring/30 group-data-empty/field:hidden">
          <XIcon aria-hidden className="size-3.5!" />
        </Button>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  );
}
