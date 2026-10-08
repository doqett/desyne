"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-picker";

export default function DatePickerBooking() {
  const now = today(getLocalTimeZone());
  return (
    <DateRangePicker
      label="Check-in and check-out"
      description="Reservations open up to a year ahead."
      captionLayout="dropdown"
      minValue={now}
      maxValue={now.add({ years: 1 })}
      className="w-full max-w-xs"
    />
  );
}
