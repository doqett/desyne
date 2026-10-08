"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter label="Small" size="sm" value={48} />
      <Meter label="Medium" size="md" value={48} />
    </div>
  );
}
