"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const sections = [
  "General",
  "Members",
  "Billing",
  "Domains",
  "Integrations",
  "Webhooks",
  "Security",
  "Audit log",
];

export default function TabsScrollable() {
  return (
    <Tabs className="w-full max-w-sm" defaultSelectedKey="Security">
      <TabList aria-label="Workspace settings">
        {sections.map((s) => (
          <Tab key={s} id={s}>
            {s}
          </Tab>
        ))}
      </TabList>
      {sections.map((s) => (
        <TabPanel key={s} id={s} className="text-muted-foreground">
          {s} settings for the Acme workspace.
        </TabPanel>
      ))}
    </Tabs>
  );
}
