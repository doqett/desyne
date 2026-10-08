"use client";

import { Switch } from "@/components/ui/switch";

export default function SwitchSettings() {
  return (
    <div className="flex w-full max-w-sm flex-col divide-y rounded-lg border">
      <Switch
        labelPlacement="start"
        className="p-4"
        defaultSelected
        description="Receive emails about account activity."
      >
        Security alerts
      </Switch>
      <Switch
        labelPlacement="start"
        className="p-4"
        description="Get notified about new features."
      >
        Product updates
      </Switch>
      <Switch
        labelPlacement="start"
        className="p-4"
        isDisabled
        description="Managed by your organization."
      >
        Marketing emails
      </Switch>
    </div>
  );
}
