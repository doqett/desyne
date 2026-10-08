"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function DisclosureIndicators() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      {(["chevron", "plus"] as const).map((indicator) => (
        <DisclosureGroup
          key={indicator}
          variant="card"
          defaultExpandedKeys={["shipping"]}
        >
          <Disclosure id="shipping">
            <DisclosureTrigger indicator={indicator}>
              Shipping
            </DisclosureTrigger>
            <DisclosurePanel>
              Free on orders over $50. Ships in 1–2 days.
            </DisclosurePanel>
          </Disclosure>
          <Disclosure id="returns">
            <DisclosureTrigger indicator={indicator}>Returns</DisclosureTrigger>
            <DisclosurePanel>
              Return unworn items within 30 days.
            </DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      ))}
    </div>
  );
}
