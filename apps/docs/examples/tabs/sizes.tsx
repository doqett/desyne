"use client";

import { Tab, TabList, Tabs } from "@/components/ui/tabs";

const variants = ["line", "segmented", "enclosed"] as const;
const sizes = ["sm", "md"] as const;

export default function TabsSizes() {
  return (
    <div className="grid w-full max-w-md gap-6">
      {variants.map((variant) =>
        sizes.map((size) => (
          <Tabs key={`${variant}-${size}`} variant={variant} size={size}>
            <TabList aria-label={`${variant} ${size}`}>
              <Tab id="day">Day</Tab>
              <Tab id="week">Week</Tab>
              <Tab id="month">Month</Tab>
            </TabList>
          </Tabs>
        )),
      )}
    </div>
  );
}
