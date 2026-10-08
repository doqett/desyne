"use client";

import { Button } from "@/components/ui/button";

export default function ButtonBlock() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Button className="w-full">Continue</Button>
      <Button variant="outline" className="w-full">
        Back
      </Button>
    </div>
  );
}
