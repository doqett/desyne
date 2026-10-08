"use client";

import { NumberField } from "@/components/ui/number-field";

const limits = [
  {
    id: "memory",
    title: "Memory",
    description: "RAM available to each instance.",
    defaultValue: 2,
    minValue: 0.5,
    maxValue: 16,
    step: 0.5,
    formatOptions: { style: "unit", unit: "gigabyte" },
  },
  {
    id: "instances",
    title: "Max instances",
    description: "Upper bound for autoscaling.",
    defaultValue: 4,
    minValue: 1,
    maxValue: 50,
    step: 1,
  },
  {
    id: "timeout",
    title: "Request timeout",
    description: "Requests running longer are cancelled.",
    defaultValue: 30,
    minValue: 1,
    maxValue: 900,
    step: 5,
    formatOptions: { style: "unit", unit: "second", unitDisplay: "short" },
  },
] satisfies {
  id: string;
  title: string;
  description: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  formatOptions?: Intl.NumberFormatOptions;
}[];

export default function NumberFieldRecipeLimits() {
  return (
    <div className="w-full max-w-lg divide-y rounded-xl border bg-card">
      {limits.map(({ id, title, description, ...field }) => (
        <div key={id} className="flex items-center justify-between gap-6 p-4">
          <div>
            <p id={`${id}-label`} className="font-medium text-sm">
              {title}
            </p>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
          <NumberField
            aria-labelledby={`${id}-label`}
            size="sm"
            className="w-32 shrink-0"
            {...field}
          />
        </div>
      ))}
    </div>
  );
}
