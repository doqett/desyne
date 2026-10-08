"use client";

import { Badge } from "@/components/ui/badge";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const tabs = [
  { id: "open", label: "Open", count: 24 },
  { id: "in-review", label: "In review", count: 6 },
  { id: "closed", label: "Closed", count: 1284 },
];

export default function TabsBadges() {
  return (
    <Tabs className="w-full max-w-md">
      <TabList aria-label="Pull requests">
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id}>
            {t.label}
            <Badge size="sm" shape="pill">
              {t.count.toLocaleString()}
            </Badge>
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => (
        <TabPanel key={t.id} id={t.id} className="text-muted-foreground">
          {t.count.toLocaleString()} {t.label.toLowerCase()} pull requests.
        </TabPanel>
      ))}
    </Tabs>
  );
}
