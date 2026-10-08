"use client";

import { DateField } from "@/components/ui/date-field";

export default function DateFieldSizes() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <DateField label="Small" size="sm" />
      <DateField label="Medium" size="md" />
      <DateField label="Large" size="lg" />
    </div>
  );
}
