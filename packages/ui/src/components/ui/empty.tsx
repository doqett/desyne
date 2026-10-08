import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/**
 * An empty state: media, a title, a short explanation and the next action.
 * Same anatomy style as `Item` and `Card`; works in server components.
 */
export const emptyVariants = tv({
  base: "flex w-full min-w-0 flex-col items-center justify-center text-balance text-center",
  variants: {
    variant: {
      default: "",
      /** Dashed outline, e.g. inside a page section or a drop target. */
      outline: "rounded-(--radius-box) border border-border border-dashed",
      /** Muted fill, for empty panels inside cards. */
      muted: "rounded-(--radius-box) bg-muted/60",
    },
    size: {
      sm: "gap-3 p-6",
      md: "gap-4 p-8",
      lg: "gap-5 p-12",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface EmptyProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof emptyVariants> {}

export function Empty({ className, variant, size, ...props }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={emptyVariants({ variant, size, className })}
      {...props}
    />
  );
}

const mediaVariants = tv({
  base: "mb-1 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      /** No surface: an illustration, avatar group or large icon. */
      default:
        "[&_svg:not([class*='size-'])]:size-8 [&_svg]:text-muted-foreground",
      /** Bordered 40px tile, like `ItemMedia variant="icon"` at a larger size. */
      icon: "size-10 rounded-lg border bg-card text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.04)] [&_svg:not([class*='size-'])]:size-5",
      /** Soft round badge. */
      round:
        "size-12 rounded-full bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface EmptyMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof mediaVariants> {}

export function EmptyMedia({ className, variant, ...props }: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-media"
      aria-hidden
      className={mediaVariants({ variant, className })}
      {...props}
    />
  );
}

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-(family-name:--font-heading) font-(weight:--heading-weight) text-base text-foreground leading-tight tracking-(--heading-tracking)",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "-mt-2 max-w-sm text-muted-foreground text-sm leading-relaxed [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-actions"
      className={cn(
        "mt-1 flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  );
}
