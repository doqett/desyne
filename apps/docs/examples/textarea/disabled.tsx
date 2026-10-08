"use client";

import { TextareaField } from "@/components/ui/textarea";

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <TextareaField
        label="Internal notes"
        isDisabled
        defaultValue="Customer asked for a refund on the annual plan."
        description="Notes are locked once a ticket is closed."
      />
      <TextareaField
        label="Original message"
        isReadOnly
        resize="none"
        defaultValue="Hi team, the export button on the reports page returns a 500 error since this morning."
      />
    </div>
  );
}
