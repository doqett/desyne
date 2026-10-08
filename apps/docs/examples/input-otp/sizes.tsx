"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPSizes() {
  return (
    <div className="flex flex-col items-center gap-5">
      <InputOTP maxLength={4} aria-label="Small code" defaultValue="12">
        <InputOTPGroup>
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot key={i} index={i} className="size-8 text-sm" />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <InputOTP maxLength={4} aria-label="Default code" defaultValue="12">
        <InputOTPGroup>
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <InputOTP maxLength={4} aria-label="Large code" defaultValue="12">
        <InputOTPGroup variant="separated" className="gap-3">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="size-14 rounded-lg! text-2xl"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
