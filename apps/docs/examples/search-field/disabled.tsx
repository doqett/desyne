"use client";

import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <SearchField
        label="Search logs"
        isDisabled
        description="Search is unavailable while logs are being indexed."
      />
      <SearchField label="Saved query" isReadOnly defaultValue="status:500" />
    </div>
  );
}
