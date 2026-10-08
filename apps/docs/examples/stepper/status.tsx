"use client";

import { CloudUploadIcon, PackageIcon, RocketIcon } from "lucide-react";
import { Step, Stepper } from "@/components/ui/stepper";

export default function StepperStatus() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-10">
      <Stepper aria-label="Deployment">
        <Step
          status="complete"
          title="Build"
          description="1m 12s"
          icon={<PackageIcon />}
        />
        <Step
          status="error"
          title="Upload"
          description="Bundle exceeds 50 MB"
          icon={<CloudUploadIcon />}
        />
        <Step status="upcoming" title="Release" icon={<RocketIcon />} />
      </Stepper>
      <Stepper aria-label="Data import">
        <Step status="complete" title="Upload file" />
        <Step status="error" title="Map columns" description="2 unmatched" />
        <Step status="upcoming" title="Import" />
      </Stepper>
    </div>
  );
}
