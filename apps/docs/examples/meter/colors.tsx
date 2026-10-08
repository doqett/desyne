"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterColors() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter label="Profile completeness" value={70} color="brand" />
      <Meter label="Match score" value={88} color="info" />
      <Meter label="Seats used" value={96} color="primary" />
      <Meter label="Disk usage" value={40} color="neutral" />
    </div>
  );
}
