"use client";

import { SearchXIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SearchField } from "@/components/ui/search-field";

const people = ["Ana Souza", "Ben Okafor", "Chloé Martin", "Dev Patel"];

export default function EmptySearch() {
  const [query, setQuery] = useState("Zoe");
  const results = people.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchField
        aria-label="Search members"
        value={query}
        onChange={setQuery}
      />
      {results.length ? (
        <ul className="flex flex-col divide-y rounded-lg border text-sm">
          {results.map((p) => (
            <li key={p} className="px-3 py-2">
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <Empty variant="muted" size="sm" role="status">
          <EmptyMedia>
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>No members match "{query}"</EmptyTitle>
          <EmptyDescription>
            Check the spelling, or invite them to the workspace.
          </EmptyDescription>
          <EmptyActions>
            <Button variant="ghost" size="sm" onPress={() => setQuery("")}>
              Clear search
            </Button>
          </EmptyActions>
        </Empty>
      )}
    </div>
  );
}
