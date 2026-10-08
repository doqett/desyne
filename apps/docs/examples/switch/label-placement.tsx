"use client";

import { Switch } from "@/components/ui/switch";

export default function SwitchLabelPlacement() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Switch defaultSelected>Label after (end)</Switch>
      <Switch labelPlacement="start" defaultSelected>
        Label before (start)
      </Switch>
    </div>
  );
}
