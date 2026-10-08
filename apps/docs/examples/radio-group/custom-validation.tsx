"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export default function RadioGroupCustomValidation() {
  return (
    <RadioGroup
      label="Shipping to a P.O. box"
      defaultValue="standard"
      validationBehavior="aria"
      validate={(value) =>
        value === "overnight"
          ? "Overnight delivery isn't available for P.O. boxes."
          : null
      }
    >
      <Radio value="standard" description="5–7 business days · Free">
        Standard
      </Radio>
      <Radio value="express" description="2–3 business days · $9.00">
        Express
      </Radio>
      <Radio value="overnight" description="Next business day · $24.00">
        Overnight
      </Radio>
    </RadioGroup>
  );
}
