"use client";

import { Meter } from "@/components/ui/meter";

function batteryColor(level: number) {
  if (level <= 15) return "danger";
  if (level <= 30) return "warning";
  return "success";
}

export default function MeterLowIsBad() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      {[12, 28, 84].map((level) => (
        <Meter
          key={level}
          label="Battery"
          value={level}
          segments={10}
          color={batteryColor(level)}
        />
      ))}
    </div>
  );
}
