"use client";

import { BellOffIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyInCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader separator>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Empty size="sm">
          <EmptyMedia variant="icon">
            <BellOffIcon />
          </EmptyMedia>
          <EmptyTitle className="text-sm">You're all caught up</EmptyTitle>
          <EmptyDescription className="text-xs">
            New mentions, assignments and replies will show up here.
          </EmptyDescription>
        </Empty>
      </CardContent>
    </Card>
  );
}
