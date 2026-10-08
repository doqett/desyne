"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldVariants() {
  return (
    <div className="flex w-full max-w-48 flex-col gap-5">
      {(["outline", "filled", "underlined"] as const).map((variant) => (
        <NumberField
          key={variant}
          variant={variant}
          label={variant}
          defaultValue={8}
          className="capitalize"
        />
      ))}
    </div>
  );
}
