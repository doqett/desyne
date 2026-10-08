"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerBirthday() {
  const now = today(getLocalTimeZone());
  const [value, setValue] = useState<CalendarDate | null>(null);
  const age = value
    ? now.year -
      value.year -
      (now.compare(value.set({ year: now.year })) < 0 ? 1 : 0)
    : null;
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <DatePicker
        label="Date of birth"
        description="Pick a month and year from the calendar header."
        captionLayout="dropdown"
        fromYear={1940}
        maxValue={now}
        placeholderValue={now.set({ year: 1990, month: 1, day: 1 })}
        value={value}
        onChange={setValue}
      />
      {age != null && (
        <p className="text-muted-foreground text-sm">
          Age: <span className="font-medium text-foreground">{age}</span>
        </p>
      )}
    </div>
  );
}
