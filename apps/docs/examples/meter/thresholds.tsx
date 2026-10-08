"use client";

import { Meter } from "@/components/ui/meter";

export default function MeterThresholds() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Meter label="Error budget used" value={35} thresholds={[50, 80]} />
      <Meter label="Error budget used" value={62} thresholds={[50, 80]} />
      <Meter label="Error budget used" value={86} thresholds={[50, 80]} />
    </div>
  );
}
