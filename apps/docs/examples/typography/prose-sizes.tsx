"use client";

import { useState } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Prose } from "@/components/ui/typography";

type Size = "sm" | "md" | "lg";

export default function TypographyProseSizes() {
  const [size, setSize] = useState<Size>("sm");
  return (
    <div className="flex w-full max-w-prose flex-col gap-5">
      <ToggleButtonGroup
        aria-label="Text size"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[size]}
        onSelectionChange={(keys) => setSize([...keys][0] as Size)}
        variant="segmented"
        size="sm"
        className="self-start"
      >
        <ToggleButton id="sm">Small</ToggleButton>
        <ToggleButton id="md">Medium</ToggleButton>
        <ToggleButton id="lg">Large</ToggleButton>
      </ToggleButtonGroup>
      <Prose size={size}>
        <h3>Release notes · 4.2</h3>
        <p>
          Comments now support <strong>threads</strong> and{" "}
          <a href="#mentions">@mentions</a>. Everything else scales with the
          size you pick, because the article measures in <code>em</code>.
        </p>
        <ul>
          <li>Resolve a thread to collapse it.</li>
          <li>Mentions notify by email after five minutes.</li>
        </ul>
      </Prose>
    </div>
  );
}
