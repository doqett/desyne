"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function TabsVertical() {
  return (
    <Tabs orientation="vertical" className="w-full max-w-md">
      <TabList aria-label="Settings" className="w-36">
        <Tab id="general">General</Tab>
        <Tab id="security">Security</Tab>
        <Tab id="integrations">Integrations</Tab>
        <Tab id="billing">Billing</Tab>
      </TabList>
      <TabPanel id="general" className="text-muted-foreground">
        General workspace settings.
      </TabPanel>
      <TabPanel id="security" className="text-muted-foreground">
        SSO, 2FA and session policies.
      </TabPanel>
      <TabPanel id="integrations" className="text-muted-foreground">
        Connected apps and webhooks.
      </TabPanel>
      <TabPanel id="billing" className="text-muted-foreground">
        Plan, invoices and payment methods.
      </TabPanel>
    </Tabs>
  );
}
