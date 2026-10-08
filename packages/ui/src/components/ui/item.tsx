import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/**
 * A list row: media, a title with a quiet second line, and trailing actions.
 * Compose rows inside `ItemGroup`. Mirrors shadcn's Item API.
 */
export const itemVariants = tv({
  base: [
    "group/item flex w-full min-w-0 items-center gap-3 rounded-lg border border-transparent text-sm outline-none transition-colors",
    "[a&]:cursor-pointer [a&]:hover:bg-muted/70 [button&]:cursor-default [button&]:text-left [button&]:hover:bg-muted/70",
    "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring/25",
  ],
  variants: {
    variant: {
      default: "",
      /** Highlighted row (selected, hovered or featured). */
      muted: "bg-muted/80 dark:bg-muted/60",
      outline: "border-border bg-card",
    },
    size: {
      sm: "px-2.5 py-2",
      md: "px-3 py-2.5",
      lg: "px-4 py-3.5",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof itemVariants> {}

export function Item({ className, variant, size, ...props }: ItemProps) {
  return (
    <div
      data-slot="item"
      className={itemVariants({ variant, size, className })}
      {...props}
    />
  );
}

export function ItemGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

export function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-separator"
      className={cn("mx-3 h-px bg-border", className)}
      {...props}
    />
  );
}

const mediaVariants = tv({
  base: "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  variants: {
    variant: {
      default: "",
      /** Bordered square tile for an icon or logo mark. */
      icon: "size-9 rounded-lg border bg-card text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.04)] [&_svg:not([class*='size-'])]:size-4",
      /** Round tile, e.g. for brand marks. */
      round: "size-9 rounded-full [&_svg:not([class*='size-'])]:size-4",
      image:
        "size-10 overflow-hidden rounded-md bg-muted [&_img]:size-full [&_img]:object-cover",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ItemMediaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof mediaVariants> {}

export function ItemMedia({ className, variant, ...props }: ItemMediaProps) {
  return (
    <div
      data-slot="item-media"
      className={mediaVariants({ variant, className })}
      {...props}
    />
  );
}

export function ItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  );
}

export function ItemTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex min-w-0 items-center gap-1.5 truncate font-medium text-[0.8125rem] leading-tight",
        className,
      )}
      {...props}
    />
  );
}

export function ItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "truncate text-muted-foreground text-xs leading-tight",
        className,
      )}
      {...props}
    />
  );
}

export function ItemActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex shrink-0 items-center gap-1.5", className)}
      {...props}
    />
  );
}
