"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const steps = [
  {
    id: "details",
    label: "Details",
    body: "Name your project and pick a region.",
  },
  {
    id: "repository",
    label: "Repository",
    body: "Connect a Git repository to deploy from.",
  },
  {
    id: "environment",
    label: "Environment",
    body: "Add the environment variables your build needs.",
  },
];

export default function TabsControlled() {
  const [selected, setSelected] = useState<Key>("details");
  const index = steps.findIndex((s) => s.id === selected);

  return (
    <div className="grid w-full max-w-md gap-4">
      <Tabs selectedKey={selected} onSelectionChange={setSelected}>
        <TabList aria-label="New project">
          {steps.map((s) => (
            <Tab key={s.id} id={s.id}>
              {s.label}
            </Tab>
          ))}
        </TabList>
        {steps.map((s) => (
          <TabPanel key={s.id} id={s.id} className="text-muted-foreground">
            {s.body}
          </TabPanel>
        ))}
      </Tabs>
      <div className="flex justify-between">
        <Button
          variant="outline"
          isDisabled={index === 0}
          onPress={() => setSelected(steps[index - 1].id)}
        >
          Back
        </Button>
        <Button
          isDisabled={index === steps.length - 1}
          onPress={() => setSelected(steps[index + 1].id)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
