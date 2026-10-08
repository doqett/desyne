"use client";

import { CheckIcon } from "lucide-react";
import { ProgressCircle } from "@/components/ui/progress-circle";

export default function ProgressCircleCustomContent() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressCircle
        aria-label="Weekly workouts"
        size="xl"
        value={6}
        maxValue={8}
        valueLabel="6 of 8 workouts"
        color="success"
      >
        <span className="font-semibold text-2xl tabular-nums">6/8</span>
        <span className="text-muted-foreground text-xs">workouts</span>
      </ProgressCircle>
      <ProgressCircle
        aria-label="Storage used"
        size="xl"
        value={7.4}
        maxValue={10}
        valueLabel="7.4 of 10 GB"
        strokeWidth={12}
      >
        {({ percentage }) => (
          <>
            <span className="font-semibold text-xl tabular-nums">
              {Math.round(percentage ?? 0)}%
            </span>
            <span className="text-muted-foreground text-xs">of 10 GB</span>
          </>
        )}
      </ProgressCircle>
      <ProgressCircle
        aria-label="Profile complete"
        size="lg"
        value={100}
        color="success"
      >
        <CheckIcon className="size-6 text-success" strokeWidth={2.5} />
      </ProgressCircle>
    </div>
  );
}
