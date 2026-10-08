"use client";

import { ColorField } from "@/components/ui/color-picker";

export default function ColorFieldDemo() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <ColorField
        label="Brand color"
        defaultValue="#4f46e5"
        description="Hex, with or without the #. Applied when you press Enter or leave the field."
      />
      <ColorField
        label="Link color"
        defaultValue="#fde047"
        isInvalid
        errorMessage="Too little contrast against a white background (1.3:1)."
      />
    </div>
  );
}
