"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupSingleSelection() {
  return (
    <TagGroup
      label="Shipping speed"
      selectionMode="single"
      disallowEmptySelection
      defaultSelectedKeys={["standard"]}
    >
      <Tag id="economy">Economy · 5–8 days</Tag>
      <Tag id="standard">Standard · 3–5 days</Tag>
      <Tag id="express">Express · 1–2 days</Tag>
      <Tag id="overnight">Overnight</Tag>
    </TagGroup>
  );
}
