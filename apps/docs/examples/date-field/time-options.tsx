"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/date-field";

export default function TimeFieldOptions() {
  return (
    <div className="grid w-full max-w-lg gap-5 sm:grid-cols-3">
      <TimeField
        label="Hours only"
        granularity="hour"
        defaultValue={new Time(18)}
      />
      <TimeField
        label="24-hour"
        hourCycle={24}
        defaultValue={new Time(18, 45)}
      />
      <TimeField
        label="With seconds"
        granularity="second"
        defaultValue={new Time(18, 45, 30)}
      />
    </div>
  );
}
