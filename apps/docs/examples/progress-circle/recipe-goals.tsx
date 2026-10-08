"use client";

import { useId } from "react";
import { ProgressCircle } from "@/components/ui/progress-circle";

const goals = [
  {
    name: "Activation",
    detail: "412 of 500 new teams",
    value: 412,
    max: 500,
    color: "brand",
  },
  {
    name: "Retention",
    detail: "Week-4 retention 61% · target 70%",
    value: 61,
    max: 70,
    color: "info",
  },
  {
    name: "NPS responses",
    detail: "1,240 of 1,000 collected",
    value: 1240,
    max: 1000,
    color: "success",
  },
] as const;

function Goal({ g }: { g: (typeof goals)[number] }) {
  const id = useId();
  return (
    <li className="flex items-center gap-3 rounded-lg border bg-card p-3">
      <ProgressCircle
        aria-labelledby={id}
        value={Math.min(g.value, g.max)}
        maxValue={g.max}
        color={g.color}
      />
      <div className="min-w-0">
        <p id={id} className="font-medium text-sm">
          {g.name}
        </p>
        <p className="truncate text-muted-foreground text-xs">{g.detail}</p>
      </div>
    </li>
  );
}

export default function ProgressCircleRecipeGoals() {
  return (
    <ul className="grid w-full max-w-md gap-2">
      {goals.map((g) => (
        <Goal key={g.name} g={g} />
      ))}
    </ul>
  );
}
