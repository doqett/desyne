"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerControlledOpen() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-60 flex-col gap-3">
      <DatePicker
        label="Follow-up"
        isOpen={open}
        onOpenChange={setOpen}
        shouldCloseOnSelect={false}
        description="Stays open after picking. Press Esc or click outside to close."
      />
      <Button
        size="sm"
        variant="outline"
        className="self-start"
        onPress={() => setOpen(true)}
      >
        Open calendar
      </Button>
    </div>
  );
}
