"use client";

import {
  CircleIcon,
  HandIcon,
  MousePointer2Icon,
  PenToolIcon,
  SquareIcon,
  TypeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const tools = [
  { id: "select", label: "Select", key: "V", icon: MousePointer2Icon },
  { id: "hand", label: "Hand", key: "H", icon: HandIcon },
  { id: "pen", label: "Pen", key: "P", icon: PenToolIcon },
  { id: "rect", label: "Rectangle", key: "R", icon: SquareIcon },
  { id: "ellipse", label: "Ellipse", key: "O", icon: CircleIcon },
  { id: "text", label: "Text", key: "T", icon: TypeIcon },
];

export default function ToolbarVertical() {
  const [tool, setTool] = useState("select");
  const [zoom, setZoom] = useState(100);
  const active = tools.find((t) => t.id === tool);
  return (
    <div className="flex items-start gap-6">
      <Toolbar
        aria-label="Canvas tools"
        orientation="vertical"
        variant="floating"
      >
        <ToggleButtonGroup
          aria-label="Tool"
          orientation="vertical"
          variant="spaced"
          size="md"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[tool]}
          onSelectionChange={(keys) => setTool(String([...keys][0]))}
          className="gap-0.5"
        >
          {tools.map(({ id, label, key, icon: Icon }) => (
            <TooltipTrigger key={id} delay={400}>
              <ToggleButton id={id} aria-label={label}>
                <Icon />
              </ToggleButton>
              <Tooltip placement="right">
                {label} <span className="text-muted-foreground">{key}</span>
              </Tooltip>
            </TooltipTrigger>
          ))}
        </ToggleButtonGroup>
        <ToolbarSeparator />
        <ToolbarGroup aria-label="Zoom">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            isDisabled={zoom >= 400}
            onPress={() => setZoom((z) => Math.min(400, z * 2))}
          >
            <ZoomInIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            isDisabled={zoom <= 25}
            onPress={() => setZoom((z) => Math.max(25, z / 2))}
          >
            <ZoomOutIcon />
          </Button>
        </ToolbarGroup>
      </Toolbar>
      <div className="text-muted-foreground text-sm" aria-live="polite">
        <p>
          Tool:{" "}
          <span className="font-medium text-foreground">{active?.label}</span>
        </p>
        <p>
          Zoom:{" "}
          <span className="font-medium text-foreground tabular-nums">
            {zoom}%
          </span>
        </p>
      </div>
    </div>
  );
}
