"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup
        label="Region"
        description="Tokyo is at capacity. Try again next week."
        defaultValue="fra"
      >
        <Radio value="iad">Washington, D.C. (iad1)</Radio>
        <Radio value="fra">Frankfurt (fra1)</Radio>
        <Radio value="hnd" isDisabled>
          Tokyo (hnd1)
        </Radio>
      </RadioGroup>
      <RadioGroup label="Billing cycle" isReadOnly defaultValue="yearly">
        <Radio value="monthly">Monthly</Radio>
        <Radio value="yearly">Yearly</Radio>
      </RadioGroup>
      <RadioGroup label="Data residency" isDisabled defaultValue="eu">
        <Radio value="us">United States</Radio>
        <Radio value="eu">European Union</Radio>
      </RadioGroup>
    </div>
  );
}
