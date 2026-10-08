"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const days = [
  { id: "mon", label: "M", name: "Monday" },
  { id: "tue", label: "T", name: "Tuesday" },
  { id: "wed", label: "W", name: "Wednesday" },
  { id: "thu", label: "T", name: "Thursday" },
  { id: "fri", label: "F", name: "Friday" },
  { id: "sat", label: "S", name: "Saturday" },
  { id: "sun", label: "S", name: "Sunday" },
];

export default function ToggleButtonGroupControlled() {
  const [selected, setSelected] = useState<Set<Key>>(
    new Set(["mon", "wed", "fri"]),
  );
  const names = days.filter((d) => selected.has(d.id)).map((d) => d.name);
  return (
    <div className="flex flex-col items-start gap-3">
      <ToggleButtonGroup
        variant="spaced"
        selectionMode="multiple"
        aria-label="Repeat on"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {days.map((d) => (
          <ToggleButton
            key={d.id}
            id={d.id}
            variant="outline"
            aria-label={d.name}
            className="rounded-full"
          >
            {d.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <p className="text-muted-foreground text-sm">
        {names.length > 0
          ? `Repeats every ${names.join(", ")}.`
          : "Pick at least one day."}
      </p>
    </div>
  );
}
