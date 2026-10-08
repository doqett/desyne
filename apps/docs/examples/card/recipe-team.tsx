"use client";

import { MoreHorizontalIcon, UserPlusIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

const members = [
  {
    name: "Olivia Martin",
    email: "olivia@northwind.io",
    role: "Owner",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson@northwind.io",
    role: "Admin",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella@northwind.io",
    role: "Member",
    initials: "IN",
  },
];

export default function CardRecipeTeam() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>3 of 5 seats used on the Team plan.</CardDescription>
        <CardAction>
          <Button variant="outline" size="xs">
            <UserPlusIcon /> Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2">
        <ItemGroup>
          {members.map((m) => (
            <Item key={m.email} size="sm">
              <ItemMedia>
                <Avatar colorful alt={m.name} fallback={m.initials} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{m.name}</ItemTitle>
                <ItemDescription>{m.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge size="sm" variant="outline">
                  {m.role}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Options for ${m.name}`}
                >
                  <MoreHorizontalIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
