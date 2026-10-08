"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupSizes() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup label="Small" size="sm">
        <Tag color="success">stable</Tag>
        <Tag color="info">v2.4.0</Tag>
        <Tag>MIT</Tag>
      </TagGroup>
      <TagGroup label="Medium (default)" size="md">
        <Tag color="success">stable</Tag>
        <Tag color="info">v2.4.0</Tag>
        <Tag>MIT</Tag>
      </TagGroup>
    </div>
  );
}
