"use client";

import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <SearchField
        label="Outline"
        variant="outline"
        placeholder="Search projects…"
      />
      <SearchField
        label="Filled"
        variant="filled"
        placeholder="Search projects…"
      />
      <SearchField
        label="Underlined"
        variant="underlined"
        placeholder="Search projects…"
      />
    </div>
  );
}
