"use client";

import { ProgressCircle } from "@/components/ui/progress-circle";

export default function ProgressCircleIndeterminate() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <ProgressCircle aria-label="Saving" size="sm" isIndeterminate />
        Saving changes…
      </div>
      <ProgressCircle
        aria-label="Loading report"
        isIndeterminate
        color="neutral"
      />
      <ProgressCircle aria-label="Processing video" size="lg" isIndeterminate />
    </div>
  );
}
