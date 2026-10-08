"use client";

import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

export default function CheckboxGroupDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <CheckboxGroup
        label="Email alerts"
        description="Security alerts are required by your organization."
        defaultValue={["security", "billing"]}
      >
        <Checkbox value="security" isDisabled>
          Security alerts
        </Checkbox>
        <Checkbox value="billing">Billing and invoices</Checkbox>
        <Checkbox value="digest">Weekly digest</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        label="Included in your plan"
        isReadOnly
        defaultValue={["sso", "audit"]}
      >
        <Checkbox value="sso">Single sign-on</Checkbox>
        <Checkbox value="audit">Audit log</Checkbox>
        <Checkbox value="scim">SCIM provisioning</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
