import type * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.ComponentProps<"div"> {
  /**
   * `pulse` fades in and out; `shimmer` sweeps a highlight across.
   * Both are dropped under `prefers-reduced-motion`, leaving a static block.
   */
  animation?: "pulse" | "shimmer" | "none";
}

export function Skeleton({
  className,
  animation = "pulse",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn(
        "rounded-md bg-muted",
        animation === "pulse" && "animate-pulse motion-reduce:animate-none",
        animation === "shimmer" &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.06] before:to-transparent motion-reduce:before:hidden",
        className,
      )}
      {...props}
    />
  );
}
