"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerDisabled() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <DatePicker
        label="Signed on"
        defaultValue={parseDate("2026-04-12")}
        isDisabled
      />
      <DatePicker
        label="Effective from"
        defaultValue={parseDate("2026-05-01")}
        isReadOnly
      />
    </div>
  );
}
