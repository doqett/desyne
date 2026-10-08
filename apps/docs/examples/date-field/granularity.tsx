"use client";

import { parseDateTime } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

const value = parseDateTime("2027-03-15T14:30:45");

export default function DateFieldGranularity() {
  return (
    <div className="grid w-full max-w-lg gap-5 sm:grid-cols-2">
      <DateField label="day" defaultValue={value} granularity="day" />
      <DateField label="hour" defaultValue={value} granularity="hour" />
      <DateField label="minute" defaultValue={value} granularity="minute" />
      <DateField label="second" defaultValue={value} granularity="second" />
    </div>
  );
}
