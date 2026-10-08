"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldSizes() {
  return (
    <div className="flex w-full max-w-48 flex-col gap-5">
      <NumberField size="sm" label="Small" defaultValue={2} />
      <NumberField size="md" label="Medium" defaultValue={2} />
      <NumberField size="lg" label="Large" stepper="split" defaultValue={2} />
    </div>
  );
}
