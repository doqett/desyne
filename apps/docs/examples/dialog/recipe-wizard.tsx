"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProgressBar } from "@/components/ui/progress-bar";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";

const steps = ["Name", "Template", "Settings"];

export default function DialogRecipeWizard() {
  const [step, setStep] = useState(0);
  const last = step === steps.length - 1;
  return (
    <DialogTrigger onOpenChange={(open) => open && setStep(0)}>
      <Button variant="outline">New workspace</Button>
      <DialogContent>
        {({ close }) => (
          <>
            <DialogHeader>
              <DialogTitle>Create a workspace</DialogTitle>
              <DialogDescription>
                Step {step + 1} of {steps.length} · {steps[step]}
              </DialogDescription>
            </DialogHeader>
            <ProgressBar
              aria-label="Progress"
              value={((step + 1) / steps.length) * 100}
              showValue={false}
              size="sm"
            />
            <div className="min-h-40">
              {step === 0 && (
                <TextField
                  label="Workspace name"
                  defaultValue="Acme"
                  autoFocus
                />
              )}
              {step === 1 && (
                <RadioGroup aria-label="Template" defaultValue="blank">
                  <RadioCard
                    value="blank"
                    title="Blank"
                    description="Start from scratch."
                  />
                  <RadioCard
                    value="saas"
                    title="SaaS app"
                    description="Auth, billing and a dashboard."
                  />
                </RadioGroup>
              )}
              {step === 2 && (
                <div className="grid gap-4">
                  <Switch
                    labelPlacement="start"
                    defaultSelected
                    description="Members can invite others."
                  >
                    Open invites
                  </Switch>
                  <Switch
                    labelPlacement="start"
                    description="Require SSO for all members."
                  >
                    Enforce SSO
                  </Switch>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                isDisabled={step === 0}
                onPress={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
              <Button onPress={() => (last ? close() : setStep((s) => s + 1))}>
                {last ? "Create workspace" : "Continue"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </DialogTrigger>
  );
}
