"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-picker";

export default function DateRangePickerDemo() {
  const now = today(getLocalTimeZone());
  return (
    <DateRangePicker
      label="Trip dates"
      defaultValue={{
        start: now.add({ days: 14 }),
        end: now.add({ days: 21 }),
      }}
      className="w-full max-w-80"
    />
  );
}
