"use client";

import { XIcon } from "lucide-react";
import type * as React from "react";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  type DialogProps,
  DialogTrigger,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export const overlayStyles =
  "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-entering:fade-in-0 data-exiting:fade-out-0 data-entering:animate-in data-exiting:animate-out data-entering:duration-200 data-exiting:duration-150";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]",
} as const;

export interface DialogContentProps
  extends Omit<ModalOverlayProps, "children" | "className"> {
  className?: string;
  /** Max width: sm 384px · md 512px · lg 672px · xl 896px · full (viewport). */
  size?: keyof typeof sizes;
  children?: DialogProps["children"];
  role?: DialogProps["role"];
  showCloseButton?: boolean;
  "aria-label"?: string;
}

export function DialogCloseIcon({ className }: { className?: string }) {
  return (
    <ButtonPrimitive
      slot="close"
      aria-label="Close"
      className={cn(
        "absolute top-4 right-4 flex size-7 cursor-default items-center justify-center rounded-(--radius-control) text-muted-foreground outline-none transition-colors data-hovered:bg-muted data-hovered:text-foreground data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 [&_svg]:size-4",
        className,
      )}
    >
      <XIcon aria-hidden />
    </ButtonPrimitive>
  );
}

/** Centered modal. Put inside `<DialogTrigger>` next to the trigger button. */
export function DialogContent({
  className,
  size = "md",
  children,
  role,
  showCloseButton = true,
  isDismissable = true,
  "aria-label": ariaLabel,
  ...props
}: DialogContentProps) {
  const isAlert = role === "alertdialog";
  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable={isAlert ? false : isDismissable}
      {...props}
      className={cn(overlayStyles, "flex items-center justify-center p-4")}
    >
      <Modal
        data-slot="dialog-content"
        className={cn(
          "flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-(--radius-box) border-(length:--border-width) bg-popover shadow-(--shadow-dialog) data-entering:fade-in-0 data-entering:zoom-in-[0.97] data-entering:slide-in-from-bottom-2 data-exiting:fade-out-0 data-exiting:zoom-out-[0.97] data-entering:animate-in data-exiting:animate-out data-entering:duration-200 data-exiting:duration-150",
          sizes[size],
          className,
        )}
      >
        <DialogPrimitive
          role={role}
          aria-label={ariaLabel}
          className="relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6 outline-none"
        >
          {(opts) => (
            <>
              {typeof children === "function" ? children(opts) : children}
              {showCloseButton && !isAlert && <DialogCloseIcon />}
            </>
          )}
        </DialogPrimitive>
      </Modal>
    </ModalOverlay>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 pr-8 text-left", className)}
      {...props}
    />
  );
}

/** Colored icon badge for alert dialogs (danger, warning, success, info). */
export function DialogIcon({
  tone = "primary",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  tone?: "primary" | "danger" | "warning" | "success" | "info";
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary",
    danger: "bg-destructive/10 text-destructive",
    warning:
      "bg-warning/15 text-[color-mix(in_oklab,var(--warning),black_35%)] dark:text-warning",
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
  }[tone];
  return (
    <div
      data-slot="dialog-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full [&_svg]:size-5",
        toneClass,
        className,
      )}
      {...props}
    />
  );
}

/** Scrollable region between header and footer. Takes the remaining height. */
export function DialogBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "-mx-6 -my-1 min-h-0 flex-1 overflow-y-auto px-6 py-1 text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      data-slot="dialog-title"
      slot="title"
      {...props}
      className={cn(
        "font-(family-name:--font-heading) font-(weight:--heading-weight) text-base leading-tight",
        className,
      )}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

/** Button that closes the surrounding dialog. */
export function DialogClose({ variant = "outline", ...props }: ButtonProps) {
  return <Button slot="close" variant={variant} {...props} />;
}

export { DialogTrigger };
