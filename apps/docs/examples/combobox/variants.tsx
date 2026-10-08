"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const languages = ["TypeScript", "Python", "Go", "Rust", "Kotlin", "Swift"].map(
  (name) => ({ id: name.toLowerCase(), name }),
);

export default function ComboBoxVariants() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-5">
      {(["outline", "filled", "underlined"] as const).map((variant) => (
        <ComboBox
          key={variant}
          variant={variant}
          label={variant}
          defaultItems={languages}
          defaultValue="typescript"
          className="capitalize"
        >
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBox>
      ))}
    </div>
  );
}
