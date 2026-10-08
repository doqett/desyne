"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function TabsSegmented() {
  return (
    <Tabs variant="segmented" className="w-full max-w-md">
      <TabList aria-label="Billing period">
        <Tab id="monthly">Monthly</Tab>
        <Tab id="yearly">Yearly</Tab>
      </TabList>
      <TabPanel id="monthly" className="text-muted-foreground">
        $12 per seat, billed monthly.
      </TabPanel>
      <TabPanel id="yearly" className="text-muted-foreground">
        $10 per seat, billed yearly. Save 17%.
      </TabPanel>
    </Tabs>
  );
}
