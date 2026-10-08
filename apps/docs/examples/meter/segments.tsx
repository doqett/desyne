"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterSegments() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter label="Battery" value={70} segments={10} color="success" />
      <Meter
        label="Signal"
        value={2}
        maxValue={4}
        segments={4}
        valueLabel="Fair"
        color="warning"
      />
      <Meter label="Rack capacity" value={90} segments={20} size="sm" />
    </div>
  );
}
