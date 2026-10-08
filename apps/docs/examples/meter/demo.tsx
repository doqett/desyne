"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter label="Storage" value={42} />
      <Meter label="Memory" value={81} />
      <Meter label="CPU" value={95} />
    </div>
  );
}
