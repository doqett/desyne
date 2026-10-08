"use client";

import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const filters = [
  {
    id: "category",
    label: "Category",
    options: ["Headphones", "Speakers", "Microphones", "Accessories"],
  },
  {
    id: "brand",
    label: "Brand",
    options: ["Aurora", "Northwind", "Sonic Labs"],
  },
  {
    id: "price",
    label: "Price",
    options: ["Under $100", "$100 – $250", "$250 – $500", "Over $500"],
  },
];

export default function DisclosureRecipeFilters() {
  return (
    <aside className="w-full max-w-64 rounded-lg border bg-card px-4 py-2">
      <div className="flex items-center justify-between border-b py-2">
        <h3 className="font-medium text-sm">Filters</h3>
        <Button variant="link" size="sm">
          Clear all
        </Button>
      </div>
      <DisclosureGroup
        allowsMultipleExpanded
        defaultExpandedKeys={["category", "price"]}
      >
        {filters.map((f) => (
          <Disclosure key={f.id} id={f.id}>
            <DisclosureTrigger>{f.label}</DisclosureTrigger>
            <DisclosurePanel>
              <CheckboxGroup
                aria-label={f.label}
                defaultValue={f.id === "category" ? ["Headphones"] : []}
              >
                {f.options.map((o) => (
                  <Checkbox key={o} value={o}>
                    {o}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </aside>
  );
}
