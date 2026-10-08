"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuSelection() {
  const [panels, setPanels] = useState<Selection>(new Set(["status"]));
  const [position, setPosition] = useState<Selection>(new Set(["bottom"]));
  return (
    <MenuTrigger>
      <Button variant="outline">View options</Button>
      <MenuContent className="w-56">
        <MenuSection
          title="Panels"
          selectionMode="multiple"
          selectedKeys={panels}
          onSelectionChange={setPanels}
        >
          <MenuItem id="status">Status bar</MenuItem>
          <MenuItem id="activity">Activity bar</MenuItem>
          <MenuItem id="panel">Panel</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection
          title="Position"
          selectionMode="single"
          selectedKeys={position}
          onSelectionChange={setPosition}
        >
          <MenuItem id="top">Top</MenuItem>
          <MenuItem id="bottom">Bottom</MenuItem>
          <MenuItem id="right">Right</MenuItem>
        </MenuSection>
      </MenuContent>
    </MenuTrigger>
  );
}
