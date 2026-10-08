import { Step, Stepper } from "@/components/ui/stepper";

/** Compact stepper used as the component grid thumbnail. */
export default function StepperThumb() {
  return (
    <Stepper aria-label="Setup" currentStep={1} className="w-full max-w-sm">
      <Step title="Account" />
      <Step title="Workspace" />
      <Step title="Billing" />
    </Stepper>
  );
}
