"use client";

import { ProgressCircle } from "@/components/ui/progress-bar";

export default function ProgressCircleIndeterminate() {
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle aria-label="Loading" size="sm" isIndeterminate />
      <ProgressCircle aria-label="Loading" isIndeterminate />
      <ProgressCircle aria-label="Loading" size="lg" isIndeterminate />
    </div>
  );
}
