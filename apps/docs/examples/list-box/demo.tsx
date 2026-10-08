"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export default function ListBoxDemo() {
  return (
    <ListBox
      aria-label="Environment"
      selectionMode="single"
      defaultSelectedKeys={["staging"]}
      className="w-56"
    >
      <ListBoxItem id="development">Development</ListBoxItem>
      <ListBoxItem id="staging">Staging</ListBoxItem>
      <ListBoxItem id="production">Production</ListBoxItem>
      <ListBoxItem id="preview" isDisabled>
        Preview (disabled)
      </ListBoxItem>
    </ListBox>
  );
}
