"use client";

import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export default function ListBoxDisabled() {
  return (
    <ListBox
      aria-label="Plan"
      selectionMode="single"
      defaultSelectedKeys={["team"]}
      disabledKeys={["enterprise"]}
      className="w-full max-w-64"
    >
      <ListBoxItem id="hobby">Hobby</ListBoxItem>
      <ListBoxItem id="pro">Pro</ListBoxItem>
      <ListBoxItem id="team">Team</ListBoxItem>
      <ListBoxItem id="enterprise">Enterprise (contact sales)</ListBoxItem>
    </ListBox>
  );
}
