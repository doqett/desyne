"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export default function ProgressBarFormat() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <ProgressBar
        label="Downloading update"
        value={348}
        maxValue={1024}
        formatOptions={{ style: "unit", unit: "megabyte" }}
      />
      <ProgressBar
        label="Fundraising goal"
        value={18450}
        maxValue={25000}
        formatOptions={{
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }}
        color="success"
      />
      <ProgressBar
        label="Rendering"
        value={33.3}
        formatOptions={{ style: "percent", maximumFractionDigits: 1 }}
      />
    </div>
  );
}
