"use client";

import { Badge } from "@/components/ui/badge";
import { Meter } from "@/components/ui/meter";

const servers = [
  { name: "web-01", region: "fra1", cpu: 38, memory: 61, disk: 44 },
  { name: "web-02", region: "fra1", cpu: 77, memory: 72, disk: 45 },
  { name: "db-primary", region: "ams3", cpu: 54, memory: 91, disk: 83 },
];

function status(s: (typeof servers)[number]) {
  const max = Math.max(s.cpu, s.memory, s.disk);
  if (max >= 90) return { label: "Critical", color: "danger" } as const;
  if (max >= 75) return { label: "Degraded", color: "warning" } as const;
  return { label: "Healthy", color: "success" } as const;
}

export default function MeterRecipeServerHealth() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {servers.map((s) => {
        const st = status(s);
        return (
          <div key={s.name} className="rounded-xl border bg-card p-4">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <p className="font-medium font-mono text-sm">{s.name}</p>
                <p className="text-muted-foreground text-xs">{s.region}</p>
              </div>
              <Badge variant="dot" color={st.color} size="sm">
                {st.label}
              </Badge>
            </div>
            <div className="grid gap-3">
              <Meter label="CPU" value={s.cpu} size="sm" />
              <Meter label="Memory" value={s.memory} size="sm" />
              <Meter label="Disk" value={s.disk} size="sm" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
