"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const flags = [
  {
    key: "new-editor",
    name: "New editor",
    stage: "beta",
    rollout: "Enabled for 25% of users",
  },
  {
    key: "ai-summaries",
    name: "AI summaries",
    stage: "alpha",
    rollout: "Internal team only",
  },
  {
    key: "usage-billing",
    name: "Usage-based billing",
    stage: "ga",
    rollout: "Enabled for all users",
  },
] as const;

const stages = {
  alpha: { label: "Alpha", color: "warning" },
  beta: { label: "Beta", color: "info" },
  ga: { label: "GA", color: "success" },
} as const;

export default function SwitchRecipeFeatureFlags() {
  const [on, setOn] = useState<Record<string, boolean>>({
    "new-editor": true,
    "ai-summaries": false,
    "usage-billing": true,
  });

  return (
    <ul className="w-full max-w-md divide-y rounded-xl border bg-card">
      {flags.map((flag) => (
        <li key={flag.key} className="flex items-center gap-4 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span id={`flag-${flag.key}`} className="font-medium text-sm">
                {flag.name}
              </span>
              <Badge size="sm" color={stages[flag.stage].color}>
                {stages[flag.stage].label}
              </Badge>
            </div>
            <p className="font-mono text-muted-foreground text-xs">
              {flag.key} · {flag.rollout}
            </p>
          </div>
          <Switch
            size="sm"
            aria-labelledby={`flag-${flag.key}`}
            isSelected={on[flag.key]}
            onChange={(value) => setOn((o) => ({ ...o, [flag.key]: value }))}
          />
        </li>
      ))}
    </ul>
  );
}
