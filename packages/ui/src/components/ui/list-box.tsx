"use client";

import { CheckIcon } from "lucide-react";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps,
  ListBox as ListBoxPrimitive,
  type ListBoxProps,
  ListBoxSection as ListBoxSectionPrimitive,
  type ListBoxSectionProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

export function ListBox<T extends object>({
  className,
  ...props
}: ListBoxProps<T>) {
  return (
    <ListBoxPrimitive
      data-slot="list-box"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "flex max-h-[inherit] flex-col gap-px overflow-auto rounded-(--radius-overlay) border-(length:--border-width) bg-popover p-1 text-popover-foreground outline-none data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-empty:p-4 data-empty:text-center data-empty:text-muted-foreground data-empty:text-sm",
      )}
    />
  );
}

export const listBoxItemStyles = [
  "group/item relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-none",
  "data-focused:bg-muted data-hovered:bg-muted",
  "data-selected:bg-accent data-selected:font-medium data-selected:text-accent-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
].join(" ");

export function ListBoxItem<T extends object>({
  className,
  children,
  ...props
}: ListBoxItemProps<T>) {
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <ListBoxItemPrimitive
      data-slot="list-box-item"
      textValue={textValue}
      {...props}
      className={composeTailwindRenderProps(className, listBoxItemStyles)}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {children}
          {isSelected && (
            <span className="absolute right-2 flex size-4 items-center justify-center">
              <CheckIcon className="size-4 text-current" />
            </span>
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  );
}

/** Main label of a rich item (use with `ListBoxItemDescription`). */
export function ListBoxItemLabel({ className, ...props }: TextProps) {
  return <Text slot="label" {...props} className={cn("truncate", className)} />;
}

/** Secondary line of a rich item. */
export function ListBoxItemDescription({ className, ...props }: TextProps) {
  return (
    <Text
      slot="description"
      {...props}
      className={cn(
        "text-muted-foreground text-xs group-data-selected/item:text-accent-foreground/70",
        className,
      )}
    />
  );
}

export interface ListBoxSectionComponentProps<T extends object>
  extends ListBoxSectionProps<T> {
  title?: string;
}

export function ListBoxSection<T extends object>({
  title,
  className,
  children,
  items,
  ...props
}: ListBoxSectionComponentProps<T>) {
  return (
    <ListBoxSectionPrimitive
      data-slot="list-box-section"
      {...props}
      className={cn(
        "flex flex-col gap-px not-first:mt-1 not-first:border-t not-first:pt-1",
        className,
      )}
    >
      {title && (
        <Header className="px-2 pt-1.5 pb-1 font-medium text-[0.7rem] text-muted-foreground uppercase tracking-wide">
          {title}
        </Header>
      )}
      <Collection items={items}>{children}</Collection>
    </ListBoxSectionPrimitive>
  );
}
