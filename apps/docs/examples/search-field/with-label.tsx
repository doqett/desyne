"use client";

import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldWithLabel() {
  return (
    <SearchField
      className="w-full max-w-xs"
      label="Search docs"
      placeholder="Search components…"
      defaultValue="button"
      description="Press Escape or the × button to clear."
    />
  );
}
