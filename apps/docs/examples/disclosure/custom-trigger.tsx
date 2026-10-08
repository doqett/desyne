"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Disclosure, DisclosurePanel } from "@/components/ui/disclosure";

const files = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/components/checkout-form.tsx",
  "src/lib/stripe.ts",
  "src/lib/retry.ts",
  "tests/checkout.spec.ts",
];

export default function DisclosureCustomTrigger() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Disclosure
      isExpanded={isExpanded}
      onExpandedChange={setExpanded}
      className="w-full max-w-sm border-b-0"
    >
      <ul className="grid gap-1 font-mono text-xs">
        {files.slice(0, 3).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <DisclosurePanel>
        <ul className="grid gap-1 pt-1 font-mono text-foreground text-xs">
          {files.slice(3).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </DisclosurePanel>
      <Button slot="trigger" variant="link" size="sm" className="mt-2">
        {isExpanded ? "Show less" : `Show ${files.length - 3} more files`}
        <ChevronDownIcon className="transition-transform group-data-expanded/disclosure:rotate-180" />
      </Button>
    </Disclosure>
  );
}
