"use client";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

// TODO: confirm licensing answers before launch.
const faqs = [
  {
    id: "diff",
    q: "What's the difference between free and Pro?",
    a: "The free library is every core component — buttons, forms, overlays, collections and more — installed with the shadcn CLI. Pro adds production-ready blocks and full-page templates built from those components: dashboards, marketing sections, authentication flows and app screens.",
  },
  {
    id: "shadcn",
    q: "Do I need to use shadcn/ui?",
    a: "No, but it helps. Components use shadcn token names and install through the shadcn CLI, so they drop into an existing shadcn project and inherit its theme. Any React 19 + Tailwind v4 project works.",
  },
  {
    id: "frameworks",
    q: "Which frameworks are supported?",
    a: "Anything that runs React 19 — Next.js, Vite, React Router, TanStack Start. Components are plain .tsx files with no framework-specific code.",
  },
  {
    id: "license",
    q: "Can I use Pro in client and commercial projects?",
    a: "Yes. A license covers unlimited personal and commercial projects. You can't resell the blocks or templates as a competing kit.",
  },
  {
    id: "updates",
    q: "Is it really a one-time payment?",
    a: "Yes. Pay once and keep access to every block and template, including the ones we add later. No subscription.",
  },
];

export function Faq() {
  return (
    <DisclosureGroup defaultExpandedKeys={["diff"]}>
      {faqs.map((f) => (
        <Disclosure key={f.id} id={f.id}>
          <DisclosureTrigger>{f.q}</DisclosureTrigger>
          <DisclosurePanel>
            <p className="text-muted-foreground leading-relaxed">{f.a}</p>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
