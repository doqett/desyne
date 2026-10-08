"use client";

import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldDemo() {
  return (
    <SearchField
      aria-label="Search"
      className="w-full max-w-xs"
      shortcut="⌘K"
    />
  );
}
