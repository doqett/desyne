"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { TextField } from "@/components/ui/text-field";

export default function TabsRecipeAccountSettings() {
  return (
    <Card className="w-full max-w-lg">
      <Tabs className="gap-0">
        <TabList aria-label="Account settings" className="px-(--card-px)">
          <Tab id="profile">Profile</Tab>
          <Tab id="notifications">Notifications</Tab>
          <Tab id="security">Security</Tab>
        </TabList>
        <CardContent className="pt-5">
          <TabPanel id="profile" className="grid gap-4">
            <TextField label="Display name" defaultValue="Maya Chen" />
            <TextField
              label="Email"
              type="email"
              defaultValue="maya@acme.dev"
              description="Used for sign-in and receipts."
            />
          </TabPanel>
          <TabPanel id="notifications" className="grid gap-4">
            <Switch
              defaultSelected
              labelPlacement="start"
              description="When someone mentions you or replies to your comment."
            >
              Mentions and replies
            </Switch>
            <Switch
              labelPlacement="start"
              description="A summary of activity in your projects, every Monday."
            >
              Weekly digest
            </Switch>
          </TabPanel>
          <TabPanel id="security" className="grid gap-4">
            <TextField label="Current password" type="password" />
            <TextField label="New password" type="password" />
          </TabPanel>
        </CardContent>
      </Tabs>
      <CardFooter className="justify-end border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}
