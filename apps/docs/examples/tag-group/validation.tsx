"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Tag, TagGroup } from "@/components/ui/tag-group";

const MAX = 3;
const interests = [
  "Design",
  "Engineering",
  "Product",
  "Data",
  "Security",
  "Marketing",
  "Sales",
];

export default function TagGroupValidation() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["Design", "Engineering", "Product", "Data"]),
  );
  const count = selected === "all" ? interests.length : selected.size;
  const tooMany = count > MAX;
  return (
    <TagGroup
      label="Teams you want to hear from"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      description={tooMany ? undefined : `Pick up to ${MAX}.`}
      errorMessage={
        tooMany
          ? `You can pick up to ${MAX} teams (${count} selected).`
          : undefined
      }
    >
      {interests.map((i) => (
        <Tag key={i} id={i}>
          {i}
        </Tag>
      ))}
    </TagGroup>
  );
}
