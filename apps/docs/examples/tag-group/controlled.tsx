"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const cuisines = [
  { id: "italian", name: "Italian" },
  { id: "japanese", name: "Japanese" },
  { id: "mexican", name: "Mexican" },
  { id: "indian", name: "Indian" },
  { id: "thai", name: "Thai" },
  { id: "ethiopian", name: "Ethiopian" },
  { id: "lebanese", name: "Lebanese" },
];

export default function TagGroupControlled() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["japanese", "thai"]),
  );
  const names =
    selected === "all"
      ? cuisines.map((c) => c.name)
      : cuisines.filter((c) => selected.has(c.id)).map((c) => c.name);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <TagGroup
        label="Favorite cuisines"
        items={cuisines}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(c) => <Tag>{c.name}</Tag>}
      </TagGroup>
      <p className="text-muted-foreground text-xs">
        {names.length
          ? `We'll suggest ${names.join(", ")} places.`
          : "Pick at least one."}
      </p>
    </div>
  );
}
