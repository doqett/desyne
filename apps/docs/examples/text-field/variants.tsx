"use client";

import { TextField } from "@/components/ui/text-field";

export default function TextFieldVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <TextField
        variant="outline"
        label="Outline"
        placeholder="Default style"
      />
      <TextField
        variant="filled"
        label="Filled"
        placeholder="Muted background"
      />
      <TextField
        variant="underlined"
        label="Underlined"
        placeholder="Bottom border only"
      />
    </div>
  );
}
