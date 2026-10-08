"use client";

import { SearchXIcon } from "lucide-react";
import { useState } from "react";
import { useFilter } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";

const members = [
  { name: "Olivia Martin", email: "olivia@acme.dev", role: "Owner" },
  { name: "Jackson Lee", email: "jackson@acme.dev", role: "Admin" },
  { name: "Isabella Nguyen", email: "bella@acme.dev", role: "Member" },
  { name: "William Kim", email: "will@acme.dev", role: "Member" },
  { name: "Sofia Davis", email: "sofia@acme.dev", role: "Viewer" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function SearchFieldRecipeMembers() {
  const [query, setQuery] = useState("");
  const { contains } = useFilter({ sensitivity: "base" });
  const results = members.filter(
    (m) => contains(m.name, query) || contains(m.email, query),
  );

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-3">
        <SearchField
          aria-label="Search members"
          placeholder="Search by name or email…"
          size="sm"
          value={query}
          onChange={setQuery}
          className="flex-1"
        />
        <Button size="sm">Invite</Button>
      </div>
      {results.length > 0 ? (
        <ul className="divide-y">
          {results.map((m) => (
            <li key={m.email} className="flex items-center gap-3 px-3 py-2.5">
              <Avatar
                size="sm"
                colorful
                alt={m.name}
                fallback={initials(m.name)}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{m.name}</p>
                <p className="truncate text-muted-foreground text-xs">
                  {m.email}
                </p>
              </div>
              <Badge variant="soft" color="neutral">
                {m.role}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 p-8 text-center">
          <SearchXIcon className="size-5 text-muted-foreground" />
          <p className="font-medium text-sm">No members found</p>
          <p className="text-muted-foreground text-xs">
            Nobody matches “{query}”.
          </p>
          <Button size="sm" variant="outline" onPress={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
}
