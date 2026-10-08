"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

const faqs = [
  {
    id: "a11y",
    q: "Is it accessible?",
    a: "Yes. Every component is built on React Aria and follows WAI-ARIA patterns.",
  },
  {
    id: "shadcn",
    q: "Does it work with shadcn/ui?",
    a: "Yes. It uses the same tokens and installs with the shadcn CLI.",
  },
  {
    id: "themes",
    q: "Can I change the theme?",
    a: "Change the CSS variables. Every component reads from them.",
  },
];

export default function DisclosureDemo() {
  return (
    <DisclosureGroup className="max-w-md" defaultExpandedKeys={["a11y"]}>
      {faqs.map((f) => (
        <Disclosure key={f.id} id={f.id}>
          <DisclosureTrigger>{f.q}</DisclosureTrigger>
          <DisclosurePanel>{f.a}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
