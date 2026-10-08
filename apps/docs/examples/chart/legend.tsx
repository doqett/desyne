"use client";

import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Apr", desktop: 186, mobile: 120, tablet: 40 },
  { month: "May", desktop: 205, mobile: 168, tablet: 44 },
  { month: "Jun", desktop: 237, mobile: 190, tablet: 52 },
  { month: "Jul", desktop: 213, mobile: 232, tablet: 49 },
  { month: "Aug", desktop: 256, mobile: 261, tablet: 58 },
  { month: "Sep", desktop: 274, mobile: 298, tablet: 61 },
];

const config = {
  desktop: { label: "Desktop", icon: MonitorIcon, color: "var(--chart-1)" },
  mobile: { label: "Mobile", icon: SmartphoneIcon, color: "var(--chart-2)" },
  tablet: { label: "Tablet", icon: TabletIcon, color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartLegendExample() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[260px] w-full max-w-lg"
    >
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend
          verticalAlign="top"
          content={<ChartLegendContent verticalAlign="top" />}
        />
        {(["desktop", "mobile", "tablet"] as const).map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
