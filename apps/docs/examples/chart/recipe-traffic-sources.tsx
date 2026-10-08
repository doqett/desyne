"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
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

type Source = "search" | "direct" | "social" | "email";

const data: { source: Source; visits: number; fill: string }[] = [
  { source: "search", visits: 18420, fill: "var(--color-search)" },
  { source: "direct", visits: 9310, fill: "var(--color-direct)" },
  { source: "social", visits: 5870, fill: "var(--color-social)" },
  { source: "email", visits: 3240, fill: "var(--color-email)" },
];

const config = {
  visits: { label: "Visits" },
  search: { label: "Search", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
  email: { label: "Email", color: "var(--chart-4)" },
} satisfies ChartConfig;

const total = data.reduce((sum, d) => sum + d.visits, 0);

export default function ChartRecipeTrafficSources() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader separator>
        <CardTitle>Traffic sources</CardTitle>
        <CardDescription>
          {total.toLocaleString()} visits in September
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <ChartContainer
          config={config}
          className="aspect-square h-[140px] shrink-0"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="source" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visits"
              nameKey="source"
              innerRadius={42}
              strokeWidth={3}
            />
          </PieChart>
        </ChartContainer>
        <ul className="flex flex-1 flex-col gap-2.5 text-sm">
          {data.map((d) => (
            <li key={d.source} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: config[d.source].color }}
              />
              <span className="flex-1">{config[d.source].label}</span>
              <span className="font-mono text-muted-foreground tabular-nums">
                {Math.round((d.visits / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
