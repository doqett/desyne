"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

const bars = [
  { color: "brand", label: "Syncing contacts", value: 45 },
  { color: "primary", label: "Indexing documents", value: 62 },
  { color: "success", label: "Backup complete", value: 100 },
  { color: "warning", label: "Retrying upload", value: 38 },
  { color: "danger", label: "Migration paused", value: 71 },
] as const;

export default function ProgressBarColors() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      {bars.map((bar) => (
        <ProgressBar key={bar.color} {...bar} />
      ))}
    </div>
  );
}
