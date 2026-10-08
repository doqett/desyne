"use client";

import { Tag, TagGroup } from "@/components/ui/tag-group";

export default function TagGroupDisabled() {
  return (
    <TagGroup
      label="Available sizes"
      selectionMode="multiple"
      defaultSelectedKeys={["m"]}
      disabledKeys={["xs", "xxl"]}
      description="Sold-out sizes are disabled."
    >
      <Tag id="xs">XS</Tag>
      <Tag id="s">S</Tag>
      <Tag id="m">M</Tag>
      <Tag id="l">L</Tag>
      <Tag id="xl">XL</Tag>
      <Tag id="xxl">XXL</Tag>
    </TagGroup>
  );
}
