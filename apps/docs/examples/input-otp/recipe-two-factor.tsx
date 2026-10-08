"use client";

import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ShieldCheckIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPRecipeTwoFactor() {
  const [mode, setMode] = useState<"app" | "recovery">("app");
  const [error, setError] = useState(false);
  const length = mode === "app" ? 6 : 10;
  const slots = Array.from({ length }, (_, i) => i);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-xl border bg-card p-6 text-center">
      <ShieldCheckIcon className="size-6 text-muted-foreground" />
      <div className="flex flex-col gap-1">
        <h3 id="two-factor-title" className="font-semibold">
          Two-factor authentication
        </h3>
        <p className="text-muted-foreground text-sm">
          {mode === "app"
            ? "Enter the code from your authenticator app."
            : "Enter one of your 10-character recovery codes."}
        </p>
      </div>
      <InputOTP
        key={mode}
        maxLength={length}
        pattern={
          mode === "app" ? REGEXP_ONLY_DIGITS : REGEXP_ONLY_DIGITS_AND_CHARS
        }
        inputMode={mode === "app" ? "numeric" : "text"}
        aria-labelledby="two-factor-title"
        aria-invalid={error}
        aria-describedby={error ? "two-factor-error" : undefined}
        onChange={() => setError(false)}
        onComplete={(code: string) => setError(code !== "000000")}
      >
        {[slots.slice(0, length / 2), slots.slice(length / 2)].map(
          (group, g) => (
            <Fragment key={group[0]}>
              {g === 1 && <InputOTPSeparator />}
              <InputOTPGroup>
                {group.map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    aria-invalid={error}
                    className={
                      mode === "recovery"
                        ? "size-8 text-sm uppercase"
                        : undefined
                    }
                  />
                ))}
              </InputOTPGroup>
            </Fragment>
          ),
        )}
      </InputOTP>
      <p
        id="two-factor-error"
        aria-live="polite"
        className="min-h-4 text-destructive text-xs"
      >
        {error && "Invalid code. Try 000000."}
      </p>
      <Button
        variant="link"
        size="sm"
        onPress={() => {
          setError(false);
          setMode((m) => (m === "app" ? "recovery" : "app"));
        }}
      >
        {mode === "app"
          ? "Use a recovery code instead"
          : "Use authenticator app"}
      </Button>
    </div>
  );
}
