"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Step, Stepper } from "@/components/ui/stepper";

const steps = [
  { title: "Account", description: "Name and email" },
  { title: "Workspace", description: "Team and URL" },
  { title: "Billing", description: "Plan and payment" },
];

export default function StepperDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Stepper aria-label="Workspace setup" currentStep={current}>
        {steps.map((s) => (
          <Step key={s.title} title={s.title} description={s.description} />
        ))}
      </Stepper>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          isDisabled={current === 0}
          onPress={() => setCurrent((c) => c - 1)}
        >
          Back
        </Button>
        <Button
          isDisabled={current === steps.length}
          onPress={() => setCurrent((c) => c + 1)}
        >
          {current >= steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
