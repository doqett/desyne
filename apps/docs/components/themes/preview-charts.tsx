"use client";

import { useId } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* Theme preview charts, split out of preview.tsx so recharts loads lazily. */

const revenue = [
  { month: "Jan", revenue: 18_600, previous: 14_200 },
  { month: "Feb", revenue: 30_500, previous: 21_100 },
  { month: "Mar", revenue: 23_700, previous: 24_800 },
  { month: "Apr", revenue: 27_300, previous: 19_900 },
  { month: "May", revenue: 36_900, previous: 26_400 },
  { month: "Jun", revenue: 45_200, previous: 31_000 },
];

const revenueConfig = {
  revenue: { label: "This year", color: "var(--chart-1)" },
  previous: { label: "Last year", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function RevenueChart() {
  const id = useId().replace(/:/g, "");
  return (
    <ChartContainer config={revenueConfig} className="aspect-auto h-36 w-full">
      <AreaChart data={revenue} margin={{ left: 4, right: 4, top: 4 }}>
        <defs>
          <linearGradient id={`${id}-rev`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.02}
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
          dataKey="previous"
          type="natural"
          fill="transparent"
          stroke="var(--color-previous)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
        />
        <Area
          dataKey="revenue"
          type="natural"
          fill={`url(#${id}-rev)`}
          stroke="var(--color-revenue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

const trafficConfig = {
  visits: { label: "Visits", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function TrafficChart({
  data,
}: {
  data: { day: string; visits: number }[];
}) {
  return (
    <ChartContainer config={trafficConfig} className="aspect-auto h-32 w-full">
      <BarChart data={data}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
