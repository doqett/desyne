"use client";

import {
  composeRenderProps,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  type TooltipProps as TooltipPrimitiveProps,
  type TooltipTriggerComponentProps,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

export function TooltipTrigger({
  delay = 400,
  closeDelay = 100,
  ...props
}: TooltipTriggerComponentProps) {
  return (
    <TooltipTriggerPrimitive delay={delay} closeDelay={closeDelay} {...props} />
  );
}

const tooltipVariants = tv({
  slots: {
    root: [
      "z-50 w-fit max-w-xs text-balance rounded-md px-2.5 py-1.5 text-xs leading-snug shadow-md",
      "data-entering:fade-in-0 data-entering:zoom-in-95 data-entering:animate-in data-entering:duration-100",
      "data-exiting:fade-out-0 data-exiting:zoom-out-95 data-exiting:animate-out data-exiting:duration-75",
      "data-[placement=bottom]:slide-in-from-top-1 data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1",
    ],
    arrow:
      "block group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90",
  },
  variants: {
    variant: {
      /** Dark chip (default). */
      default: {
        root: "bg-foreground text-background",
        arrow: "fill-foreground",
      },
      /** Light card with a border — for richer content. */
      light: {
        root: "border bg-popover text-popover-foreground",
        arrow: "fill-popover stroke-border",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

export interface TooltipProps extends TooltipPrimitiveProps {
  variant?: "default" | "light";
  showArrow?: boolean;
}

export function Tooltip({
  className,
  children,
  offset = 8,
  variant,
  showArrow = true,
  ...props
}: TooltipProps) {
  const { root, arrow } = tooltipVariants({ variant });
  return (
    <TooltipPrimitive
      data-slot="tooltip"
      offset={offset}
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(root(), className),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {showArrow && (
            <OverlayArrow className="group">
              <svg
                width={8}
                height={8}
                viewBox="0 0 8 8"
                aria-hidden
                className={arrow()}
              >
                <path d="M0 0 L4 4 L8 0" />
              </svg>
            </OverlayArrow>
          )}
          {children}
        </>
      ))}
    </TooltipPrimitive>
  );
}
