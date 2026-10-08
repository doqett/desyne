"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { page: "/pricing", views: 4210 },
  { page: "/docs", views: 3580 },
  { page: "/blog/launch", views: 2240 },
  { page: "/changelog", views: 1390 },
  { page: "/careers", views: 820 },
];

const config = {
  views: { label: "Page views", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function ChartBarHorizontal() {
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-[240px] w-full max-w-lg"
    >
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <XAxis type="number" dataKey="views" hide />
        <YAxis
          type="category"
          dataKey="page"
          tickLine={false}
          axisLine={false}
          width={88}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="views" fill="var(--color-views)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
