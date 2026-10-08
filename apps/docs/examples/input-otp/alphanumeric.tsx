"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPAlphanumeric() {
  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP
        maxLength={8}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        inputMode="text"
        autoCapitalize="characters"
        pasteTransformer={(pasted) => pasted.replace(/[\s-]/g, "")}
        aria-label="Recovery code"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot key={i} index={i} className="uppercase" />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[4, 5, 6, 7].map((i) => (
            <InputOTPSlot key={i} index={i} className="uppercase" />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">
        Paste “K7QD-92XF” — the dash is stripped.
      </p>
    </div>
  );
}
