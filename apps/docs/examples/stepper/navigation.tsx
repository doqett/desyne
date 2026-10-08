"use client";

import { useState } from "react";
import { Step, Stepper } from "@/components/ui/stepper";

const steps = ["Cart", "Shipping", "Payment", "Review"];

export default function StepperNavigation() {
  const [current, setCurrent] = useState(2);
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Stepper
        aria-label="Checkout"
        currentStep={current}
        onStepChange={setCurrent}
      >
        {steps.map((title) => (
          <Step key={title} title={title} />
        ))}
      </Stepper>
      <p className="text-muted-foreground text-sm">
        Press a completed step to go back to it. Later steps unlock as you
        continue.
      </p>
    </div>
  );
}
