"use client";

import { useState } from "react";
import type { SelectionMode } from "react-aria-components";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export default function ListBoxSelectionModes() {
  const [mode, setMode] = useState<SelectionMode>("multiple");
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ToggleButtonGroup
        aria-label="Selection mode"
        variant="segmented"
        size="sm"
        selectedKeys={[mode]}
        onSelectionChange={(keys) => setMode([...keys][0] as SelectionMode)}
        disallowEmptySelection
      >
        <ToggleButton id="none">none</ToggleButton>
        <ToggleButton id="single">single</ToggleButton>
        <ToggleButton id="multiple">multiple</ToggleButton>
      </ToggleButtonGroup>
      <ListBox
        key={mode}
        aria-label="Regions"
        selectionMode={mode}
        defaultSelectedKeys={mode === "none" ? [] : ["fra"]}
      >
        <ListBoxItem id="iad">US East (Virginia)</ListBoxItem>
        <ListBoxItem id="sfo">US West (California)</ListBoxItem>
        <ListBoxItem id="fra">Europe (Frankfurt)</ListBoxItem>
        <ListBoxItem id="sin">Asia Pacific (Singapore)</ListBoxItem>
        <ListBoxItem id="syd">Asia Pacific (Sydney)</ListBoxItem>
      </ListBox>
    </div>
  );
}
