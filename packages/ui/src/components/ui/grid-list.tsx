"use client";

import { GripVerticalIcon } from "lucide-react";
import type * as React from "react";
import {
  Button,
  composeRenderProps,
  GridListItem as GridListItemPrimitive,
  type GridListItemProps,
  GridList as GridListPrimitive,
  type GridListProps as GridListPrimitiveProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

export interface GridListProps<T extends object>
  extends GridListPrimitiveProps<T> {
  /** `bordered` (default) wraps the list in a card; `plain` has no frame; `separated` draws a line between items. */
  variant?: "bordered" | "plain" | "separated";
}

export function GridList<T extends object>({
  className,
  variant = "bordered",
  ...props
}: GridListProps<T>) {
  return (
    <GridListPrimitive
      data-slot="grid-list"
      data-variant={variant}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group/list flex max-h-[inherit] flex-col overflow-auto outline-none data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
          "data-empty:p-8 data-empty:text-center data-empty:text-muted-foreground data-empty:text-sm",
          variant === "bordered" &&
            "gap-px rounded-lg border bg-card p-1 shadow-xs",
          variant === "separated" && "divide-y rounded-lg border bg-card",
          variant === "plain" && "gap-px",
        ),
      )}
    />
  );
}

export function GridListItem({
  className,
  children,
  ...props
}: GridListItemProps) {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <GridListItemPrimitive
      data-slot="grid-list-item"
      textValue={textValue}
      {...props}
      className={composeTailwindRenderProps(
        className,
        [
          "group/item relative flex cursor-default select-none items-center gap-3 rounded-md px-3 py-2 text-sm outline-none transition-colors",
          "group-data-[variant=separated]/list:rounded-none group-data-[variant=separated]/list:py-3",
          "data-hovered:bg-muted/60 data-selected:bg-accent data-selected:text-accent-foreground",
          "data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset data-disabled:opacity-50",
          "data-dragging:opacity-50",
        ].join(" "),
      )}
    >
      {composeRenderProps(
        children,
        (children, { selectionMode, selectionBehavior, allowsDragging }) => (
          <>
            {allowsDragging && (
              <Button
                slot="drag"
                className="-ml-1 cursor-grab text-muted-foreground outline-none"
              >
                <GripVerticalIcon aria-hidden className="size-4" />
              </Button>
            )}
            {selectionMode !== "none" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
            {children}
          </>
        ),
      )}
    </GridListItemPrimitive>
  );
}

export function GridListItemLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="grid-list-item-label"
      {...props}
      className={cn("truncate font-medium", className)}
    />
  );
}

export function GridListItemDescription({ className, ...props }: TextProps) {
  return (
    <Text
      slot="description"
      {...props}
      className={cn("truncate text-muted-foreground text-xs", className)}
    />
  );
}
