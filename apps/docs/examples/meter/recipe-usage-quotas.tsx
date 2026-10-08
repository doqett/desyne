"use client";

import { Button } from "@/components/ui/button";
import { Meter } from "@/components/ui/meter";

const quotas = [
  { label: "Seats", value: 8, max: 10, unit: "members" },
  { label: "Storage", value: 41.6, max: 50, unit: "GB" },
  { label: "Build minutes", value: 2860, max: 3000, unit: "min" },
  { label: "Projects", value: 4, max: 20, unit: "projects" },
];

export default function MeterRecipeUsageQuotas() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card">
      <div className="flex items-start justify-between gap-4 border-b p-4">
        <div>
          <h3 className="font-semibold">Pro plan</h3>
          <p className="text-muted-foreground text-sm">Resets on July 1</p>
        </div>
        <Button size="sm" variant="outline">
          Upgrade
        </Button>
      </div>
      <div className="grid gap-5 p-4">
        {quotas.map((q) => (
          <Meter
            key={q.label}
            label={q.label}
            value={q.value}
            maxValue={q.max}
            valueLabel={`${q.value.toLocaleString()} of ${q.max.toLocaleString()} ${q.unit}`}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}
