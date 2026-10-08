"use client";

import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  TreeItemContent as TreeItemContentPrimitive,
  type TreeItemContentRenderProps,
  TreeItem as TreeItemPrimitive,
  type TreeItemProps as TreeItemPrimitiveProps,
  Tree as TreePrimitive,
  type TreeProps as TreePrimitiveProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

export interface TreeProps<T extends object> extends TreePrimitiveProps<T> {
  /** `plain` (default) has no frame; `bordered` wraps the tree in a card. */
  variant?: "plain" | "bordered";
}

/**
 * Hierarchical list with expandable items, built on React Aria's `Tree`.
 * Arrow keys move and expand/collapse, type-ahead jumps by name.
 */
export function Tree<T extends object>({
  className,
  variant = "plain",
  ...props
}: TreeProps<T>) {
  return (
    <TreePrimitive
      data-slot="tree"
      data-variant={variant}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "flex max-h-[inherit] flex-col gap-px overflow-auto outline-none data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
          "data-empty:p-6 data-empty:text-center data-empty:text-muted-foreground data-empty:text-sm",
          variant === "bordered" && "rounded-lg border bg-card p-1 shadow-xs",
        ),
      )}
    />
  );
}

export interface TreeItemProps<T extends object = object>
  extends Omit<TreeItemPrimitiveProps<T>, "textValue" | "title" | "children"> {
  /** The item's label. */
  title: ReactNode;
  /** Text for type-ahead and the accessible name. Required when `title` isn't a string. */
  textValue?: string;
  /** Leading icon. A function receives the item state, e.g. to swap an open/closed folder. */
  icon?: ReactNode | ((state: TreeItemContentRenderProps) => ReactNode);
  /** Trailing content: a count, a badge, a status dot or a small action button. */
  suffix?: ReactNode;
  /** Nested `TreeItem`s. */
  children?: ReactNode;
}

export function TreeItem<T extends object = object>({
  title,
  textValue,
  icon,
  suffix,
  className,
  children,
  ...props
}: TreeItemProps<T>) {
  return (
    <TreeItemPrimitive
      data-slot="tree-item"
      textValue={textValue ?? (typeof title === "string" ? title : "")}
      {...props}
      className={composeTailwindRenderProps(
        className,
        [
          "group/tree-item relative flex cursor-default select-none items-center rounded-md py-1 pr-2 pl-1 text-sm outline-none transition-colors",
          "data-hovered:bg-muted/60 data-selected:bg-accent data-selected:text-accent-foreground",
          "data-focus-visible:ring-2 data-focus-visible:ring-ring/30 data-focus-visible:ring-inset",
          "data-disabled:opacity-50",
        ].join(" "),
      )}
    >
      <TreeItemContentPrimitive>
        {(state) => {
          const {
            hasChildItems,
            selectionMode,
            selectionBehavior,
            isDisabled,
          } = state;
          return (
            <div
              data-slot="tree-item-content"
              className="flex min-w-0 flex-1 items-center gap-1.5"
            >
              {selectionMode !== "none" && selectionBehavior === "toggle" && (
                <Checkbox slot="selection" size="sm" className="mx-1" />
              )}
              {/* Indent: React Aria sets --tree-item-level (1-based) on the item. */}
              <span
                aria-hidden
                className="w-[calc((var(--tree-item-level,1)_-_1)_*_--spacing(4))] shrink-0"
              />
              {hasChildItems ? (
                <Button
                  slot="chevron"
                  isDisabled={isDisabled}
                  className="flex size-5 shrink-0 cursor-default items-center justify-center rounded-sm text-muted-foreground outline-none data-hovered:bg-foreground/5 data-focus-visible:ring-2 data-focus-visible:ring-ring/30"
                >
                  <ChevronRightIcon
                    aria-hidden
                    className="size-3.5 transition-transform duration-150 group-data-expanded/tree-item:rotate-90 rtl:rotate-180 rtl:group-data-expanded/tree-item:rotate-90 motion-reduce:transition-none"
                  />
                </Button>
              ) : (
                <span aria-hidden className="size-5 shrink-0" />
              )}
              {icon && (
                <span
                  data-slot="tree-item-icon"
                  className="flex shrink-0 items-center text-muted-foreground group-data-selected/tree-item:text-accent-foreground [&_svg:not([class*='size-'])]:size-4"
                >
                  {typeof icon === "function" ? icon(state) : icon}
                </span>
              )}
              <span
                data-slot="tree-item-title"
                className="min-w-0 flex-1 truncate"
              >
                {title}
              </span>
              {suffix && (
                <span
                  data-slot="tree-item-suffix"
                  className="ml-auto flex shrink-0 items-center gap-1 text-muted-foreground text-xs tabular-nums"
                >
                  {suffix}
                </span>
              )}
            </div>
          );
        }}
      </TreeItemContentPrimitive>
      {children}
    </TreeItemPrimitive>
  );
}
