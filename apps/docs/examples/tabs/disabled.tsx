"use client";

import { LockIcon } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export default function TabsDisabled() {
  return (
    <Tabs className="w-full max-w-md" disabledKeys={["audit-log"]}>
      <TabList aria-label="Workspace">
        <Tab id="members">Members</Tab>
        <Tab id="roles">Roles</Tab>
        <Tab id="audit-log">
          <LockIcon /> Audit log
        </Tab>
      </TabList>
      <TabPanel id="members" className="text-muted-foreground">
        12 members across 3 teams.
      </TabPanel>
      <TabPanel id="roles" className="text-muted-foreground">
        Owner, Admin, Member and Viewer.
      </TabPanel>
      <TabPanel id="audit-log" className="text-muted-foreground">
        Audit logs are available on the Enterprise plan.
      </TabPanel>
    </Tabs>
  );
}
