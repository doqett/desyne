"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const data = [
  { date: "Sep 16", signups: 142, activations: 88 },
  { date: "Sep 17", signups: 168, activations: 101 },
  { date: "Sep 18", signups: 155, activations: 97 },
  { date: "Sep 19", signups: 201, activations: 124 },
  { date: "Sep 20", signups: 96, activations: 58 },
  { date: "Sep 21", signups: 84, activations: 49 },
  { date: "Sep 22", signups: 187, activations: 119 },
  { date: "Sep 23", signups: 214, activations: 140 },
  { date: "Sep 24", signups: 230, activations: 151 },
  { date: "Sep 25", signups: 198, activations: 133 },
  { date: "Sep 26", signups: 176, activations: 115 },
  { date: "Sep 27", signups: 103, activations: 66 },
  { date: "Sep 28", signups: 91, activations: 57 },
  { date: "Sep 29", signups: 242, activations: 162 },
];

const config = {
  signups: { label: "Sign-ups", color: "var(--chart-1)" },
  activations: { label: "Activations", color: "var(--chart-2)" },
} satisfies ChartConfig;

type Metric = keyof typeof config;

const totals = {
  signups: data.reduce((s, d) => s + d.signups, 0),
  activations: data.reduce((s, d) => s + d.activations, 0),
};

export default function ChartRecipeInteractive() {
  const [metric, setMetric] = useState<Metric>("signups");

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {totals[metric].toLocaleString()} {config[metric].label.toLowerCase()}
        </CardTitle>
        <CardDescription>Last 14 days</CardDescription>
        <CardAction>
          <ToggleButtonGroup
            aria-label="Metric"
            variant="segmented"
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[metric]}
            onSelectionChange={(keys: Set<Key>) => {
              const [next] = keys;
              if (next) setMetric(next as Metric);
            }}
          >
            <ToggleButton id="signups">Sign-ups</ToggleButton>
            <ToggleButton id="activations">Activations</ToggleButton>
          </ToggleButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="aspect-auto h-[220px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={metric} fill={`var(--color-${metric})`} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
