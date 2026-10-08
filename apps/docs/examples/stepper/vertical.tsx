"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Step, Stepper } from "@/components/ui/stepper";

const steps = [
  {
    title: "Verify your domain",
    description: "Add a TXT record to acme.com",
    body: "We found the record. Domain verified 2 minutes ago.",
  },
  {
    title: "Configure SSO",
    description: "Connect Okta, Google or any SAML 2.0 provider",
    body: "Paste the metadata URL from your identity provider, then test the connection with your own account.",
  },
  {
    title: "Invite your team",
    description: "Members on acme.com can join automatically",
    body: "Send invites by email or share a join link.",
  },
];

export default function StepperVertical() {
  const [current, setCurrent] = useState(1);
  return (
    <Stepper
      aria-label="Single sign-on setup"
      orientation="vertical"
      currentStep={current}
      className="max-w-sm"
    >
      {steps.map((s, i) => (
        <Step key={s.title} title={s.title} description={s.description}>
          {i === current && (
            <div className="mt-1 flex flex-col items-start gap-3 rounded-lg border bg-card p-3 text-muted-foreground">
              <p>{s.body}</p>
              <Button size="sm" onPress={() => setCurrent((c) => c + 1)}>
                Mark as done
              </Button>
            </div>
          )}
        </Step>
      ))}
    </Stepper>
  );
}
