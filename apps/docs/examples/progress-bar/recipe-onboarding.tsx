"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressCircle } from "@/components/ui/progress-bar";

const steps = [
  { id: "profile", label: "Complete your profile" },
  { id: "invite", label: "Invite your team" },
  { id: "connect", label: "Connect a repository" },
  { id: "deploy", label: "Ship your first deploy" },
];

export default function ProgressBarRecipeOnboarding() {
  const [done, setDone] = useState<string[]>(["profile"]);
  const toggle = (id: string, checked: boolean) =>
    setDone((d) => (checked ? [...d, id] : d.filter((x) => x !== id)));

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-5">
      <div className="mb-4 flex items-center gap-4">
        <ProgressCircle
          aria-label="Setup progress"
          size="lg"
          value={done.length}
          maxValue={steps.length}
          color={done.length === steps.length ? "success" : "brand"}
        />
        <div>
          <h3 className="font-semibold">Get started</h3>
          <p className="text-muted-foreground text-sm">
            {done.length === steps.length
              ? "You're all set."
              : `${steps.length - done.length} steps left`}
          </p>
        </div>
      </div>
      <div className="grid gap-3">
        {steps.map((step) => (
          <Checkbox
            key={step.id}
            isSelected={done.includes(step.id)}
            onChange={(checked) => toggle(step.id, checked)}
          >
            {step.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
