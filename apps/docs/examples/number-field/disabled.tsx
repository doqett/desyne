"use client";

import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldDisabled() {
  return (
    <div className="flex w-full max-w-52 flex-col gap-5">
      <NumberField
        label="Seats"
        defaultValue={25}
        isDisabled
        description="Contact sales to change seats on Enterprise."
      />
      <NumberField
        label="Monthly price"
        defaultValue={240}
        isReadOnly
        formatOptions={{ style: "currency", currency: "USD" }}
      />
    </div>
  );
}
