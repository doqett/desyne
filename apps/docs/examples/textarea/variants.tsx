"use client";

import { TextareaField } from "@/components/ui/textarea";

export default function TextareaVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <TextareaField
        variant="outline"
        label="Outline"
        placeholder="Default style for most forms"
      />
      <TextareaField
        variant="filled"
        label="Filled"
        placeholder="Muted background for dense layouts"
      />
      <TextareaField
        variant="underlined"
        label="Underlined"
        placeholder="Bottom border only"
      />
    </div>
  );
}
