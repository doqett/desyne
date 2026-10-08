"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <ProgressBar label="Small" size="sm" value={30} />
      <ProgressBar label="Medium" size="md" value={55} />
      <ProgressBar label="Large" size="lg" value={80} />
    </div>
  );
}
