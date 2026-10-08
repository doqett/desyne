"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { quarter: "Q1", revenue: 182, target: 200 },
  { quarter: "Q2", revenue: 236, target: 220 },
  { quarter: "Q3", revenue: 271, target: 250 },
  { quarter: "Q4", revenue: 318, target: 290 },
];

// `theme` sets a separate color for light and dark mode.
const config = {
  revenue: {
    label: "Revenue ($k)",
    theme: { light: "oklch(0.55 0.17 160)", dark: "oklch(0.78 0.15 160)" },
  },
  target: {
    label: "Target ($k)",
    theme: { light: "oklch(0.87 0.02 260)", dark: "oklch(0.4 0.03 260)" },
  },
} satisfies ChartConfig;

export default function ChartTheme() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[220px] w-full max-w-lg"
    >
      <BarChart data={data} barGap={4}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="target" fill="var(--color-target)" radius={4} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
