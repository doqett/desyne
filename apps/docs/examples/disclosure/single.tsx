"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function DisclosureSingle() {
  return (
    <Disclosure className="w-full max-w-md border-b-0">
      <DisclosureTrigger>Show system requirements</DisclosureTrigger>
      <DisclosurePanel>
        macOS 13+, Windows 11 or a recent Linux distribution. 8 GB RAM
        recommended.
      </DisclosurePanel>
    </Disclosure>
  );
}
