"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupControlled() {
  const [value, setValue] = useState("weekly");
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup label="Digest frequency" value={value} onChange={setValue}>
        <Radio value="daily">Daily</Radio>
        <Radio value="weekly">Weekly</Radio>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="never">Never</Radio>
      </RadioGroup>
      <p className="text-muted-foreground text-sm">
        You'll get a digest{" "}
        <span className="font-medium text-foreground">
          {value === "never" ? "never" : value}
        </span>
        .
      </p>
    </div>
  );
}
