"use client";

import { PlusIcon, WebhookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardInset,
  CardTitle,
} from "@/components/ui/card";

export default function CardEmpty() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader separator>
        <CardTitle>
          <WebhookIcon /> Webhooks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardInset className="flex flex-col items-center gap-3 px-6 py-8 text-center">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm">No endpoints yet</p>
            <p className="text-muted-foreground text-xs">
              Send events to your own services when deployments finish or fail.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <PlusIcon /> Add endpoint
          </Button>
        </CardInset>
      </CardContent>
    </Card>
  );
}
