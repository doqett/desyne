"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<
  string,
  { label?: React.ReactNode; icon?: React.ComponentType } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context)
    throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

/**
 * Wraps a Recharts chart: makes it responsive, applies theme styles, and exposes
 * `var(--color-<key>)` for every key in `config`.
 */
export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config).filter(([, c]) => c.theme || c.color);
  if (!entries.length) return null;
  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = entries
        .map(([key, item]) => {
          const color =
            item.theme?.[theme as keyof typeof THEMES] || item.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      return `${prefix} [data-chart=${id}] {\n${vars}\n}`;
    })
    .join("\n");
  // biome-ignore lint/security/noDangerouslySetInnerHtml: CSS generated from the chart config, not user input
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartLegend = RechartsPrimitive.Legend;

interface PayloadItem {
  name?: string | number;
  value?: unknown;
  dataKey?: string | number | ((obj: unknown) => unknown);
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
}

function getPayloadConfig(config: ChartConfig, item: PayloadItem, key: string) {
  const inner = item.payload;
  const configKey =
    (typeof inner?.[key] === "string" && (inner[key] as string)) ||
    (key in item &&
      typeof item[key as keyof PayloadItem] === "string" &&
      (item[key as keyof PayloadItem] as string)) ||
    key;
  return config[configKey] ?? config[key];
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: readonly PayloadItem[];
  label?: React.ReactNode;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (
    label: React.ReactNode,
    payload: readonly PayloadItem[],
  ) => React.ReactNode;
  formatter?: (
    value: unknown,
    name: string | number | undefined,
    item: PayloadItem,
    index: number,
  ) => React.ReactNode;
  labelKey?: string;
  nameKey?: string;
  color?: string;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  labelFormatter,
  formatter,
  labelKey,
  nameKey,
  color,
}: ChartTooltipContentProps) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  const first = payload[0];
  const labelItem = getPayloadConfig(
    config,
    first,
    `${labelKey || first.dataKey || first.name || "value"}`,
  );
  const labelValue =
    !labelKey && typeof label === "string"
      ? (config[label]?.label ?? label)
      : labelItem?.label;
  const tooltipLabel = hideLabel ? null : labelFormatter ? (
    <div className="font-medium">{labelFormatter(labelValue, payload)}</div>
  ) : labelValue ? (
    <div className="font-medium">{labelValue}</div>
  ) : null;
  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border bg-card px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel && tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfig(config, item, key);
          const indicatorColor =
            color || (item.payload?.fill as string | undefined) || item.color;
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: series may repeat a dataKey
              key={`${String(item.dataKey)}-${index}`}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center",
              )}
            >
              {formatter &&
              item.value !== undefined &&
              item.name !== undefined ? (
                formatter(item.value, item.name, item, index)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "size-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          },
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center",
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel && tooltipLabel}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value !== undefined && item.value !== null && (
                      <span className="font-medium font-mono text-foreground tabular-nums">
                        {typeof item.value === "number"
                          ? item.value.toLocaleString()
                          : String(item.value)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface ChartLegendContentProps {
  payload?: readonly PayloadItem[];
  verticalAlign?: "top" | "middle" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
  className?: string;
}

export function ChartLegendContent({
  payload,
  verticalAlign = "bottom",
  hideIcon = false,
  nameKey,
  className,
}: ChartLegendContentProps) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfig(config, item, key);
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: pie legends repeat one dataKey per slice
            key={`${String(item.dataKey ?? item.name)}-${index}`}
            className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground"
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}
