"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  ComboBox as ComboBoxPrimitive,
  type ComboBoxProps as ComboBoxPrimitiveProps,
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
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDescription,
  ListBoxItemLabel,
  ListBoxSection,
} from "./list-box";
import { Popover } from "./popover";

export interface ComboBoxProps<T extends object>
  extends Omit<ComboBoxPrimitiveProps<T>, "children">,
    FieldVariantProps {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode | ((item: T) => ReactNode);
  /** Icon shown before the input. */
  prefix?: ReactNode;
  /** Shown when nothing matches the input. */
  emptyMessage?: ReactNode;
  /**
   * Keep the list open and show `emptyMessage` when nothing matches.
   * @default true
   */
  allowsEmptyCollection?: boolean;
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  children,
  items,
  prefix,
  emptyMessage = "No results",
  allowsEmptyCollection = true,
  variant,
  size,
  className,
  ...props
}: ComboBoxProps<T>) {
  return (
    <ComboBoxPrimitive
      data-slot="combobox"
      {...props}
      allowsEmptyCollection={allowsEmptyCollection}
      items={items}
      className={composeTailwindRenderProps(
        className,
        "group/field flex flex-col gap-1.5",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup variant={variant} size={size} className="pr-1">
        {prefix}
        <FieldInput placeholder={placeholder} />
        <Button className="flex size-6 cursor-default items-center justify-center rounded-sm text-muted-foreground outline-none data-hovered:bg-muted data-focus-visible:ring-2 data-focus-visible:ring-ring/30">
          <ChevronsUpDownIcon aria-hidden />
        </Button>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-(--trigger-width)">
        <ListBox
          className="border-0 bg-transparent"
          renderEmptyState={() => emptyMessage}
        >
          {children}
        </ListBox>
      </Popover>
    </ComboBoxPrimitive>
  );
}

export {
  ListBoxItem as ComboBoxItem,
  ListBoxItemDescription as ComboBoxItemDescription,
  ListBoxItemLabel as ComboBoxItemLabel,
  ListBoxSection as ComboBoxSection,
};
