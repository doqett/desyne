"use client";

import {
  parseZonedDateTime,
  toTimeZone,
  type ZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";
import { DateField, TimeField } from "@/components/ui/date-field";

export default function DateFieldTimeZones() {
  const [launch, setLaunch] = useState<ZonedDateTime | null>(
    parseZonedDateTime("2027-03-15T09:00[America/New_York]"),
  );
  return (
    <div className="flex w-full max-w-72 flex-col gap-5">
      <DateField
        label="Launch (New York)"
        value={launch}
        onChange={setLaunch}
        granularity="minute"
      />
      <DateField
        label="Same moment in Tokyo"
        value={launch ? toTimeZone(launch, "Asia/Tokyo") : null}
        granularity="minute"
        isReadOnly
      />
      <TimeField
        label="Time only, zone hidden"
        value={launch}
        onChange={setLaunch}
        hideTimeZone
      />
    </div>
  );
}
