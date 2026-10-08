"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPInvalid() {
  const [value, setValue] = useState("481920");
  const invalid = value.length === 6 && value !== "123456";
  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        aria-label="Verification code"
        aria-invalid={invalid}
        aria-describedby="otp-invalid-error"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} aria-invalid={invalid} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p
        id="otp-invalid-error"
        aria-live="polite"
        className={
          invalid ? "text-destructive text-xs" : "text-muted-foreground text-xs"
        }
      >
        {invalid
          ? "That code is incorrect. Try 123456."
          : "Enter the 6-digit code."}
      </p>
    </div>
  );
}
