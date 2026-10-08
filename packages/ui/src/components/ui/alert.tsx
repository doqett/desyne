"use client";

import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import type * as React from "react";
import { Button } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { type Tone, tones } from "@/lib/primitive";
import { cn } from "@/lib/utils";

export const alertVariants = tv({
  base: [
    "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm",
    "[&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-(--tone)",
  ],
  variants: {
    variant: {
      soft: "border-(--tone)/25 bg-(--tone)/[0.07] text-foreground",
      outline: "border-border bg-card text-card-foreground",
      /** Accent bar on the leading edge. */
      accent:
        "border-border border-l-[3px] border-l-(--tone) bg-card text-card-foreground",
      solid:
        "border-transparent bg-(--tone) text-(--tone-fg) [&>svg]:text-(--tone-fg) [&_[data-slot=alert-description]]:text-(--tone-fg)/85",
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
    { variant: "soft", color: "neutral", class: "border-border bg-muted/60" },
    {
      color: "warning",
      variant: ["soft", "outline", "accent"],
      class: "[&>svg]:text-[color-mix(in_oklab,var(--tone),black_25%)]",
    },
  ],
  defaultVariants: { variant: "soft", color: "info" },
});

const icons: Partial<
  Record<Tone, React.ComponentType<{ className?: string }>>
> = {
  info: InfoIcon,
  primary: InfoIcon,
  brand: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  danger: CircleAlertIcon,
};

type LegacyVariant = "default" | "destructive";

export interface AlertProps
  extends Omit<React.ComponentProps<"div">, "color">,
    Omit<VariantProps<typeof alertVariants>, "variant"> {
  /** `default` / `destructive` are shadcn aliases. */
  variant?: VariantProps<typeof alertVariants>["variant"] | LegacyVariant;
  /** Show the tone's default icon (ignored when `icon` is set). */
  showIcon?: boolean;
  /** A custom leading icon; sized and tinted like the default icons. */
  icon?: React.ReactNode;
  /** Renders a close button. */
  onDismiss?: () => void;
  /** Buttons or links on the trailing side. */
  action?: React.ReactNode;
}

export function Alert({
  className,
  variant,
  color,
  showIcon,
  icon,
  onDismiss,
  action,
  children,
  ...props
}: AlertProps) {
  const isLegacy = variant === "default" || variant === "destructive";
  const v = isLegacy ? "outline" : variant;
  const c: Tone =
    color ??
    (variant === "destructive"
      ? "danger"
      : variant === "default"
        ? "neutral"
        : "info");
  const Icon = showIcon ? icons[c] : undefined;
  // Urgent tones interrupt (assertive); everything else is announced politely.
  // An explicit `role` in props wins because it is spread after this.
  const role = c === "danger" || c === "warning" ? "alert" : "status";
  return (
    <div
      data-slot="alert"
      role={role}
      className={alertVariants({ variant: v, color: c, className })}
      {...props}
    >
      {icon ?? (Icon && <Icon />)}
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {action && (
        <div className="flex shrink-0 items-center gap-2 self-center">
          {action}
        </div>
      )}
      {onDismiss && (
        <Button
          aria-label="Dismiss"
          onPress={onDismiss}
          className="-mt-0.5 -mr-1.5 flex size-6 shrink-0 cursor-default items-center justify-center rounded-md opacity-60 outline-none transition-opacity data-hovered:bg-black/5 data-hovered:opacity-100 data-focus-visible:ring-2 data-focus-visible:ring-ring/30 dark:data-hovered:bg-white/10"
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}

export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-(family-name:--font-heading) font-(weight:--title-weight) leading-5 tracking-(--heading-tracking)",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground text-sm leading-relaxed [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}
