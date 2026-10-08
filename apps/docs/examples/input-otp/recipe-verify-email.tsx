"use client";

import { MailCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPRecipeVerifyEmail() {
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(30);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (cooldown === 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  return (
    <form
      className="flex w-full max-w-sm flex-col items-center gap-5 rounded-xl border bg-card p-6 text-center"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        await new Promise((r) => setTimeout(r, 900));
        setPending(false);
      }}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-muted">
        <MailCheckIcon className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 id="verify-email-title" className="font-semibold">
          Check your email
        </h3>
        <p className="text-muted-foreground text-sm">
          We sent a 6-digit code to{" "}
          <span className="text-foreground">ada@acme.dev</span>.
        </p>
      </div>
      <InputOTP
        maxLength={6}
        name="code"
        value={code}
        onChange={setCode}
        aria-labelledby="verify-email-title"
        autoFocus
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        type="submit"
        className="w-full"
        isDisabled={code.length < 6}
        isPending={pending}
      >
        Verify email
      </Button>
      <p className="text-muted-foreground text-sm">
        Didn't get it?{" "}
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0"
          isDisabled={cooldown > 0}
          onPress={() => setCooldown(30)}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </Button>
      </p>
    </form>
  );
}
