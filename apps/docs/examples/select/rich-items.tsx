"use client";

import { CrownIcon, ShieldIcon, UserIcon } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectItemDescription,
  SelectItemLabel,
} from "@/components/ui/select";

const roles = [
  {
    id: "owner",
    name: "Owner",
    description: "Full access, including billing.",
    icon: CrownIcon,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage members and settings.",
    icon: ShieldIcon,
  },
  {
    id: "member",
    name: "Member",
    description: "Access projects they're added to.",
    icon: UserIcon,
  },
];

export default function SelectRichItems() {
  return (
    <Select
      className="w-full max-w-64"
      label="Role"
      items={roles}
      defaultSelectedKey="admin"
    >
      {(role) => (
        <SelectItem textValue={role.name} className="items-start">
          <role.icon className="mt-0.5" />
          <span className="flex flex-col gap-0.5">
            <SelectItemLabel>{role.name}</SelectItemLabel>
            <SelectItemDescription>{role.description}</SelectItemDescription>
          </span>
        </SelectItem>
      )}
    </Select>
  );
}
