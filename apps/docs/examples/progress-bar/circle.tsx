"use client";

import { ProgressCircle } from "@/components/ui/progress-bar";

export default function ProgressCircleDemo() {
  return (
    <div className="flex items-center gap-6">
      <ProgressCircle aria-label="Syncing" size="sm" value={60} />
      <ProgressCircle aria-label="Test coverage" value={82} color="success" />
      <ProgressCircle aria-label="Storage used" size="lg" value={64} />
    </div>
  );
}
