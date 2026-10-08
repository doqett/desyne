"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    id: "deploys",
    label: "Deployments",
    description: "When a production deploy succeeds or fails.",
    defaultSelected: true,
  },
  {
    id: "mentions",
    label: "Mentions",
    description: "When someone mentions you in a comment.",
    defaultSelected: true,
  },
  {
    id: "digest",
    label: "Weekly digest",
    description: "A Monday summary of usage and spend.",
    defaultSelected: false,
  },
];

export default function CardRecipeSettings() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader separator>
        <CardTitle>
          <BellIcon /> Email notifications
        </CardTitle>
        <CardDescription>Choose what lands in your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {settings.map((s, i) => (
          <div key={s.id} className="flex flex-col gap-3">
            {i > 0 && <Separator />}
            <Switch
              labelPlacement="start"
              description={s.description}
              defaultSelected={s.defaultSelected}
            >
              {s.label}
            </Switch>
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end border-t">
        <Button variant="ghost" size="sm">
          Reset
        </Button>
        <Button size="sm">Save preferences</Button>
      </CardFooter>
    </Card>
  );
}
