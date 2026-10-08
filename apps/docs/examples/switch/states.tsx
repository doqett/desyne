"use client";

import { Switch } from "@/components/ui/switch";

export default function SwitchStates() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <Switch>Off</Switch>
      <Switch defaultSelected>On</Switch>
      <Switch isDisabled>Disabled</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
      <Switch isReadOnly>Read-only</Switch>
      <Switch isReadOnly defaultSelected>
        Read-only on
      </Switch>
    </div>
  );
}
