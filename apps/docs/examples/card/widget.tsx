import { GaugeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardInset,
  CardTitle,
} from "@/components/ui/card";

export default function CardWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader separator>
        <CardTitle>
          <GaugeIcon /> Product health
        </CardTitle>
        <CardAction>
          <Button variant="outline" size="xs">
            Details
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardInset className="flex items-baseline justify-between p-3">
          <span className="text-muted-foreground text-xs">Health score</span>
          <span className="font-semibold text-2xl tabular-nums">87</span>
        </CardInset>
        <p className="text-muted-foreground text-xs leading-relaxed">
          An icon title, an inset divider and one quiet action: the anatomy
          every widget card shares.
        </p>
      </CardContent>
    </Card>
  );
}
