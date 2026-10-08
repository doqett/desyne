"use client";

import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerVariants() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <DatePicker label="Outline" variant="outline" />
      <DatePicker label="Filled" variant="filled" />
      <DatePicker label="Underlined" variant="underlined" />
    </div>
  );
}
