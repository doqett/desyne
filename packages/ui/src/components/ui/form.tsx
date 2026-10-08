"use client";

import type * as React from "react";
import { useId } from "react";
import {
  Form as FormPrimitive,
  type FormProps as FormPrimitiveProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const formVariants = tv({
  base: "w-full",
  variants: {
    layout: {
      /** Fields stacked top to bottom. */
      vertical: "flex flex-col",
      /** Fields in a row that wraps, aligned to the bottom (filters, newsletter sign-up). */
      inline: "flex flex-row flex-wrap items-end",
    },
    gap: {
      sm: "gap-3",
      md: "gap-5",
      lg: "gap-8",
    },
  },
  defaultVariants: { layout: "vertical", gap: "md" },
});

export interface FormProps
  extends FormPrimitiveProps,
    VariantProps<typeof formVariants> {}

/**
 * React Aria `Form` with spacing. Fields inside it share `validationBehavior`
 * (default `"aria"`: errors show live, submit isn't blocked by the browser) and
 * pick up `validationErrors` (e.g. from the server) by their `name`.
 */
export function Form({
  className,
  layout,
  gap,
  validationBehavior = "aria",
  ...props
}: FormProps) {
  return (
    <FormPrimitive
      data-slot="form"
      data-layout={layout ?? "vertical"}
      validationBehavior={validationBehavior}
      {...props}
      className={formVariants({ layout, gap, className })}
    />
  );
}

export interface FormSectionProps
  extends Omit<React.ComponentProps<"fieldset">, "title"> {
  /** Rendered as the fieldset's `<legend>`, so it names the group for screen readers. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /**
   * `stacked`: title above the fields.
   * `aside`: title and description in a left column on wide screens (settings pages).
   */
  layout?: "stacked" | "aside";
}

/** A titled group of related fields, rendered as `<fieldset>` + `<legend>`. */
export function FormSection({
  title,
  description,
  layout = "stacked",
  className,
  children,
  ...props
}: FormSectionProps) {
  const generatedId = useId();
  const descriptionId = description
    ? `${props.id ?? generatedId}-description`
    : undefined;
  const aside = layout === "aside";
  return (
    <fieldset
      data-slot="form-section"
      data-layout={layout}
      aria-describedby={descriptionId}
      {...props}
      className={cn(
        "m-0 grid min-w-0 grid-cols-1 border-0 p-0",
        aside && "md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-x-10",
        className,
      )}
    >
      {title && (
        // Floating the legend takes it out of the fieldset border, so it lays
        // out like any grid item while still naming the group.
        <legend
          data-slot="form-section-title"
          className="float-left w-full p-0 font-(family-name:--font-heading) font-(weight:--heading-weight) text-base text-foreground leading-snug md:col-start-1"
        >
          {title}
        </legend>
      )}
      {description && (
        <p
          id={descriptionId}
          data-slot="form-section-description"
          className={cn(
            "mt-1 text-muted-foreground text-sm leading-relaxed",
            aside && "md:col-start-1",
          )}
        >
          {description}
        </p>
      )}
      <div
        data-slot="form-section-content"
        className={cn(
          "flex min-w-0 flex-col gap-4",
          (title || description) && "mt-4",
          aside && "md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}

export interface FormRowProps extends React.ComponentProps<"div"> {
  /** Columns on wide screens. The row stacks to one column on small screens. */
  columns?: 2 | 3 | 4;
}

/** Puts fields side by side (first and last name, city / state / zip). */
export function FormRow({ columns = 2, className, ...props }: FormRowProps) {
  return (
    <div
      data-slot="form-row"
      className={cn(
        "grid grid-cols-1 items-start gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

export interface FormActionsProps extends React.ComponentProps<"div"> {
  /** Where the buttons sit. `between` pushes the first child to the start. */
  align?: "start" | "end" | "between";
  /** Draws a hairline above the actions and adds top padding. */
  separator?: boolean;
}

/** Footer row for submit / cancel buttons. */
export function FormActions({
  align = "end",
  separator,
  className,
  ...props
}: FormActionsProps) {
  return (
    <div
      data-slot="form-actions"
      data-separator={separator || undefined}
      className={cn(
        "flex flex-wrap items-center gap-2",
        align === "start" && "justify-start",
        align === "end" && "justify-end",
        align === "between" && "justify-between",
        separator && "border-t pt-4",
        className,
      )}
      {...props}
    />
  );
}
