"use client";

import { CreditCardIcon, KeyRoundIcon, UsersIcon } from "lucide-react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function DisclosureCard() {
  return (
    <DisclosureGroup
      variant="card"
      className="max-w-md"
      defaultExpandedKeys={["members"]}
    >
      <Disclosure id="members">
        <DisclosureTrigger>
          <UsersIcon /> Members
        </DisclosureTrigger>
        <DisclosurePanel>
          Invite people to the workspace and choose what they can access.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="keys">
        <DisclosureTrigger>
          <KeyRoundIcon /> API keys
        </DisclosureTrigger>
        <DisclosurePanel>
          Create keys for CI and server-side scripts. Keys inherit the
          permissions of the member who created them.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="billing">
        <DisclosureTrigger>
          <CreditCardIcon /> Billing
        </DisclosureTrigger>
        <DisclosurePanel>
          Change your plan, update the card on file and download invoices.
        </DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  );
}
