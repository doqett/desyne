"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarIndeterminate() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <ProgressBar label="Connecting to GitHub…" isIndeterminate />
      <ProgressBar aria-label="Loading" size="sm" isIndeterminate />
    </div>
  );
}
