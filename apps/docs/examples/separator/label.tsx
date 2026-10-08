"use client";

import { Separator } from "@/components/ui/separator";

export default function SeparatorLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Separator label="Start" labelPosition="start" />
      <Separator label="or continue with" />
      <Separator label="End" labelPosition="end" />
    </div>
  );
}
