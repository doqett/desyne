import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";

/*
 * No "use client": the timeline is static markup and works in server components.
 * Parts read the root's `data-variant` / `data-connector` through the `group/timeline` group.
 */

export const timelineVariants = tv({
  base: "group/timeline flex flex-col text-sm",
  variants: {
    variant: {
      /** 28px indicators, title and time on one line, content below. */
      default:
        "[--timeline-gap:--spacing(6)] [--timeline-indicator:--spacing(7)]",
      /** 20px indicators and tighter spacing, for dense activity feeds. */
      compact:
        "[--timeline-gap:--spacing(3.5)] [--timeline-indicator:--spacing(5)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface TimelineProps
  extends React.ComponentProps<"ol">,
    VariantProps<typeof timelineVariants> {
  /** Draws a line between indicators. Default true. */
  connector?: boolean;
}

export function Timeline({
  className,
  variant,
  connector = true,
  ...props
}: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      data-variant={variant ?? "default"}
      data-connector={connector}
      className={timelineVariants({ variant, className })}
      {...props}
    />
  );
}

export function TimelineItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("group/timeline-item relative flex gap-3", className)}
      {...props}
    />
  );
}

const indicatorVariants = tv({
  base: "relative z-10 flex size-(--timeline-indicator) shrink-0 items-center justify-center rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    kind: {
      dot: "",
      icon: "group-data-[variant=compact]/timeline:[&_svg:not([class*='size-'])]:size-3 [&_svg:not([class*='size-'])]:size-3.5",
      media: "overflow-hidden [&_img]:size-full [&_img]:object-cover",
    },
    toned: { true: "", false: "" },
  },
  compoundVariants: [
    {
      kind: "icon",
      toned: false,
      class:
        "border bg-card text-muted-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
    },
    { kind: "icon", toned: true, class: "bg-(--tone)/12 text-(--tone)" },
  ],
});

export interface TimelineIndicatorProps
  extends Omit<React.ComponentProps<"div">, "color"> {
  /** Colors the dot or icon tile. Omit for a neutral outline. */
  color?: Tone;
  /** `icon` (default with children) draws a tile; `media` lets an image or avatar fill the circle. */
  variant?: "icon" | "media";
}

/**
 * The marker column: a dot (no children), an icon tile or an image, plus the connector
 * line down to the next item.
 */
export function TimelineIndicator({
  className,
  color,
  variant,
  children,
  ...props
}: TimelineIndicatorProps) {
  const kind = children ? (variant ?? "icon") : "dot";
  return (
    <div
      data-slot="timeline-indicator"
      aria-hidden
      className="flex w-(--timeline-indicator) shrink-0 flex-col items-center"
    >
      <div
        className={cn(
          indicatorVariants({ kind, toned: !!color }),
          color && tones[color],
          className,
        )}
        {...props}
      >
        {kind === "dot" ? (
          <span
            data-slot="timeline-dot"
            className={cn(
              "size-2.5 rounded-full",
              color
                ? "bg-(--tone) ring-4 ring-(--tone)/15"
                : "border-2 border-muted-foreground/40 bg-card",
            )}
          />
        ) : (
          children
        )}
      </div>
      <span
        data-slot="timeline-connector"
        className="my-1 w-px group-data-[variant=compact]/timeline:my-0 flex-1 bg-border group-last/timeline-item:hidden group-data-[connector=false]/timeline:invisible"
      />
    </div>
  );
}

export function TimelineContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1 pt-[calc((var(--timeline-indicator)-1.25rem)/2)] pb-(--timeline-gap) group-last/timeline-item:pb-0",
        className,
      )}
      {...props}
    />
  );
}

/** Title and time on one row; the time is pushed to the end. */
export function TimelineHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-header"
      className={cn(
        "flex min-h-5 flex-wrap items-baseline gap-x-2 gap-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function TimelineTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(
        "min-w-0 text-foreground leading-5 [&_strong]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

/** A `<time>` element; pass `dateTime` with a machine-readable value. */
export function TimelineTime({
  className,
  ...props
}: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn(
        "ml-auto shrink-0 text-muted-foreground text-xs tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-description"
      className={cn(
        "text-muted-foreground leading-relaxed group-data-[variant=compact]/timeline:text-xs",
        className,
      )}
      {...props}
    />
  );
}
