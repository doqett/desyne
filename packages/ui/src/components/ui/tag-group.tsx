"use client";

import { XIcon } from "lucide-react";
import { createContext, type ReactNode, useContext } from "react";
import {
  Button,
  composeRenderProps,
  TagGroup as TagGroupPrimitive,
  type TagGroupProps as TagGroupPrimitiveProps,
  TagList,
  type TagListProps,
  Tag as TagPrimitive,
  type TagProps as TagPrimitiveProps,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";
import { Description, Label } from "./field";

const tagVariants = tv({
  base: [
    "inline-flex cursor-default items-center gap-1 border font-medium outline-none transition-colors",
    "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:opacity-50",
    "[&_svg:not([class*='size-'])]:size-3",
  ],
  variants: {
    variant: {
      soft: "border-(--tone)/20 bg-(--tone)/10 text-(--tone) data-hovered:bg-(--tone)/15",
      outline:
        "border-border bg-card text-foreground data-hovered:border-(--tone)/60",
    },
    size: {
      sm: "h-5 rounded-[calc(var(--radius-badge)*0.5)] px-1.5 text-[0.7rem]",
      md: "h-6 rounded-(--radius-badge) px-2 text-xs",
    },
    color: {
      primary: tones.primary,
      brand: tones.brand,
      neutral: tones.neutral,
      danger: tones.danger,
      success: tones.success,
      warning: tones.warning,
      info: tones.info,
    },
  },
  compoundVariants: [
    {
      variant: "soft",
      color: "neutral",
      class:
        "border-border bg-secondary text-secondary-foreground data-hovered:bg-secondary/70",
    },
    {
      variant: "soft",
      color: "warning",
      class:
        "text-[color-mix(in_oklab,var(--tone),black_38%)] dark:text-(--tone)",
    },
  ],
  defaultVariants: { variant: "outline", size: "md", color: "primary" },
});

// Selected tags always use the solid primary look.
const selected =
  "data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground";

interface TagStyle {
  variant?: "soft" | "outline";
  size?: "sm" | "md";
}
const TagStyleContext = createContext<TagStyle>({});

export interface TagGroupProps<T extends object>
  extends Omit<TagGroupPrimitiveProps, "children">,
    TagStyle {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
  renderEmptyState?: TagListProps<T>["renderEmptyState"];
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  variant,
  size,
  className,
  ...props
}: TagGroupProps<T>) {
  return (
    <TagStyleContext.Provider value={{ variant, size }}>
      <TagGroupPrimitive
        data-slot="tag-group"
        {...props}
        className={cn("group/field flex flex-col gap-2", className)}
      >
        {label && <Label>{label}</Label>}
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1.5"
        >
          {children}
        </TagList>
        {description && <Description>{description}</Description>}
        {errorMessage && (
          <Text slot="errorMessage" className="text-destructive text-xs">
            {errorMessage}
          </Text>
        )}
      </TagGroupPrimitive>
    </TagStyleContext.Provider>
  );
}

export interface TagProps extends TagPrimitiveProps {
  color?: Tone;
  variant?: "soft" | "outline";
  size?: "sm" | "md";
}

export function Tag({
  className,
  children,
  color,
  variant,
  size,
  ...props
}: TagProps) {
  const group = useContext(TagStyleContext);
  const textValue =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  const v = variant ?? group.variant ?? (color ? "soft" : "outline");
  return (
    <TagPrimitive
      data-slot="tag"
      textValue={textValue}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          tagVariants({
            variant: v,
            size: size ?? group.size,
            color: color ?? (v === "soft" ? "neutral" : "primary"),
          }),
          selected,
        ),
      )}
    >
      {composeRenderProps(children, (children, { allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              slot="remove"
              className="-mr-1 flex cursor-default items-center justify-center rounded-sm p-0.5 opacity-60 outline-none transition-opacity data-hovered:opacity-100 data-focus-visible:ring-2 data-focus-visible:ring-ring/30"
            >
              <XIcon aria-hidden className="size-3" />
            </Button>
          )}
        </>
      ))}
    </TagPrimitive>
  );
}
