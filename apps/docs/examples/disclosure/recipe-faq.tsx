"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { Link } from "@/components/ui/link";

const faqs = [
  {
    id: "trial",
    q: "How does the free trial work?",
    a: "You get every Pro feature for 14 days. We don't ask for a card up front, and you can pick a plan at any point during the trial.",
  },
  {
    id: "seats",
    q: "What counts as a seat?",
    a: "Anyone who can sign in to your workspace. Guests with view-only access to shared links are free.",
  },
  {
    id: "security",
    q: "Where is my data stored?",
    a: "In AWS regions of your choice (US, EU or APAC), encrypted at rest with AES-256 and in transit with TLS 1.3.",
  },
  {
    id: "migrate",
    q: "Can you help us migrate?",
    a: "Yes. Teams on annual plans get a migration engineer and import tools for the most common alternatives.",
  },
];

export default function DisclosureRecipeFaq() {
  return (
    <section className="grid w-full max-w-3xl gap-8 md:grid-cols-[1fr_1.6fr]">
      <div className="grid content-start gap-2">
        <h2 className="font-semibold text-xl tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-muted-foreground text-sm">
          Can't find what you're looking for?{" "}
          <Link href="#">Talk to our team</Link>.
        </p>
      </div>
      <DisclosureGroup defaultExpandedKeys={["trial"]}>
        {faqs.map((f) => (
          <Disclosure key={f.id} id={f.id}>
            <DisclosureTrigger indicator="plus">{f.q}</DisclosureTrigger>
            <DisclosurePanel>{f.a}</DisclosurePanel>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </section>
  );
}
