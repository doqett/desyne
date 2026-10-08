"use client";

import type { ReactNode } from "react";
import {
  Separator as SeparatorPrimitive,
  type SeparatorProps as SeparatorPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends SeparatorPrimitiveProps {
  /** Text in the middle of a horizontal separator, e.g. "or". */
  label?: ReactNode;
  /** Where the label sits. */
  labelPosition?: "start" | "center" | "end";
  variant?: "solid" | "dashed";
}

export function Separator({
  className,
  orientation = "horizontal",
  label,
  labelPosition = "center",
  variant = "solid",
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    // RAC-only props that aren't valid on a <div>.
    const {
      elementType: _elementType,
      slot: _slot,
      render: _render,
      ...domProps
    } = props;
    return (
      // biome-ignore lint/a11y/useSemanticElements: <hr> can't contain a label
      <div
        role="separator"
        {...domProps}
        data-slot="separator"
        data-orientation="horizontal"
        className={cn(
          "flex w-full items-center gap-3 text-muted-foreground text-xs",
          "before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
          labelPosition === "start" && "before:max-w-4",
          labelPosition === "end" && "after:max-w-4",
          variant === "dashed" &&
            "before:bg-transparent before:bg-[length:6px_1px] before:bg-[linear-gradient(to_right,var(--border)_50%,transparent_0)] after:bg-transparent after:bg-[length:6px_1px] after:bg-[linear-gradient(to_right,var(--border)_50%,transparent_0)]",
          className,
        )}
      >
        {label}
      </div>
    );
  }
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      className={cn(
        "shrink-0 border-0",
        orientation === "vertical" ? "h-auto w-px self-stretch" : "h-px w-full",
        variant === "dashed"
          ? orientation === "vertical"
            ? "bg-[length:1px_6px] bg-[linear-gradient(to_bottom,var(--border)_50%,transparent_0)]"
            : "bg-[length:6px_1px] bg-[linear-gradient(to_right,var(--border)_50%,transparent_0)]"
          : "bg-border",
        className,
      )}
    />
  );
}
