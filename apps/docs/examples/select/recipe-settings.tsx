"use client";

import { Select, SelectItem } from "@/components/ui/select";

const rows = [
  {
    id: "theme",
    title: "Theme",
    description: "Choose how the app looks.",
    value: "system",
    options: [
      ["light", "Light"],
      ["dark", "Dark"],
      ["system", "System"],
    ],
  },
  {
    id: "language",
    title: "Language",
    description: "Used for dates, numbers and the interface.",
    value: "en",
    options: [
      ["en", "English"],
      ["ne", "नेपाली"],
      ["de", "Deutsch"],
    ],
  },
  {
    id: "week",
    title: "Start of week",
    description: "First day shown in calendars.",
    value: "mon",
    options: [
      ["sun", "Sunday"],
      ["mon", "Monday"],
    ],
  },
];

export default function SelectRecipeSettings() {
  return (
    <div className="w-full max-w-lg divide-y rounded-xl border bg-card">
      {rows.map((r) => (
        <div key={r.id} className="flex items-center justify-between gap-6 p-4">
          <div>
            <p id={`${r.id}-label`} className="font-medium text-sm">
              {r.title}
            </p>
            <p className="text-muted-foreground text-xs">{r.description}</p>
          </div>
          <Select
            aria-labelledby={`${r.id}-label`}
            defaultSelectedKey={r.value}
            className="w-36 shrink-0"
          >
            {r.options.map(([id, label]) => (
              <SelectItem key={id} id={id}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}
