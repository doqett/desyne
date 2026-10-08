"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterFormat() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter
        label="Monthly budget"
        value={3240}
        maxValue={5000}
        formatOptions={{
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }}
      />
      <Meter
        label="Bandwidth"
        value={412}
        maxValue={500}
        formatOptions={{ style: "unit", unit: "gigabyte" }}
      />
      <Meter
        label="Temperature"
        value={68}
        minValue={20}
        maxValue={90}
        formatOptions={{ style: "unit", unit: "celsius" }}
      />
    </div>
  );
}
