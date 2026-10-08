"use client";

import { ArrowDownUpIcon, CircleDashedIcon } from "lucide-react";
import { SearchField } from "@/components/ui/search-field";
import { Select, SelectItem } from "@/components/ui/select";

export default function SelectRecipeFilters() {
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center gap-2 rounded-lg border bg-card p-2">
      <SearchField
        aria-label="Search issues"
        size="sm"
        className="min-w-40 flex-1"
      />
      <Select
        aria-label="Status"
        size="sm"
        prefix={<CircleDashedIcon />}
        defaultSelectedKey="open"
        className="w-36"
      >
        <SelectItem id="all">All statuses</SelectItem>
        <SelectItem id="open">Open</SelectItem>
        <SelectItem id="closed">Closed</SelectItem>
      </Select>
      <Select
        aria-label="Sort by"
        size="sm"
        prefix={<ArrowDownUpIcon />}
        defaultSelectedKey="updated"
        className="w-40"
      >
        <SelectItem id="updated">Recently updated</SelectItem>
        <SelectItem id="created">Newest</SelectItem>
        <SelectItem id="comments">Most comments</SelectItem>
      </Select>
    </div>
  );
}
