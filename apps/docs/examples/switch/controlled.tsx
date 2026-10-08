"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchControlled() {
  const [isSelected, setSelected] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Switch isSelected={isSelected} onChange={setSelected}>
        Maintenance mode
      </Switch>
      <p className="text-muted-foreground text-sm">
        Your site is{" "}
        <span className="font-medium text-foreground">
          {isSelected ? "showing a maintenance page" : "live"}
        </span>
        .
      </p>
    </div>
  );
}
