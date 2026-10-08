"use client";

import { MoonIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SwitchStandalone() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3 rounded-lg border bg-card p-3">
      <MoonIcon className="size-4 text-muted-foreground" />
      <div className="flex-1">
        <p id="dark-mode-label" className="font-medium text-sm">
          Dark mode
        </p>
        <p id="dark-mode-hint" className="text-muted-foreground text-xs">
          Follows your system by default.
        </p>
      </div>
      <Switch
        aria-labelledby="dark-mode-label"
        aria-describedby="dark-mode-hint"
      />
    </div>
  );
}
