"use client";

import { ProgressCircle } from "@/components/ui/progress-circle";

const tones = [
  "brand",
  "primary",
  "success",
  "info",
  "warning",
  "danger",
] as const;

export default function ProgressCircleColors() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {tones.map((tone, i) => (
        <ProgressCircle
          key={tone}
          aria-label={`${tone} progress`}
          color={tone}
          value={40 + i * 10}
        />
      ))}
    </div>
  );
}
