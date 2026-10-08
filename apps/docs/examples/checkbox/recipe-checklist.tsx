"use client";

import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress-bar";

const steps = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add a photo and your job title.",
  },
  {
    id: "invite",
    title: "Invite your team",
    description: "Projects work best with at least two people.",
  },
  {
    id: "repo",
    title: "Connect a repository",
    description: "Import issues from GitHub or GitLab.",
  },
  {
    id: "project",
    title: "Create your first project",
    description: "Start from a template or a blank board.",
  },
];

export default function CheckboxRecipeChecklist() {
  const [done, setDone] = useState<string[]>(["profile"]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border bg-card p-5">
      <ProgressBar
        label="Getting started"
        value={done.length}
        maxValue={steps.length}
        valueLabel={`${done.length} of ${steps.length}`}
        color="success"
      />
      <CheckboxGroup
        aria-label="Onboarding steps"
        value={done}
        onChange={setDone}
      >
        {steps.map((step) => (
          <Checkbox
            key={step.id}
            value={step.id}
            description={step.description}
          >
            {({ isSelected }) => (
              <span
                className={
                  isSelected ? "text-muted-foreground line-through" : undefined
                }
              >
                {step.title}
              </span>
            )}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
