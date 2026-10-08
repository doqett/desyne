"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldSteppers() {
  return (
    <div className="flex w-full max-w-48 flex-col gap-5">
      <NumberField
        label="Stacked"
        stepper="stacked"
        defaultValue={3}
        minValue={0}
        description="Default. Compact, right-aligned."
      />
      <NumberField
        label="Split"
        stepper="split"
        defaultValue={3}
        minValue={0}
        description="Bigger targets for touch."
      />
      <NumberField
        label="None"
        stepper="none"
        defaultValue={3}
        minValue={0}
        description="Keyboard and wheel only."
      />
    </div>
  );
}
