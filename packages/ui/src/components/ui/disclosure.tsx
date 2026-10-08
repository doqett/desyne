"use client";

import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { createContext, type ReactNode, useContext } from "react";
import {
  Button,
  DisclosureGroup as DisclosureGroupPrimitive,
  type DisclosureGroupProps as DisclosureGroupPrimitiveProps,
  DisclosurePanel as DisclosurePanelPrimitive,
  type DisclosurePanelProps,
  Disclosure as DisclosurePrimitive,
  type DisclosureProps,
  Heading,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

type Variant = "line" | "card" | "separated";
const VariantContext = createContext<Variant>("line");

const styles = tv({
  slots: {
    group: "w-full",
    item: "group/disclosure",
    trigger:
      "flex flex-1 cursor-default items-center justify-between gap-4 text-left font-medium text-sm outline-none transition-colors data-disabled:opacity-50 data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
    panel: "text-muted-foreground",
  },
  variants: {
    variant: {
      line: {
        item: "border-b last:border-b-0",
        trigger: "rounded-sm py-3.5 data-hovered:text-brand",
        panel: "pb-4",
      },
      card: {
        group: "overflow-hidden rounded-lg border bg-card",
        item: "border-b last:border-b-0",
        trigger:
          "px-4 py-3 data-hovered:bg-muted/50 group-data-expanded/disclosure:bg-muted/40",
        panel: "border-t px-4 py-3",
      },
      separated: {
        group: "flex flex-col gap-2",
        item: "rounded-lg border bg-card shadow-xs transition-shadow data-expanded:shadow-sm",
        trigger: "rounded-lg px-4 py-3",
        panel: "px-4 pb-4",
      },
    },
  },
  defaultVariants: { variant: "line" },
});

export interface DisclosureGroupProps extends DisclosureGroupPrimitiveProps {
  /** `line` (dividers), `card` (one bordered card) or `separated` (a card per item). */
  variant?: Variant;
}

/** Accordion: groups `Disclosure`s. Set `allowsMultipleExpanded` to open several at once. */
export function DisclosureGroup({
  className,
  variant = "line",
  ...props
}: DisclosureGroupProps) {
  return (
    <VariantContext.Provider value={variant}>
      <DisclosureGroupPrimitive
        data-slot="disclosure-group"
        {...props}
        className={composeTailwindRenderProps(
          className,
          styles({ variant }).group(),
        )}
      />
    </VariantContext.Provider>
  );
}

export function Disclosure({ className, ...props }: DisclosureProps) {
  const variant = useContext(VariantContext);
  return (
    <DisclosurePrimitive
      data-slot="disclosure"
      {...props}
      className={composeTailwindRenderProps(
        className,
        styles({ variant }).item(),
      )}
    />
  );
}

export interface DisclosureTriggerProps {
  className?: string;
  children: ReactNode;
  /** `chevron` rotates; `plus` turns into a cross. */
  indicator?: "chevron" | "plus";
}

export function DisclosureTrigger({
  className,
  children,
  indicator = "chevron",
}: DisclosureTriggerProps) {
  const variant = useContext(VariantContext);
  return (
    <Heading className="flex">
      <Button
        slot="trigger"
        className={cn(styles({ variant }).trigger(), className)}
      >
        <span className="flex items-center gap-2 [&_svg]:size-4 [&_svg]:text-muted-foreground">
          {children}
        </span>
        {indicator === "chevron" ? (
          <ChevronDownIcon
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-expanded/disclosure:rotate-180"
          />
        ) : (
          <PlusIcon
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-expanded/disclosure:rotate-45"
          />
        )}
      </Button>
    </Heading>
  );
}

export function DisclosurePanel({
  className,
  children,
  ...props
}: DisclosurePanelProps) {
  const variant = useContext(VariantContext);
  return (
    <DisclosurePanelPrimitive
      data-slot="disclosure-panel"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "h-(--disclosure-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out motion-reduce:transition-none",
      )}
    >
      <div className={styles({ variant }).panel()}>{children}</div>
    </DisclosurePanelPrimitive>
  );
}
