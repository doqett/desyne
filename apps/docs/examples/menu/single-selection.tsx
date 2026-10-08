"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { MenuContent, MenuItem, MenuTrigger } from "@/components/ui/menu";

const options = [
  { id: "updated", label: "Last updated" },
  { id: "created", label: "Date created" },
  { id: "name", label: "Name" },
  { id: "size", label: "File size" },
];

export default function MenuSingleSelection() {
  const [selected, setSelected] = useState<Selection>(new Set(["updated"]));
  const [key] = selected === "all" ? [] : selected;
  const current = options.find((o) => o.id === key);
  return (
    <MenuTrigger>
      <Button variant="outline">
        <ArrowDownUpIcon /> Sort: {current?.label}
      </Button>
      <MenuContent
        aria-label="Sort by"
        items={options}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(o) => <MenuItem>{o.label}</MenuItem>}
      </MenuContent>
    </MenuTrigger>
  );
}
