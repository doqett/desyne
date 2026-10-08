"use client";

import { TextField } from "@/components/ui/text-field";

export default function TextFieldSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <TextField
        size="sm"
        label="Small"
        placeholder="28px — tables, toolbars"
      />
      <TextField size="md" label="Medium" placeholder="32px — default" />
      <TextField
        size="lg"
        label="Large"
        placeholder="40px — touch, marketing"
      />
    </div>
  );
}
