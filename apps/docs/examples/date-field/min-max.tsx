"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldMinMax() {
  const now = today(getLocalTimeZone());
  return (
    <DateField
      label="Report period end"
      validationBehavior="aria"
      minValue={now.subtract({ years: 1 })}
      maxValue={now}
      defaultValue={now.add({ days: 5 })}
      description="Within the last 12 months."
      className="w-full max-w-60"
    />
  );
}
