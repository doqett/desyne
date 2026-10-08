"use client";

import type * as React from "react";
import {
  Dialog as DialogPrimitive,
  type DialogProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import {
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  overlayStyles,
} from "./dialog";

export const sheetVariants = tv({
  base: "fixed z-50 flex flex-col gap-4 bg-popover shadow-(--shadow-dialog) transition ease-out data-entering:animate-in data-exiting:animate-out data-entering:duration-300 data-exiting:duration-200",
  variants: {
    size: { sm: "", md: "", lg: "" },
    side: {
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-entering:slide-in-from-right data-exiting:slide-out-to-right",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-entering:slide-in-from-left data-exiting:slide-out-to-left",
      top: "inset-x-0 top-0 h-auto border-b data-entering:slide-in-from-top data-exiting:slide-out-to-top",
      bottom:
        "inset-x-0 bottom-0 h-auto border-t data-entering:slide-in-from-bottom data-exiting:slide-out-to-bottom",
    },
  },
  compoundVariants: [
    { side: ["left", "right"], size: "sm", class: "sm:max-w-xs" },
    { side: ["left", "right"], size: "md", class: "sm:max-w-sm" },
    { side: ["left", "right"], size: "lg", class: "sm:max-w-xl" },
  ],
  defaultVariants: { side: "right", size: "md" },
});

export interface SheetContentProps
  extends Omit<ModalOverlayProps, "children" | "className">,
    VariantProps<typeof sheetVariants> {
  className?: string;
  children?: DialogProps["children"];
  showCloseButton?: boolean;
  "aria-label"?: string;
}

export function SheetContent({
  side,
  size,
  className,
  children,
  showCloseButton = true,
  isDismissable = true,
  "aria-label": ariaLabel,
  ...props
}: SheetContentProps) {
  return (
    <ModalOverlay
      data-slot="sheet-overlay"
      isDismissable={isDismissable}
      {...props}
      className={overlayStyles}
    >
      <Modal
        data-slot="sheet-content"
        className={sheetVariants({ side, size, className })}
      >
        <DialogPrimitive
          aria-label={ariaLabel}
          className="relative flex h-full min-h-0 flex-col gap-0 overflow-y-auto outline-none"
        >
          {(opts) => (
            <>
              {typeof children === "function" ? children(opts) : children}
              {showCloseButton && <DialogCloseIcon />}
            </>
          )}
        </DialogPrimitive>
      </Modal>
    </ModalOverlay>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 border-b p-5 pr-12", className)}
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  DialogClose as SheetClose,
  DialogDescription as SheetDescription,
  DialogTitle as SheetTitle,
  DialogTrigger as SheetTrigger,
};
