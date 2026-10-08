"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPDigitsOnly() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={setValue}
        aria-label="PIN"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">
        {value ? `You entered: ${value}` : "Digits only."}
      </p>
    </div>
  );
}
