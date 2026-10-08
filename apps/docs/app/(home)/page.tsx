import { components } from "@desyne/ui/registry";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "@/components/home/copy-command";
import { ExhibitWall } from "@/components/home/exhibit-wall";
import { Faq } from "@/components/home/faq";
import { JsonLd } from "@/components/json-ld";
import { CodeTour } from "@/components/marketing/code-tour";
import { KeyboardLab } from "@/components/marketing/keyboard-lab";
import {
  Band,
  CTA,
  container,
  Dim,
  Heading,
  Lead,
} from "@/components/marketing/primitives";
import { RecipeWall } from "@/components/marketing/recipe-wall";
import { BlockMarquee, TemplateCard } from "@/components/marketing/shots";
import { ThemeStudio } from "@/components/marketing/theme-studio";
import { examples } from "@/examples/__index__";
import {
  absoluteUrl,
  homeDescription,
  homeTitle,
  organization,
  pageMetadata,
  repoUrl,
  siteName,
} from "@/lib/seo";
import { installCommand, proUrl, stats, templates } from "@/lib/site";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  absoluteTitle: homeTitle,
  description: homeDescription,
  path: "/",
});

const structuredData = [
  organization,
  {
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}/#website`,
    name: siteName,
    url: absoluteUrl("/"),
    description: homeDescription,
    inLanguage: "en",
    publisher: { "@id": organization["@id"] },
  },
  {
    "@type": "SoftwareSourceCode",
    name: "Desyne",
    description: homeDescription,
    url: absoluteUrl("/"),
    codeRepository: repoUrl,
    programmingLanguage: "TypeScript",
    runtimePlatform: "React 19",
    license: "https://opensource.org/licenses/MIT",
    author: { "@id": organization["@id"] },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
];

/** The three theming levers, each with the code that pulls it. */
const levers = [
  {
    title: "Tokens",
    body: "shadcn variable names. Change a value and every component follows, in light and dark.",
    code: `:root {
  --brand: oklch(0.56 0.14 160);
  --radius: 0.5rem;
}
.dark {
  --brand: oklch(0.72 0.14 160);
}`,
  },
  {
    title: "Tones",
    body: "One color prop on buttons, badges, alerts and progress, backed by two variables.",
    code: `<Button color="brand">Deploy</Button>
<Badge color="success" variant="soft">
  Live
</Badge>
<Alert color="warning">…</Alert>`,
  },
  {
    title: "Density",
    body: "Controls share one 28 / 32 / 40px height scale, so mixed rows line up.",
    code: `<TextField size="sm" />  // 28px
<Select size="md" />     // 32px
<Button size="lg">       // 40px
  Save
</Button>`,
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "Every component, forever",
    href: "/docs/installation",
  },
  {
    name: "Pro",
    price: "$149",
    note: "One developer, one-time",
    href: `${proUrl}/pricing`,
    featured: true,
  },
  {
    name: "Team",
    price: "$399",
    note: "Up to 10 developers, one-time",
    href: `${proUrl}/pricing`,
  },
];

