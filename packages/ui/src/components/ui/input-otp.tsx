"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

export interface InputOTPGroupProps extends React.ComponentProps<"div"> {
  /** `joined` slots share borders (default); `separated` slots are individual boxes. */
  variant?: "joined" | "separated";
}

export function InputOTPGroup({
  className,
  variant = "joined",
  ...props
}: InputOTPGroupProps) {
  return (
    <div
      data-slot="input-otp-group"
      data-variant={variant}
      className={cn(
        "group/otp flex items-center",
        variant === "separated" && "gap-2",
        className,
      )}
      {...props}
    />
  );
}

export function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const context = React.useContext(OTPInputContext);
  const { char, placeholderChar, hasFakeCaret, isActive } =
    context?.slots[index] ?? {};
  // input-otp only exposes placeholderChar while the whole input is empty.
  const showPlaceholder = char == null && placeholderChar && !hasFakeCaret;
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-placeholder={showPlaceholder || undefined}
      className={cn(
        "relative flex size-(--control-h-lg) items-center justify-center border-(--field-border) bg-(--field-bg) font-medium text-base tabular-nums shadow-(--field-shadow) outline-none transition-[border-color,box-shadow]",
        "group-data-[variant=joined]/otp:border-y group-data-[variant=joined]/otp:border-r group-data-[variant=joined]/otp:first:rounded-l-(--radius-control) group-data-[variant=joined]/otp:first:border-l group-data-[variant=joined]/otp:last:rounded-r-(--radius-control)",
        "group-data-[variant=separated]/otp:rounded-(--radius-control) group-data-[variant=separated]/otp:border-(length:--border-width)",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-(length:--ring-width) data-[active=true]:ring-ring/20",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    >
      {showPlaceholder ? (
        <span aria-hidden className="text-muted-foreground/60">
          {placeholderChar}
        </span>
      ) : (
        char
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground" />
        </div>
      )}
    </div>
  );
}

export function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: matches shadcn markup; <hr> cannot hold an icon
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="text-muted-foreground"
      {...props}
    >
      <MinusIcon className="size-4" />
    </div>
  );
}
