"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPSeparated() {
  return (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup variant="separated">
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
