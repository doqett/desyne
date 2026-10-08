"use client";

import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldPlaceholderValue() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <DateField
        label="Date of birth"
        placeholderValue={new CalendarDate(1990, 1, 1)}
        description="Arrow keys start from 1990."
      />
      <DateField
        label="Next maintenance window"
        granularity="minute"
        placeholderValue={new CalendarDateTime(2027, 1, 1, 2, 0)}
        description="Arrow keys start from 2:00 AM."
      />
    </div>
  );
}
