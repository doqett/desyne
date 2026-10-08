"use client";

import { CalendarIcon, DatabaseIcon, HashIcon, MailIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

const integrations = [
  {
    id: "chat",
    name: "Team chat",
    description: "Post deploy and incident alerts to #ops.",
    icon: HashIcon,
    connected: true,
    enabled: true,
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Block focus time around on-call shifts.",
    icon: CalendarIcon,
    connected: true,
    enabled: false,
  },
  {
    id: "email",
    name: "Email digest",
    description: "A weekly summary of usage and spend.",
    icon: MailIcon,
    connected: true,
    enabled: true,
  },
  {
    id: "warehouse",
    name: "Data warehouse",
    description: "Sync events to Snowflake or BigQuery.",
    icon: DatabaseIcon,
    connected: false,
    enabled: false,
  },
];

export default function ItemRecipeIntegrations() {
  return (
    <ItemGroup className="w-full max-w-md gap-0 rounded-xl border bg-card p-1">
      {integrations.map((i, index) => (
        <div key={i.id} className="contents">
          {index > 0 && <ItemSeparator />}
          <Item>
            <ItemMedia variant="icon">
              <i.icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle id={`${i.id}-title`}>
                {i.name}
                {!i.connected && (
                  <Badge size="sm" variant="outline">
                    Not connected
                  </Badge>
                )}
              </ItemTitle>
              <ItemDescription>{i.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              {i.connected ? (
                <Switch
                  aria-labelledby={`${i.id}-title`}
                  defaultSelected={i.enabled}
                />
              ) : (
                <Button variant="outline" size="xs">
                  Connect
                </Button>
              )}
            </ItemActions>
          </Item>
        </div>
      ))}
    </ItemGroup>
  );
}
