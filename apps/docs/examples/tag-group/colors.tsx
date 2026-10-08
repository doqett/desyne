"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupColors() {
  return (
    <TagGroup aria-label="Labels">
      <Tag color="primary">feature</Tag>
      <Tag color="danger">bug</Tag>
      <Tag color="warning">needs review</Tag>
      <Tag color="success">approved</Tag>
      <Tag color="info">docs</Tag>
      <Tag color="neutral">chore</Tag>
    </TagGroup>
  );
}
