"use client";

import { ComboBox, ComboBoxItem } from "@/components/ui/combobox";

const frameworks = [
  "Next.js",
  "React Router",
  "TanStack Start",
  "Astro",
  "Vite",
].map((name) => ({ id: name, name }));

export default function ComboBoxEmptyState() {
  return (
    <ComboBox
      className="w-full max-w-64"
      label="Framework"
      placeholder="Try typing “svelte”"
      defaultItems={frameworks}
      emptyMessage="No frameworks match your search."
    >
      {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
    </ComboBox>
  );
}
