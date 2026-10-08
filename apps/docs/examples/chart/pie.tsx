"use client";

import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const config = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function ChartPie() {
  return (
    <ChartContainer config={config} className="aspect-square h-[280px]">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="browser" hideLabel />}
        />
        <Pie data={data} dataKey="visitors" nameKey="browser" />
        <ChartLegend
          content={
            <ChartLegendContent
              nameKey="browser"
              className="flex-wrap gap-x-4 gap-y-1"
            />
          }
        />
      </PieChart>
    </ChartContainer>
  );
}
