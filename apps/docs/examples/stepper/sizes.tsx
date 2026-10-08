"use client";

import { Step, Stepper } from "@/components/ui/stepper";

const steps = ["Details", "Documents", "Review", "Submit"];

export default function StepperSizes() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Stepper aria-label="Application (small)" size="sm" currentStep={1}>
        {steps.map((t) => (
          <Step key={t} title={t} />
        ))}
      </Stepper>
      <Stepper aria-label="Application" currentStep={1}>
        {steps.map((t) => (
          <Step key={t} title={t} />
        ))}
      </Stepper>
    </div>
  );
}
