"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const ranges = [
  {
    id: "7d",
    label: "7d",
    total: "$12,480",
    change: "+4.2%",
    bars: [40, 55, 48, 62, 58, 71, 66],
  },
  {
    id: "30d",
    label: "30d",
    total: "$51,920",
    change: "+9.8%",
    bars: [52, 48, 60, 57, 64, 70, 68, 75, 72, 80],
  },
  {
    id: "90d",
    label: "90d",
    total: "$148,310",
    change: "+18.1%",
    bars: [30, 38, 45, 42, 51, 58, 55, 63, 70, 74, 79, 86],
  },
];

export default function TabsRecipeAnalytics() {
  return (
    <Card className="w-full max-w-md">
      <Tabs
        variant="segmented"
        size="sm"
        defaultSelectedKey="30d"
        className="gap-4"
      >
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Gross volume, all products</CardDescription>
          <CardAction>
            <TabList aria-label="Date range" items={ranges}>
              {(r) => <Tab id={r.id}>{r.label}</Tab>}
            </TabList>
          </CardAction>
        </CardHeader>
        <CardContent>
          {ranges.map((r) => (
            <TabPanel key={r.id} id={r.id} className="grid gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl text-foreground tabular-nums">
                  {r.total}
                </span>
                <span className="font-medium text-success text-xs">
                  {r.change}
                </span>
              </div>
              <div className="flex h-24 items-end gap-1.5" aria-hidden>
                {r.bars.map((h, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
                    key={i}
                    className="flex-1 rounded-sm bg-brand/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </TabPanel>
          ))}
        </CardContent>
      </Tabs>
    </Card>
  );
}
