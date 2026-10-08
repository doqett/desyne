"use client";

import { createContext, useContext } from "react";
import {
  Group,
  type GroupProps,
  Separator,
  type SeparatorProps,
  Toolbar as ToolbarPrimitive,
  type ToolbarProps as ToolbarPrimitiveProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

const toolbarVariants = tv({
  base: [
    "group/toolbar flex w-fit max-w-full gap-1 outline-none",
    "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:overflow-x-auto",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  ],
  variants: {
    variant: {
      /** No frame: sits in a header or above an editor. */
      plain: "",
      /** Bordered bar on the card surface. */
      outline: "rounded-lg border bg-card p-1 shadow-xs",
      /** Raised bar for floating over content (selection menus, canvases). */
      floating:
        "rounded-(--radius-box) border-(length:--border-width) bg-popover p-1 text-popover-foreground shadow-(--shadow-overlay)",
    },
  },
  defaultVariants: { variant: "plain" },
});

const OrientationContext = createContext<"horizontal" | "vertical">(
  "horizontal",
);

export interface ToolbarProps extends ToolbarPrimitiveProps {
  variant?: "plain" | "outline" | "floating";
}

/**
 * A row (or column) of controls that's one tab stop: Tab enters and leaves
 * the toolbar, arrow keys move between its controls.
 */
export function Toolbar({
  className,
  variant = "plain",
  orientation = "horizontal",
  ...props
}: ToolbarProps) {
  return (
    <OrientationContext.Provider value={orientation}>
      <ToolbarPrimitive
        data-slot="toolbar"
        data-variant={variant}
        orientation={orientation}
        {...props}
        className={composeTailwindRenderProps(
          className,
          toolbarVariants({ variant }),
        )}
      />
    </OrientationContext.Provider>
  );
}

/** Groups related controls. Give it an `aria-label` ("Text style", "Alignment"). */
export function ToolbarGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      data-slot="toolbar-group"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "flex shrink-0 gap-0.5 group-data-[orientation=horizontal]/toolbar:flex-row group-data-[orientation=horizontal]/toolbar:items-center group-data-[orientation=vertical]/toolbar:flex-col",
      )}
    />
  );
}

/**
 * A divider between groups. Its orientation is set by the toolbar
 * (vertical in a horizontal toolbar and vice versa).
 */
export function ToolbarSeparator({ className, ...props }: SeparatorProps) {
  const toolbarOrientation = useContext(OrientationContext);
  return (
    <Separator
      data-slot="toolbar-separator"
      orientation={
        toolbarOrientation === "horizontal" ? "vertical" : "horizontal"
      }
      {...props}
      className={cn(
        "shrink-0 border-0 bg-border",
        "group-data-[orientation=horizontal]/toolbar:mx-1 group-data-[orientation=horizontal]/toolbar:h-5 group-data-[orientation=horizontal]/toolbar:w-px",
        "group-data-[orientation=vertical]/toolbar:my-1 group-data-[orientation=vertical]/toolbar:h-px group-data-[orientation=vertical]/toolbar:w-auto",
        className,
      )}
    />
  );
}
