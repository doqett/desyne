"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPControlled() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        aria-label="Verification code"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm tabular-nums">
        {value.length}/6 ·{" "}
        <code className="text-foreground">{value || "—"}</code>
      </p>
      <Button
        size="sm"
        variant="outline"
        isDisabled={!value}
        onPress={() => setValue("")}
      >
        Clear
      </Button>
    </div>
  );
}
