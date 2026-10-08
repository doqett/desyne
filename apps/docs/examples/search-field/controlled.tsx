"use client";

import { useState } from "react";
import { useFilter } from "react-aria-components";
import { SearchField } from "@/components/ui/search-field";

const components = [
  "Button",
  "Calendar",
  "Checkbox",
  "Combo Box",
  "Date Picker",
  "Dialog",
  "Menu",
  "Number Field",
  "Popover",
  "Radio Group",
  "Search Field",
  "Select",
  "Slider",
  "Switch",
  "Tabs",
  "Text Field",
  "Tooltip",
];

export default function SearchFieldControlled() {
  const [query, setQuery] = useState("");
  const { contains } = useFilter({ sensitivity: "base" });
  const results = components.filter((c) => contains(c, query));
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchField
        aria-label="Filter components"
        placeholder="Filter components…"
        value={query}
        onChange={setQuery}
      />
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {results.length} of {components.length} components
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {results.map((c) => (
          <li key={c} className="rounded-md border px-2 py-0.5 text-xs">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
