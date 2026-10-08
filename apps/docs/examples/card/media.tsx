"use client";

import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardMedia() {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0">
      <div className="relative aspect-[2/1] bg-[radial-gradient(circle_at_20%_20%,var(--chart-2),transparent_55%),radial-gradient(circle_at_80%_30%,var(--chart-1),transparent_50%),linear-gradient(135deg,var(--chart-5),var(--chart-4))]">
        <Badge
          variant="solid"
          color="neutral"
          shape="pill"
          className="absolute top-3 left-3"
        >
          Conference
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>Design Systems Summit 2026</CardTitle>
        <CardDescription>
          Two days of talks on tokens, accessibility and component APIs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 text-muted-foreground text-xs">
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" /> Nov 12–13, 2026
        </span>
        <span className="flex items-center gap-1.5">
          <MapPinIcon className="size-3.5" /> Lisbon, Portugal
        </span>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">
          Get tickets
        </Button>
      </CardFooter>
    </Card>
  );
}
