"use client";

import { useId } from "react";
import { ProgressCircle } from "@/components/ui/progress-bar";

export default function ProgressCircleValueLabel() {
  const goalId = useId();
  const syncId = useId();
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <ProgressCircle
          aria-labelledby={goalId}
          size="lg"
          value={6}
          maxValue={8}
          valueLabel="6/8"
          color="success"
        />
        <div>
          <p className="font-medium text-sm" id={goalId}>
            Weekly goal
          </p>
          <p className="text-muted-foreground text-xs">6 of 8 workouts</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ProgressCircle
          aria-labelledby={syncId}
          size="sm"
          value={40}
          color="info"
        />
        <p className="text-muted-foreground text-sm" id={syncId}>
          Syncing 2 of 5 calendars
        </p>
      </div>
    </div>
  );
}
