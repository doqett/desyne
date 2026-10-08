"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerValidation() {
  const now = today(getLocalTimeZone());
  return (
    <DatePicker
      label="Start date"
      validationBehavior="aria"
      minValue={now}
      maxValue={now.add({ months: 3 })}
      defaultValue={now.subtract({ days: 2 })}
      description="Within the next three months."
      className="w-full max-w-60"
    />
  );
}
