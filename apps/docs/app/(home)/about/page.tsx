import { CheckIcon, XIcon } from "lucide-react";
import type { Metadata } from "next";
import {
  Band,
  CTA,
  Dim,
  Heading,
  Lead,
  PageHero,
} from "@/components/marketing/primitives";
import { pageMetadata } from "@/lib/seo";
import { proUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About & license",
  description:
    "Why Desyne exists, the principles behind its accessible React components, and the license in plain words: what the free library and Pro let you ship.",
  path: "/about",
});

const principles = [
  {
    title: "Accessible first",
    body: "Every component is built on React Aria, so keyboard, focus and screen-reader behaviour are correct before styling starts.",
  },
  {
    title: "Your code, not ours",
    body: "Components are copied into your project. There’s no package to upgrade and nothing you can’t change.",
  },
  {
    title: "Tokens, not themes",
    body: "shadcn variable names throughout. Change a handful of CSS variables and everything follows.",
  },
  {
    title: "Real content",
    body: "Examples, blocks and templates use believable data and every state, so they survive contact with your product.",
  },
];

// TODO: confirm the license terms before launch.
const can = [
  "Use the free, MIT-licensed components in any project, personal or commercial",
  "Use Pro blocks and templates in unlimited client and commercial projects",
  "Modify everything, and ship it inside apps you sell",
  "Keep using everything you downloaded, forever",
];
const cannot = [
  "Resell or redistribute Pro blocks or templates as a kit, theme or template",
  "Publish Pro source in a public repository",
  "Share a personal licence with your team (that’s what Team is for)",
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <PageHero
        title={
          <>
            Interfaces should be accessible{" "}
            <Dim>and beautiful. Not one or the other.</Dim>
          </>
        }
        lead="Desyne is a component library and a set of Pro blocks and templates for shipping product UI that feels finished, without giving up control of the code."
      />
      <Band>
        <Heading>What we optimise for.</Heading>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="bg-card p-6">
              <p className="font-semibold">{p.title}</p>
              <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Band>
      <Band muted id="license">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading>The license, in plain words.</Heading>
            <Lead>
              The free components are open source under the MIT License. Pro is
              licensed separately, as a one-time purchase per developer or team.
            </Lead>
            <div className="mt-6 flex gap-2">
              <CTA href={`${proUrl}/pricing`}>See pricing</CTA>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-5">
              <p className="font-medium">You can</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                {can.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border bg-card p-5">
              <p className="font-medium">You can’t</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                {cannot.map((c) => (
                  <li key={c} className="flex gap-2">
                    <XIcon className="mt-0.5 size-4 shrink-0 text-destructive" />{" "}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Band>
      {/* TODO: replace with your real contact addresses. */}
      <Band>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            [
              "Support",
              "Questions about components or your licence.",
              "support@desyne.dev",
            ],
            [
              "Partnerships",
              "Agencies, schools and open-source projects.",
              "hello@desyne.dev",
            ],
            [
              "Security",
              "Found a vulnerability? Tell us privately.",
              "security@desyne.dev",
            ],
          ].map(([t, d, e]) => (
            <div key={t}>
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-muted-foreground text-sm">{d}</p>
              <a
                href={`mailto:${e}`}
                className="mt-2 inline-block font-mono text-brand text-sm hover:underline"
              >
                {e}
              </a>
            </div>
          ))}
        </div>
      </Band>
    </main>
  );
}
