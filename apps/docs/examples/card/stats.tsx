"use client";

import {
  ShieldAlertIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    label: "Active users",
    value: "12,480",
    delta: "+8.2%",
    up: true,
    icon: UsersIcon,
  },
  {
    label: "Open incidents",
    value: "7",
    delta: "-3",
    up: false,
    icon: ShieldAlertIcon,
  },
];

export default function CardStats() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      {stats.map((s) => (
        <Card key={s.label} size="sm">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <s.icon className="size-3.5" /> {s.label}
            </CardDescription>
            <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
            <CardAction>
              <Badge
                variant="soft"
                color={s.up ? "success" : "danger"}
                size="sm"
              >
                {s.up ? <TrendingUpIcon /> : <TrendingDownIcon />} {s.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-muted-foreground text-xs">
            vs. last 7 days
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
