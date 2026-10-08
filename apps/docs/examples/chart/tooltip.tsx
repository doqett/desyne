"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { day: "Mon", builds: 38, failures: 4 },
  { day: "Tue", builds: 52, failures: 2 },
  { day: "Wed", builds: 47, failures: 6 },
  { day: "Thu", builds: 61, failures: 3 },
  { day: "Fri", builds: 44, failures: 1 },
];

const config = {
  builds: { label: "Builds", color: "var(--chart-1)" },
  failures: { label: "Failures", color: "var(--destructive)" },
} satisfies ChartConfig;

const variants = [
  { title: 'indicator="dot"', props: { indicator: "dot" } },
  { title: 'indicator="line"', props: { indicator: "line" } },
  { title: 'indicator="dashed"', props: { indicator: "dashed" } },
  { title: "hideLabel", props: { hideLabel: true } },
] as const;

export default function ChartTooltipExample() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      {variants.map((v) => (
        <div key={v.title} className="flex flex-col gap-2">
          <code className="text-muted-foreground text-xs">{v.title}</code>
          <ChartContainer config={config} className="aspect-auto h-[180px]">
            <BarChart data={data} margin={{ top: 8 }}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                defaultIndex={1}
                cursor={false}
                content={<ChartTooltipContent {...v.props} />}
              />
              <Bar dataKey="builds" fill="var(--color-builds)" radius={4} />
              <Bar dataKey="failures" fill="var(--color-failures)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      ))}
    </div>
  );
}
