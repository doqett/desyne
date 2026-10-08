"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldDemo() {
  return (
    <NumberField
      className="w-full max-w-48"
      label="Seats"
      defaultValue={5}
      minValue={1}
      maxValue={50}
    />
  );
}
