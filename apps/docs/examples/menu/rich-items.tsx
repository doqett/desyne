"use client";

import {
  ChevronDownIcon,
  EyeIcon,
  MessageSquareIcon,
  PencilIcon,
} from "lucide-react";
import { useState } from "react";
import { type Selection, Text } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const roles = [
  {
    id: "edit",
    label: "Can edit",
    description: "Make any change, invite others",
    icon: PencilIcon,
  },
  {
    id: "comment",
    label: "Can comment",
    description: "Add comments and suggestions",
    icon: MessageSquareIcon,
  },
  {
    id: "view",
    label: "Can view",
    description: "Read only, no comments",
    icon: EyeIcon,
  },
];

export default function MenuRichItems() {
  const [selected, setSelected] = useState<Selection>(new Set(["comment"]));
  const [key] = selected === "all" ? [] : selected;
  const current = roles.find((r) => r.id === key);
  return (
    <MenuTrigger>
      <Button variant="ghost" size="sm">
        {current?.label} <ChevronDownIcon />
      </Button>
      <MenuContent
        aria-label="Permission"
        items={roles}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
        placement="bottom end"
        className="w-72"
      >
        {(role) => (
          <MenuItem textValue={role.label} className="items-start">
            <role.icon className="mt-0.5" />
            <span className="flex flex-col gap-0.5">
              <Text slot="label" className="font-medium">
                {role.label}
              </Text>
              <Text
                slot="description"
                className="text-muted-foreground text-xs"
              >
                {role.description}
              </Text>
            </span>
          </MenuItem>
        )}
      </MenuContent>
    </MenuTrigger>
  );
}
