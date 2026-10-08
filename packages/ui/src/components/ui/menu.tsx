"use client";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import type * as React from "react";
import {
  Collection,
  composeRenderProps,
  Header,
  Keyboard,
  MenuItem as MenuItemPrimitive,
  type MenuItemProps as MenuItemPrimitiveProps,
  Menu as MenuPrimitive,
  type MenuProps,
  MenuSection as MenuSectionPrimitive,
  type MenuSectionProps,
  MenuTrigger,
  Separator,
  type SeparatorProps,
  SubmenuTrigger,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Popover, type PopoverProps } from "./popover";

export interface MenuContentProps<T extends object> extends MenuProps<T> {
  placement?: PopoverProps["placement"];
  popoverClassName?: string;
}

/** Popover + Menu. Use inside `MenuTrigger` or as the second child of `SubmenuTrigger`. */
export function MenuContent<T extends object>({
  className,
  placement,
  popoverClassName,
  ...props
}: MenuContentProps<T>) {
  return (
    <Popover placement={placement} className={cn("min-w-44", popoverClassName)}>
      <MenuPrimitive
        data-slot="menu"
        {...props}
        className={composeTailwindRenderProps(
          className,
          "max-h-[inherit] overflow-auto p-1 outline-none",
        )}
      />
    </Popover>
  );
}

export interface MenuItemProps extends MenuItemPrimitiveProps {
  variant?: "default" | "destructive";
}

export function MenuItem({
  className,
  children,
  variant = "default",
  ...props
}: MenuItemProps) {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <MenuItemPrimitive
      data-slot="menu-item"
      data-variant={variant}
      textValue={textValue}
      {...props}
      className={composeTailwindRenderProps(
        className,
        [
          "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
          "data-focused:bg-muted data-open:bg-muted data-selected:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          "data-[variant=destructive]:text-destructive data-[variant=destructive]:data-focused:bg-destructive/10 data-[variant=destructive]:[&_svg]:text-destructive!",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        ].join(" "),
      )}
    >
      {composeRenderProps(
        children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {selectionMode !== "none" && (
              <span className="flex size-4 items-center justify-center">
                {isSelected &&
                  (selectionMode === "single" ? (
                    <CircleIcon
                      aria-hidden
                      className="size-2 fill-current text-current"
                    />
                  ) : (
                    <CheckIcon aria-hidden className="text-current" />
                  ))}
              </span>
            )}
            {children}
            {hasSubmenu && <ChevronRightIcon aria-hidden className="ml-auto" />}
          </>
        ),
      )}
    </MenuItemPrimitive>
  );
}

export interface MenuSectionComponentProps<T extends object>
  extends MenuSectionProps<T> {
  title?: string;
}

export function MenuSection<T extends object>({
  title,
  className,
  children,
  items,
  ...props
}: MenuSectionComponentProps<T>) {
  return (
    <MenuSectionPrimitive
      data-slot="menu-section"
      {...props}
      className={cn("flex flex-col", className)}
    >
      {title && (
        <Header className="px-2 pt-1.5 pb-1 font-medium text-[0.7rem] text-muted-foreground uppercase tracking-wide">
          {title}
        </Header>
      )}
      <Collection items={items}>{children}</Collection>
    </MenuSectionPrimitive>
  );
}

export function MenuSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      data-slot="menu-separator"
      {...props}
      className={cn("-mx-1 my-1 h-px border-0 bg-border", className)}
    />
  );
}

export function MenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      data-slot="menu-shortcut"
      {...props}
      className={cn(
        "ml-auto font-sans text-muted-foreground text-xs tracking-widest",
        className,
      )}
    />
  );
}

export { MenuTrigger, SubmenuTrigger };
