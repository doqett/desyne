"use client";

import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Requests", value: "1.2M" },
  { label: "Error rate", value: "0.04%" },
  { label: "p95 latency", value: "182 ms" },
];

export default function SeparatorRecipeStats() {
  return (
    <div className="flex w-full max-w-md items-stretch rounded-xl border bg-card py-4">
      {stats.map((s, i) => (
        <div key={s.label} className="contents">
          {i > 0 && <Separator orientation="vertical" />}
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-muted-foreground text-xs">{s.label}</span>
            <span className="font-semibold text-xl tabular-nums">
              {s.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
