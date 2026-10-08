"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { plan: "enterprise", seats: 1240, fill: "var(--color-enterprise)" },
  { plan: "team", seats: 2860, fill: "var(--color-team)" },
  { plan: "starter", seats: 1910, fill: "var(--color-starter)" },
];

const config = {
  seats: { label: "Seats" },
  enterprise: { label: "Enterprise", color: "var(--chart-1)" },
  team: { label: "Team", color: "var(--chart-2)" },
  starter: { label: "Starter", color: "var(--chart-3)" },
} satisfies ChartConfig;

const total = data.reduce((sum, d) => sum + d.seats, 0);

export default function ChartDonut() {
  return (
    <ChartContainer config={config} className="aspect-square h-[240px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="plan" hideLabel />}
        />
        <Pie
          data={data}
          dataKey="seats"
          nameKey="plan"
          innerRadius={64}
          strokeWidth={4}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox)) return null;
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground font-semibold text-2xl"
                  >
                    {total.toLocaleString()}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 22}
                    className="fill-muted-foreground"
                  >
                    Paid seats
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
