"use client";

import { Focusable } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const focusRing =
  "cursor-help rounded-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25";

export default function TooltipCustomTrigger() {
  return (
    <p className="max-w-sm text-sm leading-relaxed">
      Median latency (
      <TooltipTrigger>
        <Focusable>
          {/* biome-ignore lint/a11y/useSemanticElements: inline term, not a button */}
          <span
            role="button"
            tabIndex={0}
            className={`${focusRing} underline decoration-dotted underline-offset-4`}
          >
            p50
          </span>
        </Focusable>
        <Tooltip>50th percentile: half of all requests were faster</Tooltip>
      </TooltipTrigger>
      ) dropped to 182 ms this week{" "}
      <TooltipTrigger>
        <Focusable>
          <span
            role="img"
            aria-label="Down 12%"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so keyboard users get the tooltip
            tabIndex={0}
            className={focusRing}
          >
            <Badge size="sm" color="success">
              −12%
            </Badge>
          </span>
        </Focusable>
        <Tooltip>Compared with the previous 7 days</Tooltip>
      </TooltipTrigger>
    </p>
  );
}
