"use client";

import { Spinner } from "@/components/ui/spinner";

export default function SpinnerLabel() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm">
      {/* Standalone: the label is the only description of what's happening. */}
      <Spinner size="md" label="Loading invoices" />

      {/* Next to visible text: hide the spinner so the text isn't doubled. */}
      <p className="flex items-center gap-2 text-muted-foreground">
        <Spinner aria-hidden /> Checking availability…
      </p>
    </div>
  );
}
