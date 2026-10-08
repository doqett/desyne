"use client";

import {
  composeRenderProps,
  Dialog,
  type DialogProps,
  DialogTrigger,
  Heading,
  type HeadingProps,
  OverlayArrow,
  Popover as PopoverPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export const popoverStyles = [
  "z-50 rounded-(--radius-overlay) border-(length:--border-width) bg-popover text-popover-foreground shadow-(--shadow-overlay) outline-none",
  "data-entering:fade-in-0 data-entering:zoom-in-[0.97] data-entering:animate-in data-entering:duration-150",
  "data-exiting:fade-out-0 data-exiting:zoom-out-[0.97] data-exiting:animate-out data-exiting:duration-100",
  "data-[placement=bottom]:slide-in-from-top-1 data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1",
].join(" ");

export interface PopoverProps extends PopoverPrimitiveProps {
  showArrow?: boolean;
}

export function Popover({
  className,
  showArrow,
  offset,
  children,
  ...props
}: PopoverProps) {
  return (
    <PopoverPrimitive
      data-slot="popover"
      offset={offset ?? (showArrow ? 10 : 4)}
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(popoverStyles, className),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {showArrow && (
            <OverlayArrow className="group">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                aria-hidden
                className="block fill-popover stroke-border group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}
          {children}
        </>
      ))}
    </PopoverPrimitive>
  );
}

/** Content wrapper for non-menu popovers (adds padding + dialog semantics). */
export function PopoverDialog({ className, ...props }: DialogProps) {
  return (
    <Dialog
      data-slot="popover-dialog"
      {...props}
      className={cn("w-72 p-4 outline-none", className)}
    />
  );
}

/** Title for a popover dialog; announced as its accessible name. */
export function PopoverTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      data-slot="popover-title"
      slot="title"
      {...props}
      className={cn(
        "font-(family-name:--font-heading) font-(weight:--heading-weight) text-sm leading-none",
        className,
      )}
    />
  );
}

export { DialogTrigger as PopoverTrigger };
