"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { day: "Mon", critical: 4, high: 12 },
  { day: "Tue", critical: 7, high: 9 },
  { day: "Wed", critical: 3, high: 15 },
  { day: "Thu", critical: 9, high: 11 },
  { day: "Fri", critical: 5, high: 8 },
  { day: "Sat", critical: 2, high: 4 },
  { day: "Sun", critical: 1, high: 6 },
];

const config = {
  critical: { label: "Critical", color: "var(--destructive)" },
  high: { label: "High", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartLine() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[220px] w-full max-w-lg"
    >
      <LineChart data={data} margin={{ left: 0, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="critical"
          type="monotone"
          stroke="var(--color-critical)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="high"
          type="monotone"
          stroke="var(--color-high)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
