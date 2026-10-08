"use client";

import { Switch } from "@/components/ui/switch";

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      <Switch size="sm" defaultSelected>
        Small
      </Switch>
      <Switch size="md" defaultSelected>
        Medium
      </Switch>
      <Switch size="lg" defaultSelected>
        Large
      </Switch>
    </div>
  );
}
