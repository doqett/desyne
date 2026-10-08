"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const panels = [
  {
    id: "overview",
    title: "Overview",
    body: "Production is healthy. The last deployment finished 12 minutes ago with no errors.",
  },
  {
    id: "activity",
    title: "Activity",
    body: "148 deployments this month. A preview is created for every pull request.",
  },
  {
    id: "analytics",
    title: "Analytics",
    body: "32.4k visitors in the last 7 days, up 8% from the week before.",
  },
  {
    id: "settings",
    title: "Settings",
    body: "Manage domains, environment variables and build settings.",
  },
];

export default function TabsDemo() {
  return (
    <Tabs className="w-full max-w-md">
      <TabList aria-label="Project">
        {panels.map((p) => (
          <Tab key={p.id} id={p.id}>
            {p.title}
          </Tab>
        ))}
      </TabList>
      {panels.map((p) => (
        <TabPanel key={p.id} id={p.id} className="text-muted-foreground">
          {p.body}
        </TabPanel>
      ))}
    </Tabs>
  );
}
