import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const cardVariants = tv({
  base: "group/card flex flex-col rounded-(--radius-box) text-card-foreground",
  variants: {
    variant: {
      outline:
        "border-(length:--border-width) border-border/80 bg-card shadow-(--shadow-box)",
      elevated:
        "border-(length:--border-width) border-border/60 bg-card shadow-(--shadow-elevated)",
      filled: "bg-muted",
      ghost: "",
    },
    size: {
      sm: "gap-3 py-3 [--card-px:--spacing(3)]",
      md: "gap-4 py-4 [--card-px:--spacing(4)]",
      lg: "gap-6 py-6 [--card-px:--spacing(6)]",
    },
    isInteractive: {
      true: "cursor-pointer transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-sm",
    },
  },
  defaultVariants: { variant: "outline", size: "md" },
});

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  variant,
  size,
  isInteractive,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cardVariants({ variant, size, isInteractive, className })}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.ComponentProps<"div"> {
  /** Draws an inset hairline under the header, aligned with the card's content. */
  separator?: boolean;
}

export function CardHeader({
  className,
  separator,
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      data-separator={separator || undefined}
      className={cn(
        "@container/card-header relative grid auto-rows-min grid-rows-[auto_auto] items-start gap-0.5 px-(--card-px) has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
        "data-separator:pb-3 data-separator:after:absolute data-separator:after:inset-x-(--card-px) data-separator:after:bottom-0 data-separator:after:h-px data-separator:after:bg-border",
        className,
      )}
      {...props}
    />
  );
}

/** Title. A leading icon (any svg child) is sized and spaced automatically. */
export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "min-h-6 font-(family-name:--font-heading) font-(weight:--title-weight) text-sm leading-6 has-[>svg]:flex has-[>svg]:items-center has-[>svg]:gap-2 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-foreground/70",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 flex min-h-6 items-center gap-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-px)", className)}
      {...props}
    />
  );
}

/** Inset surface inside a card: previews, code, media, empty areas. */
export function CardInset({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-inset"
      className={cn("rounded-lg bg-muted/80 dark:bg-muted/60", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-(--card-px) [.border-t]:pt-4",
        className,
      )}
      {...props}
    />
  );
}
