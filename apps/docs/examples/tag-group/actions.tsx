"use client";

import { useState } from "react";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const suggestions = [
  "pricing",
  "refund policy",
  "API rate limits",
  "SSO setup",
  "export data",
];

export default function TagGroupActions() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TagGroup
        label="Popular searches"
        variant="soft"
        onAction={(key) => setQuery(String(key))}
      >
        {suggestions.map((s) => (
          <Tag key={s} id={s} className="cursor-pointer">
            {s}
          </Tag>
        ))}
      </TagGroup>
      <p className="text-muted-foreground text-xs">
        {query ? `Searching for “${query}”…` : "Click a suggestion to search."}
      </p>
    </div>
  );
}
