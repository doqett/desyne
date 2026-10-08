"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldRange() {
  return (
    <div className="flex w-full max-w-52 flex-col gap-5">
      <NumberField
        label="Team size"
        defaultValue={5}
        minValue={1}
        maxValue={20}
        description="Between 1 and 20 seats."
      />
      <NumberField
        label="Time logged"
        defaultValue={1.5}
        minValue={0}
        maxValue={24}
        step={0.25}
        formatOptions={{
          style: "unit",
          unit: "hour",
          unitDisplay: "long",
          minimumFractionDigits: 2,
        }}
        description="Snaps to 15-minute steps."
      />
      <NumberField
        label="Temperature offset"
        defaultValue={-2}
        minValue={-10}
        maxValue={10}
        formatOptions={{
          style: "unit",
          unit: "celsius",
          signDisplay: "exceptZero",
        }}
      />
    </div>
  );
}
