"use client";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ToggleButtonGroupDemo() {
  return (
    <ToggleButtonGroup
      aria-label="Text alignment"
      defaultSelectedKeys={["left"]}
      disallowEmptySelection
    >
      <ToggleButton id="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleButton>
      <ToggleButton id="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleButton>
      <ToggleButton id="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleButton>
      <ToggleButton id="justify" aria-label="Justify">
        <AlignJustifyIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
