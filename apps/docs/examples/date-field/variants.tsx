"use client";

import { DateField } from "@/components/ui/date-field";

export default function DateFieldVariants() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-5">
      <DateField label="Outline" variant="outline" />
      <DateField label="Filled" variant="filled" />
      <DateField label="Underlined" variant="underlined" />
    </div>
  );
}
