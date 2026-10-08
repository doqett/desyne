"use client";

import {
  ArchiveIcon,
  DownloadIcon,
  FilterIcon,
  MailIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar";

export default function ToolbarTableActions() {
  const [selected, setSelected] = useState(3);
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Text inputs stay outside the toolbar: it uses ←/→ to move focus. */}
        <SearchField
          aria-label="Search customers"
          placeholder="Search customers"
          className="w-56"
          size="sm"
        />
        <Toolbar aria-label="Customer list" className="ml-auto">
          <Button variant="outline" size="sm">
            <FilterIcon /> Filter
            <Badge size="sm" variant="soft">
              2
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <DownloadIcon /> Export
          </Button>
        </Toolbar>
      </div>
      {selected > 0 ? (
        <Toolbar
          aria-label="Bulk actions"
          variant="floating"
          className="self-center"
        >
          <span className="px-2 font-medium text-sm tabular-nums" role="status">
            {selected} selected
          </span>
          <ToolbarSeparator />
          <ToolbarGroup aria-label="Selected customers">
            <Button variant="ghost" size="sm">
              <MailIcon /> Email
            </Button>
            <Button variant="ghost" size="sm">
              <ArchiveIcon /> Archive
            </Button>
            <Button variant="ghost" size="sm" color="danger">
              <Trash2Icon /> Delete
            </Button>
          </ToolbarGroup>
          <ToolbarSeparator />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Clear selection"
            onPress={() => setSelected(0)}
          >
            <XIcon />
          </Button>
        </Toolbar>
      ) : (
        <Button
          variant="link"
          size="sm"
          className="self-center"
          onPress={() => setSelected(3)}
        >
          Select 3 customers again
        </Button>
      )}
    </div>
  );
}
