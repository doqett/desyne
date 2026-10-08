"use client";

import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerDateTime() {
  return (
    <div className="flex w-full max-w-72 flex-col gap-5">
      <DatePicker
        label="Reminder"
        granularity="minute"
        defaultValue={now(getLocalTimeZone())
          .add({ hours: 2 })
          .set({ second: 0, millisecond: 0 })}
        hideTimeZone
      />
      <DatePicker
        label="Maintenance window (UTC)"
        granularity="minute"
        hourCycle={24}
        defaultValue={parseZonedDateTime("2027-02-06T02:00[UTC]")}
      />
    </div>
  );
}
