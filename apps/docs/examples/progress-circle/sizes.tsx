"use client";

import { ProgressCircle } from "@/components/ui/progress-circle";

export default function ProgressCircleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <ProgressCircle aria-label="Small" size="sm" value={64} />
      <ProgressCircle aria-label="Medium" size="md" value={64} />
      <ProgressCircle aria-label="Large" size="lg" value={64} />
      <ProgressCircle aria-label="Extra large" size="xl" value={64} />
    </div>
  );
}
