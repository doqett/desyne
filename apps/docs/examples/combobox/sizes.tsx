"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const sizes = ["sm", "md", "lg"] as const;

export default function ComboBoxSizes() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      {sizes.map((size) => (
        <ComboBox
          key={size}
          size={size}
          aria-label={`Size ${size}`}
          placeholder={`Size ${size}`}
        >
          <ComboBoxItem id="apple">Apple</ComboBoxItem>
          <ComboBoxItem id="banana">Banana</ComboBoxItem>
          <ComboBoxItem id="cherry">Cherry</ComboBoxItem>
        </ComboBox>
      ))}
    </div>
  );
}
