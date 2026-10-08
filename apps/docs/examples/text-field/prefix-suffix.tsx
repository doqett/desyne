"use client";

import { AtSignIcon, MailIcon } from "lucide-react";
import { TextField } from "@/components/ui/text-field";

export default function TextFieldPrefixSuffix() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <TextField
        label="Username"
        prefix={<AtSignIcon />}
        placeholder="jordan"
      />
      <TextField
        label="Work email"
        prefix={<MailIcon />}
        suffix="@acme.dev"
        placeholder="first.last"
      />
      <TextField
        label="Website"
        inputMode="url"
        prefix="https://"
        placeholder="acme.dev"
      />
      <TextField
        label="Hourly rate"
        inputMode="decimal"
        prefix="$"
        suffix="USD"
        placeholder="0.00"
      />
    </div>
  );
}
