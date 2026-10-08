"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterValueLabel() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter
        label="Storage"
        value={7.2}
        maxValue={10}
        valueLabel="7.2 of 10 GB"
      />
      <Meter
        label="API requests"
        value={48200}
        maxValue={50000}
        valueLabel="48.2k / 50k this month"
      />
    </div>
  );
}
