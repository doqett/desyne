"use client";

import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <SearchField aria-label="Search, small" size="sm" shortcut="/" />
      <SearchField aria-label="Search, medium" size="md" shortcut="/" />
      <SearchField aria-label="Search, large" size="lg" shortcut="/" />
    </div>
  );
}
