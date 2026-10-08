"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Jan", visitors: 1860 },
  { month: "Feb", visitors: 3050 },
  { month: "Mar", visitors: 2370 },
  { month: "Apr", visitors: 1730 },
  { month: "May", visitors: 2090 },
  { month: "Jun", visitors: 2140 },
];

const config = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartArea() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[220px] w-full max-w-lg"
    >
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <defs>
          <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="visitors"
          type="natural"
          fill="url(#fillVisitors)"
          stroke="var(--color-visitors)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
