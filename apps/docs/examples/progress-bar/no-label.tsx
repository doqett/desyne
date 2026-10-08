"use client";

import { useId } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarNoLabel() {
  const labelId = useId();
  return (
    <div className="w-full max-w-xs rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-baseline justify-between text-sm">
        <span className="font-medium" id={labelId}>
          Set up your workspace
        </span>
        <span className="text-muted-foreground text-xs">2 of 5 steps</span>
      </div>
      <ProgressBar
        aria-labelledby={labelId}
        value={40}
        showValue={false}
        size="sm"
      />
    </div>
  );
}
