"use client";

import { DateField } from "@/components/ui/date-field";

export default function DateFieldDemo() {
  return (
    <DateField
      label="Invoice date"
      description="As printed on the invoice."
      className="w-full max-w-56"
    />
  );
}
