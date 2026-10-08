"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxControlled() {
  const [isSelected, setSelected] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Checkbox isSelected={isSelected} onChange={setSelected}>
        Enable two-factor authentication
      </Checkbox>
      <p className="text-muted-foreground text-sm">
        Two-factor is{" "}
        <span className="font-medium text-foreground">
          {isSelected ? "on" : "off"}
        </span>
        .
      </p>
    </div>
  );
}
