"use client";

import { TextField } from "@/components/ui/text-field";

export default function TextFieldDemo() {
  return (
    <TextField
      className="w-full max-w-xs"
      label="Email"
      type="email"
      placeholder="you@company.com"
      description="We'll send the invite here."
    />
  );
}
