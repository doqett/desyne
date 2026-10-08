"use client";

import { TrendingUpIcon } from "lucide-react";
import { Area, AreaChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { date: "Sep 1", mrr: 38200 },
  { date: "Sep 5", mrr: 39100 },
  { date: "Sep 9", mrr: 38800 },
  { date: "Sep 13", mrr: 40600 },
  { date: "Sep 17", mrr: 41900 },
  { date: "Sep 21", mrr: 41400 },
  { date: "Sep 25", mrr: 43800 },
  { date: "Sep 29", mrr: 45250 },
];

const config = {
  mrr: { label: "MRR", color: "var(--chart-1)" },
} satisfies ChartConfig;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ChartRecipeKpi() {
  return (
    <Card className="w-full max-w-sm overflow-hidden pb-0">
      <CardHeader>
        <CardDescription>Monthly recurring revenue</CardDescription>
        <CardTitle className="font-semibold text-2xl tabular-nums">
          {currency.format(45250)}
        </CardTitle>
        <CardAction>
          <Badge size="sm" color="success">
            <TrendingUpIcon /> +18.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={config} className="aspect-auto h-[96px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 4, left: 0, right: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="kpiFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-mrr)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-mrr)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    String(payload[0]?.payload?.date ?? "")
                  }
                  formatter={(value) => (
                    <div className="flex w-full justify-between gap-4">
                      <span className="text-muted-foreground">MRR</span>
                      <span className="font-medium font-mono tabular-nums">
                        {currency.format(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="mrr"
              type="monotone"
              stroke="var(--color-mrr)"
              strokeWidth={2}
              fill="url(#kpiFill)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
