"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupDemo() {
  return (
    <TagGroup
      label="Interests"
      selectionMode="multiple"
      defaultSelectedKeys={["design", "security"]}
    >
      <Tag id="design">Design</Tag>
      <Tag id="engineering">Engineering</Tag>
      <Tag id="security">Security</Tag>
      <Tag id="product">Product</Tag>
      <Tag id="data">Data</Tag>
    </TagGroup>
  );
}
