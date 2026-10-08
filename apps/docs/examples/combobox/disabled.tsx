"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const plans = [
  { id: "hobby", name: "Hobby" },
  { id: "pro", name: "Pro" },
  { id: "team", name: "Team" },
  { id: "enterprise", name: "Enterprise (contact sales)" },
];

export default function ComboBoxDisabled() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-5">
      <ComboBox label="Region" isDisabled defaultValue="eu">
        <ComboBoxItem id="us">United States</ComboBoxItem>
        <ComboBoxItem id="eu">Europe</ComboBoxItem>
      </ComboBox>
      <ComboBox
        label="Plan"
        defaultItems={plans}
        disabledKeys={["enterprise"]}
        description="Enterprise requires a sales call."
      >
        {(plan) => <ComboBoxItem>{plan.name}</ComboBoxItem>}
      </ComboBox>
    </div>
  );
}
