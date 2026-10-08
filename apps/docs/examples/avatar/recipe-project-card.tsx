"use client";

import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const team = [
  { name: "Olivia Martin", initials: "OM" },
  { name: "Jackson Lee", initials: "JL" },
  { name: "Isabella Nguyen", initials: "IN" },
  { name: "William Kim", initials: "WK" },
  { name: "Sofia Davis", initials: "SD" },
  { name: "Lucas Brown", initials: "LB" },
  { name: "Amara Okafor", initials: "AO" },
];

export default function AvatarRecipeProjectCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="mb-2">
          <Avatar
            shape="square"
            size="lg"
            colorful
            alt="Atlas logo"
            fallback="AT"
          />
        </div>
        <CardTitle>Atlas redesign</CardTitle>
        <CardDescription>
          New navigation and dashboard for the Q4 launch.
        </CardDescription>
        <CardAction>
          <Badge size="sm" variant="dot" color="success">
            On track
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-between">
        <AvatarGroup
          max={4}
          size="sm"
          role="group"
          aria-label={`${team.length} team members`}
        >
          {team.map((p) => (
            <Avatar key={p.name} colorful alt={p.name} fallback={p.initials} />
          ))}
        </AvatarGroup>
        <span className="text-muted-foreground text-xs">Due Nov 14</span>
      </CardFooter>
    </Card>
  );
}
