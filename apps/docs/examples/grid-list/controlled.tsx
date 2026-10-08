"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  GridList,
  GridListItem,
  GridListItemDescription,
  GridListItemLabel,
} from "@/components/ui/grid-list";

const integrations = [
  { id: "slack", name: "Slack", detail: "Post alerts to #incidents" },
  { id: "github", name: "GitHub", detail: "Link commits and pull requests" },
  { id: "linear", name: "Linear", detail: "Create issues from alerts" },
  { id: "pagerduty", name: "PagerDuty", detail: "Page the on-call engineer" },
  { id: "datadog", name: "Datadog", detail: "Import metrics and monitors" },
];

export default function GridListControlled() {
  const [selected, setSelected] = useState<Selection>(
    new Set(["slack", "github"]),
  );
  const count = selected === "all" ? integrations.length : selected.size;
  return (
    <div className="flex w-full max-w-80 flex-col gap-2">
      <GridList
        aria-label="Integrations"
        items={integrations}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {(item) => (
          <GridListItem textValue={item.name}>
            <span className="flex min-w-0 flex-col">
              <GridListItemLabel>{item.name}</GridListItemLabel>
              <GridListItemDescription>{item.detail}</GridListItemDescription>
            </span>
          </GridListItem>
        )}
      </GridList>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs">
          {count} of {integrations.length} enabled
        </span>
        <Button
          size="xs"
          variant="ghost"
          onPress={() => setSelected(new Set())}
        >
          Disable all
        </Button>
      </div>
    </div>
  );
}
