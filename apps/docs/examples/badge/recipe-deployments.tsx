"use client";

import { GitBranchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const deployments = [
  {
    id: "dpl_8f2k",
    branch: "main",
    message: "Add usage-based billing",
    env: "Production",
    status: "Ready",
    time: "4m ago",
  },
  {
    id: "dpl_7c1a",
    branch: "feat/audit-log",
    message: "Export audit log as CSV",
    env: "Preview",
    status: "Building",
    time: "12m ago",
  },
  {
    id: "dpl_6b9e",
    branch: "fix/webhook-retry",
    message: "Retry failed webhooks",
    env: "Preview",
    status: "Error",
    time: "1h ago",
  },
  {
    id: "dpl_5a3d",
    branch: "main",
    message: "Upgrade to React 19.2",
    env: "Production",
    status: "Canceled",
    time: "3h ago",
  },
] as const;

const statusColor = {
  Ready: "success",
  Building: "warning",
  Error: "danger",
  Canceled: "neutral",
} as const;

export default function BadgeRecipeDeployments() {
  return (
    <ul className="w-full max-w-lg divide-y rounded-lg border bg-card">
      {deployments.map((d) => (
        <li key={d.id} className="flex items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate font-medium text-sm">{d.message}</p>
            <p className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <GitBranchIcon className="size-3" aria-hidden />
              <span className="truncate font-mono">{d.branch}</span>
              <span aria-hidden>·</span>
              {d.time}
            </p>
          </div>
          <Badge
            size="sm"
            variant="outline"
            color={d.env === "Production" ? "brand" : "neutral"}
          >
            {d.env}
          </Badge>
          <Badge
            variant="dot"
            color={statusColor[d.status]}
            className="w-24 justify-start"
          >
            {d.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
