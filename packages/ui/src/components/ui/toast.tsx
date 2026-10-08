"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import * as React from "react";
import {
  Toaster as Sonner,
  type ToasterProps as SonnerProps,
  type ToastClassnames,
  toast,
} from "sonner";
import { cn } from "@/lib/utils";

const defaultClassNames: ToastClassnames = {
  toast:
    "!rounded-(--radius-overlay) !border-(length:--border-width) !shadow-lg !shadow-black/5 !gap-2.5",
  description: "!text-muted-foreground",
  actionButton:
    "!bg-primary !text-primary-foreground !rounded-(--radius-control) !font-(weight:--button-weight)",
  cancelButton: "!bg-muted !text-muted-foreground !rounded-(--radius-control)",
  success: "[&_[data-icon]]:!text-success",
  error: "[&_[data-icon]]:!text-destructive",
  warning: "[&_[data-icon]]:!text-warning",
  info: "[&_[data-icon]]:!text-info",
};

const defaultIcons: NonNullable<SonnerProps["icons"]> = {
  success: <CircleCheckIcon className="size-4" />,
  info: <InfoIcon className="size-4" />,
  warning: <TriangleAlertIcon className="size-4" />,
  error: <OctagonXIcon className="size-4" />,
  loading: (
    <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" />
  ),
};

const defaultStyle = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius-overlay)",
} as React.CSSProperties;

function mergeClassNames(
  base: ToastClassnames,
  extra: ToastClassnames | undefined,
): ToastClassnames {
  if (!extra) return base;
  const merged: ToastClassnames = { ...base };
  for (const key of Object.keys(extra) as (keyof ToastClassnames)[]) {
    merged[key] = cn(base[key], extra[key]);
  }
  return merged;
}

/** Follows the `.dark` class on `<html>`, the same switch the theme tokens use. */
function subscribeToColorMode(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}
const getColorMode = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerColorMode = () => "light" as const;

export interface ToasterProps extends SonnerProps {
  /**
   * Color scheme for sonner's built-in palettes (`richColors`, `invert`).
   * By default it follows the `.dark` class on `<html>`, like the theme tokens.
   * `"system"` follows `prefers-color-scheme` instead.
   */
  theme?: SonnerProps["theme"];
}

/**
 * Mount once near the root of your app, then call `toast()` anywhere.
 * `toastOptions`, `icons`, `style` and `className` are merged with the
 * built-in theme rather than replacing it.
 */
export function Toaster({
  theme,
  className,
  style,
  icons,
  toastOptions,
  ...props
}: ToasterProps) {
  const colorMode = React.useSyncExternalStore(
    subscribeToColorMode,
    getColorMode,
    getServerColorMode,
  );
  return (
    <Sonner
      theme={theme ?? colorMode}
      className={cn("toaster group", className)}
      toastOptions={{
        ...toastOptions,
        classNames: mergeClassNames(
          defaultClassNames,
          toastOptions?.classNames,
        ),
      }}
      icons={{ ...defaultIcons, ...icons }}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
}

export { toast };
