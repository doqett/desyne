"use client";

import { KanbanIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { Tab, TabList, Tabs } from "@/components/ui/tabs";

export default function TabsIconOnly() {
  return (
    <Tabs variant="segmented" size="sm" defaultSelectedKey="board">
      <TabList aria-label="View">
        <Tab id="list" aria-label="List view">
          <ListIcon />
        </Tab>
        <Tab id="board" aria-label="Board view">
          <KanbanIcon />
        </Tab>
        <Tab id="grid" aria-label="Grid view">
          <LayoutGridIcon />
        </Tab>
      </TabList>
    </Tabs>
  );
}
