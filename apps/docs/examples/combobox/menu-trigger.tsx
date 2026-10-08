"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const recent = [
  "Q3 planning",
  "Design review",
  "Hiring pipeline",
  "Onboarding revamp",
].map((name) => ({ id: name, name }));

export default function ComboBoxMenuTrigger() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-5">
      <ComboBox
        label="Opens on focus"
        placeholder="Pick a project"
        menuTrigger="focus"
        defaultItems={recent}
      >
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
      <ComboBox
        label="Opens on button or arrow keys only"
        placeholder="Pick a project"
        menuTrigger="manual"
        defaultItems={recent}
      >
        {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
    </div>
  );
}
