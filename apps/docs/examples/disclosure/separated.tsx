"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const faqs = [
  {
    id: "included",
    q: "What's included in the Pro plan?",
    a: "Unlimited projects, 1 TB of bandwidth, preview deployments for every branch and email support.",
  },
  {
    id: "cancel",
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from Billing settings and you keep Pro features until the end of the current period.",
  },
  {
    id: "refunds",
    q: "Do you offer refunds?",
    a: "We refund annual plans in full within 14 days of purchase. Contact support and we'll handle it within one business day.",
  },
];

export default function DisclosureSeparated() {
  return (
    <DisclosureGroup variant="separated" className="max-w-md">
      {faqs.map((f) => (
        <Disclosure key={f.id} id={f.id}>
          <DisclosureTrigger indicator="plus">{f.q}</DisclosureTrigger>
          <DisclosurePanel>{f.a}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
