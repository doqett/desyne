"use client";

import {
  EyeIcon,
  MessageSquareIcon,
  PencilIcon,
  ShieldIcon,
} from "lucide-react";
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDescription,
  ListBoxItemLabel,
} from "@/components/ui/list-box";

const roles = [
  {
    id: "viewer",
    icon: EyeIcon,
    name: "Viewer",
    description: "Can view projects and dashboards",
  },
  {
    id: "commenter",
    icon: MessageSquareIcon,
    name: "Commenter",
    description: "Can view and leave comments",
  },
  {
    id: "editor",
    icon: PencilIcon,
    name: "Editor",
    description: "Can create and edit content",
  },
  {
    id: "admin",
    icon: ShieldIcon,
    name: "Admin",
    description: "Full access, including billing and members",
  },
];

export default function ListBoxRichItems() {
  return (
    <ListBox
      aria-label="Role"
      items={roles}
      selectionMode="single"
      defaultSelectedKeys={["editor"]}
      className="w-full max-w-72"
    >
      {(role) => (
        <ListBoxItem textValue={role.name} className="items-start">
          <role.icon className="mt-0.5" />
          <span className="flex min-w-0 flex-col gap-0.5">
            <ListBoxItemLabel>{role.name}</ListBoxItemLabel>
            <ListBoxItemDescription>{role.description}</ListBoxItemDescription>
          </span>
        </ListBoxItem>
      )}
    </ListBox>
  );
}
