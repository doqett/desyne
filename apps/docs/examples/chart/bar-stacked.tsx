"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { week: "W36", resolved: 42, open: 12 },
  { week: "W37", resolved: 51, open: 9 },
  { week: "W38", resolved: 38, open: 17 },
  { week: "W39", resolved: 64, open: 8 },
  { week: "W40", resolved: 57, open: 11 },
  { week: "W41", resolved: 70, open: 6 },
];

const config = {
  resolved: { label: "Resolved", color: "var(--chart-1)" },
  open: { label: "Still open", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartBarStacked() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[240px] w-full max-w-lg"
    >
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="resolved"
          stackId="tickets"
          fill="var(--color-resolved)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="open"
          stackId="tickets"
          fill="var(--color-open)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
