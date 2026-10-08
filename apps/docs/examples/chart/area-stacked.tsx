"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { month: "Apr", organic: 3200, paid: 1400, referral: 600 },
  { month: "May", organic: 3600, paid: 1800, referral: 750 },
  { month: "Jun", organic: 3400, paid: 2400, referral: 700 },
  { month: "Jul", organic: 4100, paid: 2100, referral: 980 },
  { month: "Aug", organic: 4700, paid: 2600, referral: 1100 },
  { month: "Sep", organic: 5200, paid: 2300, referral: 1350 },
];

const config = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  paid: { label: "Paid", color: "var(--chart-2)" },
  referral: { label: "Referral", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function ChartAreaStacked() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[260px] w-full max-w-lg"
    >
      <AreaChart data={data} margin={{ left: 0, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={36}
          tickFormatter={(v: number) => `${v / 1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        {(["referral", "paid", "organic"] as const).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="monotone"
            stackId="traffic"
            stroke={`var(--color-${key})`}
            fill={`var(--color-${key})`}
            fillOpacity={0.25}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
