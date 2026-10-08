"use client";

import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerSizes() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-5">
      <DatePicker label="Small" size="sm" />
      <DatePicker label="Medium" size="md" />
      <DatePicker label="Large" size="lg" />
    </div>
  );
}
