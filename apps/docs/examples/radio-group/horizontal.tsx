"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupHorizontal() {
  return (
    <RadioGroup
      label="Density"
      orientation="horizontal"
      defaultValue="comfortable"
    >
      <Radio value="compact">Compact</Radio>
      <Radio value="comfortable">Comfortable</Radio>
      <Radio value="spacious">Spacious</Radio>
    </RadioGroup>
  );
}
