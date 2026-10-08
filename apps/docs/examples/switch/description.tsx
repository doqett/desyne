"use client";

import { Switch } from "@/components/ui/switch";

export default function SwitchDescription() {
  return (
    <Switch
      className="max-w-xs"
      defaultSelected
      description="Pause all notifications from 10 PM to 7 AM in your local time zone."
    >
      Quiet hours
    </Switch>
  );
}
