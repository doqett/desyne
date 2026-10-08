"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function DisclosureMultiple() {
  return (
    <DisclosureGroup
      allowsMultipleExpanded
      defaultExpandedKeys={["details", "materials"]}
      className="max-w-md"
    >
      <Disclosure id="details">
        <DisclosureTrigger>Product details</DisclosureTrigger>
        <DisclosurePanel>
          Over-ear wireless headphones with active noise cancelling and 40 hours
          of battery life.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="materials">
        <DisclosureTrigger>Materials and care</DisclosureTrigger>
        <DisclosurePanel>
          Recycled aluminium frame, protein-leather cushions. Wipe with a dry
          cloth.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="warranty">
        <DisclosureTrigger>Warranty</DisclosureTrigger>
        <DisclosurePanel>
          Two-year limited warranty covering manufacturing defects.
        </DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  );
}
