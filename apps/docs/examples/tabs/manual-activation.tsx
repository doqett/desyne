"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const reports = [
  {
    id: "revenue",
    label: "Revenue",
    body: "$184,200 this quarter across 1,240 invoices.",
  },
  {
    id: "churn",
    label: "Churn",
    body: "2.1% monthly churn, down from 2.6% last quarter.",
  },
  {
    id: "cohorts",
    label: "Cohorts",
    body: "Retention by signup month for the last 12 months.",
  },
];

export default function TabsManualActivation() {
  return (
    <Tabs keyboardActivation="manual" className="w-full max-w-md">
      <TabList aria-label="Reports">
        {reports.map((r) => (
          <Tab key={r.id} id={r.id}>
            {r.label}
          </Tab>
        ))}
      </TabList>
      {reports.map((r) => (
        <TabPanel key={r.id} id={r.id} className="text-muted-foreground">
          {r.body}
        </TabPanel>
      ))}
    </Tabs>
  );
}
