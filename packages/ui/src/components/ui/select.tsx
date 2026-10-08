"use client";

import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  Select as SelectPrimitive,
  type SelectProps as SelectPrimitiveProps,
  SelectValue,
  type ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import {
  Description,
  FieldError,
  type FieldVariantProps,
  fieldVariants,
  Label,
} from "./field";
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDescription,
  ListBoxItemLabel,
  ListBoxSection,
} from "./list-box";
import { Popover } from "./popover";

export interface SelectProps<T extends object>
  extends Omit<SelectPrimitiveProps<T>, "children">,
    FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
  /** Icon shown before the value. */
  prefix?: ReactNode;
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  prefix,
  variant,
  size,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <SelectPrimitive
      data-slot="select"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <Button
        className={cn(
          fieldVariants({ variant, size }),
          "cursor-default text-left data-focus-visible:border-ring data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/20 data-pressed:border-ring",
          "group-data-invalid/field:border-destructive group-data-open/field:border-ring group-data-open/field:ring-(length:--ring-width) group-data-open/field:ring-ring/20",
        )}
      >
        {prefix}
        <SelectValue className="flex min-w-0 flex-1 items-center gap-2 truncate data-placeholder:text-muted-foreground [&_[slot=description]]:hidden" />
        <ChevronDownIcon
          aria-hidden
          className="transition-transform duration-150 group-data-open/field:rotate-180"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox items={items} className="border-0 bg-transparent">
          {children}
        </ListBox>
      </Popover>
    </SelectPrimitive>
  );
}

export {
  ListBoxItem as SelectItem,
  ListBoxItemDescription as SelectItemDescription,
  ListBoxItemLabel as SelectItemLabel,
  ListBoxSection as SelectSection,
};
