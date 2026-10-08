"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export default function DateFieldDisabled() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <DateField
        label="Account created"
        defaultValue={parseDate("2024-06-02")}
        isDisabled
      />
      <DateField
        label="Last login"
        defaultValue={parseDate("2026-09-28")}
        isReadOnly
        description="Read-only fields stay focusable."
      />
    </div>
  );
}
