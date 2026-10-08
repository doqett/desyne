"use client";

import { useState } from "react";
import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldSubmit() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchField
        aria-label="Search orders"
        placeholder="Order number or email…"
        enterKeyHint="search"
        onSubmit={(q) => setLog((l) => [`Searched “${q}”`, ...l].slice(0, 3))}
        onClear={() => setLog((l) => ["Cleared", ...l].slice(0, 3))}
      />
      <ul className="flex flex-col gap-1 text-muted-foreground text-sm">
        {log.length === 0 ? (
          <li>Type a query and press Enter.</li>
        ) : (
          log.map((entry, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: short event log
            <li key={i}>{entry}</li>
          ))
        )}
      </ul>
    </div>
  );
}
