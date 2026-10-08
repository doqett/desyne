"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldLeadingZeros() {
  const value = parseDate("2027-03-05");
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <DateField label="Locale default" defaultValue={value} />
      <DateField
        label="shouldForceLeadingZeros"
        defaultValue={value}
        shouldForceLeadingZeros
      />
    </div>
  );
}
