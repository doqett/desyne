"use client";

import { ListBox, ListBoxItem, ListBoxSection } from "@/components/ui/list-box";

export default function ListBoxSections() {
  return (
    <ListBox
      aria-label="Permissions"
      selectionMode="multiple"
      defaultSelectedKeys={["read", "comment"]}
      className="w-60"
    >
      <ListBoxSection title="Content">
        <ListBoxItem id="read">Read</ListBoxItem>
        <ListBoxItem id="comment">Comment</ListBoxItem>
        <ListBoxItem id="edit">Edit</ListBoxItem>
      </ListBoxSection>
      <ListBoxSection title="Admin">
        <ListBoxItem id="invite">Invite members</ListBoxItem>
        <ListBoxItem id="billing">Manage billing</ListBoxItem>
      </ListBoxSection>
    </ListBox>
  );
}
