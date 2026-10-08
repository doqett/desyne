"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";

export default function InputOTPOnComplete() {
  const [status, setStatus] = useState<"idle" | "checking" | "verified">(
    "idle",
  );
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={6}
        aria-label="Verification code"
        disabled={status !== "idle"}
        onComplete={async () => {
          setStatus("checking");
          await new Promise((r) => setTimeout(r, 900));
          setStatus("verified");
        }}
      >
        <InputOTPGroup variant="separated">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p
        aria-live="polite"
        className="flex h-5 items-center gap-2 text-muted-foreground text-sm"
      >
        {status === "idle" && "Verifies automatically on the last digit."}
        {status === "checking" && (
          <>
            <Spinner size="xs" label="Verifying" /> Verifying…
          </>
        )}
        {status === "verified" && (
          <>
            <CheckCircle2Icon className="size-4 text-success" /> Verified
          </>
        )}
      </p>
    </div>
  );
}
