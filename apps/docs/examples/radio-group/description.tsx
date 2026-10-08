"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupDescription() {
  return (
    <RadioGroup label="Visibility" defaultValue="private" className="max-w-xs">
      <Radio
        value="public"
        description="Anyone on the internet can see this project."
      >
        Public
      </Radio>
      <Radio
        value="internal"
        description="Everyone in your organization can see it."
      >
        Internal
      </Radio>
      <Radio value="private" description="Only people you invite can see it.">
        Private
      </Radio>
    </RadioGroup>
  );
}
