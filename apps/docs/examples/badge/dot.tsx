"use client";

import { Badge } from "@/components/ui/badge";

const statuses = [
  { label: "Operational", color: "success" },
  { label: "Degraded", color: "warning" },
  { label: "Outage", color: "danger" },
  { label: "Maintenance", color: "info" },
  { label: "Paused", color: "neutral" },
] as const;

export default function BadgeDot() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((s) => (
        <Badge key={s.label} variant="dot" color={s.color}>
          {s.label}
        </Badge>
      ))}
    </div>
  );
}
