"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

const labels = ["frontend", "accessibility", "good first issue", "docs"];

export default function TagGroupVariants() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Outline (default)" variant="outline">
        {labels.map((l) => (
          <Tag key={l}>{l}</Tag>
        ))}
      </TagGroup>
      <TagGroup label="Soft" variant="soft">
        {labels.map((l) => (
          <Tag key={l}>{l}</Tag>
        ))}
      </TagGroup>
    </div>
  );
}
