"use client";

import type * as React from "react";
import { Keyboard } from "react-aria-components";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.ComponentProps<typeof Keyboard> {
  size?: "sm" | "md";
}

export function Kbd({ className, size = "md", ...props }: KbdProps) {
  return (
    <Keyboard
      data-slot="kbd"
      {...props}
      className={cn(
        "pointer-events-none inline-flex w-fit select-none items-center justify-center gap-1 rounded-[calc(var(--radius-badge)*0.5)] border border-b-2 bg-muted font-medium font-sans text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        size === "sm"
          ? "h-4.5 min-w-4.5 px-1 text-[0.65rem]"
          : "h-5.5 min-w-5.5 px-1.5 text-xs",
        className,
      )}
    />
  );
}

export function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}