export default function HomePage() {
  const count = components.filter((c) =>
    source.getPage(["components", c.name]),
  ).length;
  const exampleCount = Object.keys(examples).length;

  return (
    <main className="relative flex flex-1 flex-col overflow-x-clip">
      <JsonLd data={structuredData} />
      {/* hero */}
      <section className="relative isolate">
        <div
          aria-hidden
          className="home-grid -z-10 absolute inset-0 opacity-70"
        />
        <div
          className={cn(
            container,
            "grid grid-cols-1 items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:pb-20",
          )}
        >
          <div className="min-w-0">
            <a
              href={proUrl}
              className="group inline-flex max-w-full items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-sm shadow-xs hover:bg-muted"
            >
              <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 font-medium text-brand-foreground text-xs">
                New
              </span>
              <span className="truncate">
                {stats.blocks} Pro blocks and {stats.templates} templates
              </span>
              <span
                aria-hidden
                className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <Heading as="h1" className="mt-6 lg:text-[3.6rem]">
              Accessible components that <Dim>look finished on day one.</Dim>
            </Heading>
            <Lead>
              {count} React components built on React Aria and shadcn tokens.
              Copy them into your app, theme them with a few variables, and keep
              every line of code.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-2">
              <CTA href="/docs/installation">Get started</CTA>
              <CTA href="/docs/components" tone="outline">
                Browse components
              </CTA>
            </div>
            <CopyCommand command={installCommand} className="mt-6 max-w-md" />
          </div>
          <ThemeStudio />
        </div>
      </section>

      {/* proof strip */}
      <section className="border-t">
        <dl className={cn(container, "grid grid-cols-2 lg:grid-cols-4")}>
          {[
            [String(count), "components with docs"],
            [String(exampleCount), "live, editable examples"],
            ["30+", "locales, RTL included"],
            ["100%", "of the source in your repo"],
          ].map(([v, l], i) => (
            <div
              key={l}
              className={cn(
                "flex flex-col-reverse border-b px-4 py-6 sm:px-6 lg:border-b-0",
                i % 2 === 0 ? "border-r" : "lg:border-r",
                i === 3 && "lg:border-r-0",
              )}
            >
              <dt className="mt-0.5 text-muted-foreground text-sm">{l}</dt>
              <dd className="font-semibold text-2xl tracking-tight">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* recipes */}
      <Band id="components">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading>
              Real patterns, not just primitives.{" "}
              <Dim>Try them right here.</Dim>
            </Heading>
          </div>
          <CTA href="/docs/components" tone="outline">
            All {count} components
          </CTA>
        </div>
        <div className="mt-10">
          <RecipeWall />
        </div>
      </Band>

      {/* accessibility */}
      <Band muted>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading>
              Put the mouse down. <Dim>Everything still works.</Dim>
            </Heading>
            <Lead>
              Focus management, keyboard navigation and screen-reader
              announcements come from React Aria, the hooks behind Adobe’s
              design systems. Tab through the form and watch.
            </Lead>
          </div>
          <CTA href="/docs/accessibility" tone="outline">
            Accessibility guide
          </CTA>
        </div>
        <div className="mt-10">
          <KeyboardLab />
        </div>
      </Band>

      {/* theming */}
      <Band id="theming">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading>
              Your brand in a few variables. <Dim>Every component follows.</Dim>
            </Heading>
          </div>
          <CTA href="/docs/theming" tone="outline">
            Theming guide
          </CTA>
        </div>
        <div className="mt-10">
          <ExhibitWall />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {levers.map((l) => (
            <div
              key={l.title}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card"
            >
              <div className="p-5">
                <p className="font-semibold">{l.title}</p>
                <p className="mt-1 text-muted-foreground text-sm">{l.body}</p>
              </div>
              <pre className="dark mt-auto overflow-x-auto border-t bg-background p-4 font-mono text-[0.75rem] text-foreground/85 leading-relaxed">
                {l.code}
              </pre>
            </div>
          ))}
        </div>
      </Band>

      {/* code */}
      <Band muted>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading>
              A dependency you can read. <Dim>Because it’s not one.</Dim>
            </Heading>
            <Lead>
              The shadcn CLI writes plain source into your repo. Change
              anything; there’s no upstream to fight.
            </Lead>
          </div>
          <CTA href="/docs/cli" tone="outline">
            CLI & registry
          </CTA>
        </div>
        <div className="mt-10">
          <CodeTour />
        </div>
      </Band>

      {/* pro */}
      <Band id="pro">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading>
              Stop assembling. <Dim>Start from whole pages.</Dim>
            </Heading>
            <Lead>
              {stats.blocks} blocks and {stats.templates} multi-page templates
              built from these same components, with real content, dark mode and
              every state designed.
            </Lead>
          </div>
          <div className="flex flex-wrap gap-2">
            <CTA href={`${proUrl}/templates`} tone="outline">
              Templates
            </CTA>
            <CTA href={proUrl} tone="brand">
              Explore Pro
            </CTA>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.slice(0, 3).map((t, i) => (
            <TemplateCard
              key={t.slug}
              t={t}
              className={cn("min-w-0", i === 2 && "sm:max-lg:hidden")}
            />
          ))}
        </div>
        <div className="-mx-5 sm:mx-0 mt-4">
          <BlockMarquee />
        </div>
        <div className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border bg-card sm:grid-cols-3">
          {plans.map((p, i) => (
            <Link
              key={p.name}
              href={p.href}
              className={cn(
                "group flex items-center gap-4 px-5 py-4 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/60",
                i > 0 && "border-t sm:border-t-0 sm:border-l",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-medium text-sm">
                  {p.name}
                  {p.featured && (
                    <span className="rounded-full bg-brand/10 px-1.5 py-px font-medium text-[0.6875rem] text-brand">
                      Popular
                    </span>
                  )}
                </p>
                <p className="mt-0.5 truncate text-muted-foreground text-xs">
                  {p.note}
                </p>
              </div>
              <span className="font-semibold text-xl tracking-tight">
                {p.price}
              </span>
              <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      </Band>

      {/* faq */}
      <Band muted>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading>Questions, answered.</Heading>
            <Lead>
              Something else? Read the{" "}
              <Link
                href="/docs"
                className="text-foreground underline underline-offset-4"
              >
                documentation
              </Link>{" "}
              or the{" "}
              <Link
                href="/about#license"
                className="text-foreground underline underline-offset-4"
              >
                license
              </Link>
              .
            </Lead>
          </div>
          <Faq />
        </div>
      </Band>

      {/* final cta */}
      <section className="border-t">
        <div className={cn(container, "py-16 sm:py-20")}>
          <div className="dark relative overflow-hidden rounded-3xl bg-background px-6 py-14 text-center text-foreground sm:px-12">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,color-mix(in_oklab,var(--brand)_35%,transparent),transparent)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance font-semibold text-3xl tracking-[-0.035em] sm:text-[2.6rem] sm:leading-[1.1]">
                Ship the interface your product deserves.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Start free in a minute. Upgrade when you want whole pages.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <CTA href="/docs/installation" tone="brand">
                  Start for free
                </CTA>
                <CTA href={proUrl} tone="outline">
                  See Pro
                </CTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
