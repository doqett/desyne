"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldFormatting() {
  return (
    <div className="flex w-full max-w-52 flex-col gap-5">
      <NumberField
        label="Price"
        defaultValue={49.99}
        formatOptions={{ style: "currency", currency: "USD" }}
      />
      <NumberField
        label="Discount"
        defaultValue={0.15}
        minValue={0}
        maxValue={1}
        step={0.05}
        formatOptions={{ style: "percent" }}
      />
      <NumberField
        label="Distance"
        defaultValue={12}
        formatOptions={{
          style: "unit",
          unit: "kilometer",
          unitDisplay: "short",
        }}
      />
    </div>
  );
}
