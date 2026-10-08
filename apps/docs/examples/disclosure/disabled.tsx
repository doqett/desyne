"use client";

import { LockIcon } from "lucide-react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function DisclosureDisabled() {
  return (
    <DisclosureGroup variant="card" className="max-w-md">
      <Disclosure id="general">
        <DisclosureTrigger>General</DisclosureTrigger>
        <DisclosurePanel>
          Workspace name, URL and default language.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure id="sso" isDisabled>
        <DisclosureTrigger>
          <LockIcon /> Single sign-on (Enterprise)
        </DisclosureTrigger>
        <DisclosurePanel>SAML and OIDC configuration.</DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  );
}
