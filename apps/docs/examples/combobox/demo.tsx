"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const countries = [
  "Australia",
  "Canada",
  "France",
  "Germany",
  "India",
  "Japan",
  "Nepal",
  "Norway",
  "United Kingdom",
  "United States",
].map((name) => ({ id: name, name }));

export default function ComboBoxDemo() {
  return (
    <ComboBox
      className="w-full max-w-64"
      label="Country"
      placeholder="Search countries…"
      defaultItems={countries}
    >
      {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
    </ComboBox>
  );
}
