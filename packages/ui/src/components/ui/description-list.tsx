import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/*
 * No "use client": works in server components. Layout is driven by the `<dl>`;
 * terms and details are its direct children, in pairs.
 */

export const descriptionListVariants = tv({
  base: "group/dl grid text-sm",
  variants: {
    layout: {
      /** Term in a narrow column, details beside it. Stacks below `sm`. */
      horizontal:
        "grid-cols-1 sm:grid-cols-[minmax(7rem,var(--dl-term-width,33%))_1fr] sm:gap-x-6",
      /** Term above details. */
      stacked: "grid-cols-1",
    },
    divided: {
      true: "",
      false: "",
    },
    size: {
      sm: "text-[0.8125rem] [--dl-py:--spacing(2)]",
      md: "[--dl-py:--spacing(3)]",
    },
  },
  compoundVariants: [
    // Plain spacing between pairs.
    {
      layout: "horizontal",
      divided: false,
      class:
        "gap-y-1 sm:gap-y-(--dl-py) [&>dt:not(:first-of-type)]:mt-(--dl-py) sm:[&>dt:not(:first-of-type)]:mt-0",
    },
    {
      layout: "stacked",
      divided: false,
      class: "gap-y-1 [&>dt:not(:first-of-type)]:mt-(--dl-py)",
    },
    // Hairlines between pairs.
    {
      layout: "horizontal",
      divided: true,
      class: [
        "[&>dt]:border-border/70 [&>dt]:border-t [&>dt]:pt-(--dl-py) [&>dd]:pt-1 [&>dd]:pb-(--dl-py)",
        "sm:gap-x-0 sm:[&>dd]:border-border/70 sm:[&>dd]:border-t sm:[&>dd]:pt-(--dl-py) sm:[&>dt]:pr-6 sm:[&>dt]:pb-(--dl-py)",
        "[&>dt:first-of-type]:border-t-0 sm:[&>dd:first-of-type]:border-t-0",
      ],
    },
    {
      layout: "stacked",
      divided: true,
      class:
        "[&>dt]:border-border/70 [&>dt]:border-t [&>dt]:pt-(--dl-py) [&>dd]:pt-1 [&>dd]:pb-(--dl-py) [&>dt:first-of-type]:border-t-0",
    },
  ],
  defaultVariants: { layout: "horizontal", divided: false, size: "md" },
});

export interface DescriptionListProps
  extends React.ComponentProps<"dl">,
    VariantProps<typeof descriptionListVariants> {}

/** Key–value details, e.g. the fields of a record on a detail page. */
export function DescriptionList({
  className,
  layout,
  divided,
  size,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      data-slot="description-list"
      data-layout={layout ?? "horizontal"}
      className={descriptionListVariants({ layout, divided, size, className })}
      {...props}
    />
  );
}

export function DescriptionTerm({
  className,
  ...props
}: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn("min-w-0 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DescriptionDetails({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-details"
      className={cn(
        "min-w-0 text-foreground [overflow-wrap:anywhere]",
        className,
      )}
      {...props}
    />
  );
}
