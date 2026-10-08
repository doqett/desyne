"use client";

import { Meter } from "@/components/ui/meter";

const regions = [
  { name: "us-east-1", load: 64 },
  { name: "eu-west-1", load: 82 },
  { name: "ap-south-1", load: 93 },
];

export default function MeterNoLabel() {
  return (
    <div className="w-full max-w-sm divide-y rounded-xl border bg-card text-sm">
      {regions.map((r) => (
        <div key={r.name} className="flex items-center gap-4 px-4 py-2.5">
          <span className="w-24 shrink-0 font-mono text-xs">{r.name}</span>
          <Meter
            aria-label={`${r.name} load`}
            value={r.load}
            showValue={false}
            size="sm"
          />
          <span className="w-10 shrink-0 text-right text-muted-foreground tabular-nums">
            {r.load}%
          </span>
        </div>
      ))}
    </div>
  );
}
