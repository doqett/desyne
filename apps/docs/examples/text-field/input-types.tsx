"use client";

import { TextField } from "@/components/ui/text-field";

export default function TextFieldInputTypes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
      />
      <TextField
        label="Phone"
        type="tel"
        autoComplete="tel"
        placeholder="+977 98 0000 0000"
      />
      <TextField
        label="One-time code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="123456"
      />
      <TextField
        label="Repository"
        spellCheck="false"
        autoCorrect="off"
        placeholder="acme/desyne"
      />
    </div>
  );
}
