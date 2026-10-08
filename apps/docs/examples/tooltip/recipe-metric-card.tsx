"use client";

import { InfoIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const metrics = [
  {
    label: "Net revenue retention",
    value: "118%",
    delta: "+4.2 pts",
    help: "Revenue this month from customers who were active 12 months ago, divided by their revenue back then. Includes expansion, contraction and churn.",
  },
  {
    label: "Payback period",
    value: "11.4 mo",
    delta: "−0.8 mo",
    help: "Months of gross margin needed to recover the cost of acquiring a customer.",
  },
];

export default function TooltipRecipeMetricCard() {
  return (
    <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            {m.label}
            <TooltipTrigger delay={200}>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`About ${m.label}`}
              >
                <InfoIcon />
              </Button>
              <Tooltip
                variant="light"
                placement="top start"
                className="max-w-64"
              >
                <p className="font-medium text-foreground">{m.label}</p>
                <p className="mt-1 text-muted-foreground">{m.help}</p>
              </Tooltip>
            </TooltipTrigger>
          </div>
          <p className="mt-2 font-semibold text-2xl tabular-nums">{m.value}</p>
          <p className="mt-1 flex items-center gap-1 text-success text-xs">
            <TrendingUpIcon className="size-3.5" /> {m.delta} vs last quarter
          </p>
        </div>
      ))}
    </div>
  );
}
