"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarValueLabel() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <ProgressBar
        label="Uploading photos"
        value={3}
        maxValue={12}
        valueLabel="3 of 12 files"
      />
      <ProgressBar
        label="Course progress"
        value={7}
        maxValue={10}
        valueLabel="Lesson 7 of 10"
        color="success"
      />
    </div>
  );
}
