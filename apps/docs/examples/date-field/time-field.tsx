"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/date-field";

export default function TimeFieldDemo() {
  return (
    <TimeField
      label="Daily standup"
      defaultValue={new Time(9, 30)}
      description="In your local time."
      className="w-full max-w-40"
    />
  );
}
