"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const defaults = {
  categories: ["jackets"],
  price: [40, 240] as number[],
  sort: "popular",
  inStock: true,
};

export default function SheetRecipeFilters() {
  const [applied, setApplied] = useState(defaults);
  const [draft, setDraft] = useState(defaults);
  const count = applied.categories.length + (applied.inStock ? 1 : 0);

  return (
    <SheetTrigger onOpenChange={(open) => open && setDraft(applied)}>
      <Button variant="outline">
        <SlidersHorizontalIcon /> Filters
        {count > 0 && (
          <Badge size="sm" color="brand" shape="pill">
            {count}
          </Badge>
        )}
      </Button>
      <SheetContent side="left" size="sm">
        {({ close }) => (
          <>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down 1,204 products.</SheetDescription>
            </SheetHeader>
            <div className="grid min-h-0 flex-1 content-start gap-6 overflow-y-auto p-5">
              <CheckboxGroup
                label="Category"
                value={draft.categories}
                onChange={(categories) => setDraft({ ...draft, categories })}
              >
                <Checkbox value="jackets">Jackets</Checkbox>
                <Checkbox value="knitwear">Knitwear</Checkbox>
                <Checkbox value="shirts">Shirts</Checkbox>
                <Checkbox value="trousers">Trousers</Checkbox>
              </CheckboxGroup>
              <Slider
                label="Price"
                minValue={0}
                maxValue={400}
                step={10}
                value={draft.price}
                onChange={(price) => setDraft({ ...draft, price })}
                formatOptions={{
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }}
              />
              <RadioGroup
                label="Sort by"
                value={draft.sort}
                onChange={(sort) => setDraft({ ...draft, sort })}
              >
                <Radio value="popular">Most popular</Radio>
                <Radio value="newest">Newest</Radio>
                <Radio value="price">Price: low to high</Radio>
              </RadioGroup>
              <Switch
                isSelected={draft.inStock}
                onChange={(inStock) => setDraft({ ...draft, inStock })}
              >
                In stock only
              </Switch>
            </div>
            <SheetFooter className="sm:justify-between">
              <Button variant="ghost" onPress={() => setDraft(defaults)}>
                Reset
              </Button>
              <Button
                onPress={() => {
                  setApplied(draft);
                  close();
                }}
              >
                Show results
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </SheetTrigger>
  );
}
