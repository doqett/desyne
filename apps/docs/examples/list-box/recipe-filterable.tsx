"use client";

import { Autocomplete, useFilter } from "react-aria-components";
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDescription,
  ListBoxItemLabel,
} from "@/components/ui/list-box";
import { SearchField } from "@/components/ui/search-field";

const timezones = [
  { id: "America/Los_Angeles", city: "Los Angeles", offset: "UTC−08:00" },
  { id: "America/Denver", city: "Denver", offset: "UTC−07:00" },
  { id: "America/Chicago", city: "Chicago", offset: "UTC−06:00" },
  { id: "America/New_York", city: "New York", offset: "UTC−05:00" },
  { id: "America/Sao_Paulo", city: "São Paulo", offset: "UTC−03:00" },
  { id: "Europe/London", city: "London", offset: "UTC+00:00" },
  { id: "Europe/Berlin", city: "Berlin", offset: "UTC+01:00" },
  { id: "Europe/Helsinki", city: "Helsinki", offset: "UTC+02:00" },
  { id: "Asia/Dubai", city: "Dubai", offset: "UTC+04:00" },
  { id: "Asia/Kolkata", city: "Kolkata", offset: "UTC+05:30" },
  { id: "Asia/Kathmandu", city: "Kathmandu", offset: "UTC+05:45" },
  { id: "Asia/Singapore", city: "Singapore", offset: "UTC+08:00" },
  { id: "Asia/Tokyo", city: "Tokyo", offset: "UTC+09:00" },
  { id: "Australia/Sydney", city: "Sydney", offset: "UTC+10:00" },
  { id: "Pacific/Auckland", city: "Auckland", offset: "UTC+12:00" },
];

export default function ListBoxRecipeFilterable() {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    <div className="flex w-full max-w-72 flex-col gap-2 rounded-lg border bg-popover p-2 shadow-xs">
      <Autocomplete filter={contains}>
        <SearchField
          aria-label="Search time zones"
          placeholder="Search cities…"
          size="sm"
        />
        <ListBox
          aria-label="Time zones"
          items={timezones}
          selectionMode="single"
          defaultSelectedKeys={["Europe/Berlin"]}
          className="max-h-60 border-0 p-0"
          renderEmptyState={() => "No matching time zones."}
        >
          {(tz) => (
            <ListBoxItem textValue={tz.city}>
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                <ListBoxItemLabel>{tz.city}</ListBoxItemLabel>
                <ListBoxItemDescription className="tabular-nums">
                  {tz.offset}
                </ListBoxItemDescription>
              </span>
            </ListBoxItem>
          )}
        </ListBox>
      </Autocomplete>
    </div>
  );
}
