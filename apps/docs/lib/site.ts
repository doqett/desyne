/**
 * Marketing content shared by the home, showcase, changelog and about pages.
 * Edit copy, prices and links here.
 */

/** Where Desyne Pro lives (the blocks and templates site). Override with NEXT_PUBLIC_PRO_URL. */
export const proUrl =
  process.env.NEXT_PUBLIC_PRO_URL ?? "https://pro.desyne.dev";

export const installCommand = "npx shadcn@latest add @desyne/button";

export const stats = {
  blocks: 400,
  templates: 20,
};

export const nav = {
  product: [
    { label: "Components", href: "/docs/components" },
    { label: "Installation", href: "/docs/installation" },
    { label: "Theming", href: "/docs/theming" },
    { label: "Theme builder", href: "/themes" },
    { label: "Showcase", href: "/showcase" },
  ],
  pro: [
    { label: "Pro blocks", href: `${proUrl}/blocks` },
    { label: "Templates", href: `${proUrl}/templates` },
    { label: "Pricing", href: `${proUrl}/pricing` },
  ],
  company: [
    { label: "Changelog", href: "/changelog" },
    { label: "About & license", href: "/about" },
  ],
  legal: [
    { label: "Terms", href: `${proUrl}/terms` },
    { label: "Privacy", href: `${proUrl}/privacy` },
    { label: "Refunds", href: `${proUrl}/refunds` },
  ],
};

/** Footer copyright line (matches the Pro site). */
export const copyright =
  "© 2026 Desyne · a product of Maithra Digital Pvt. Ltd.";

export type ShowcaseTemplate = {
  slug: string;
  name: string;
  tagline: string;
  kind: string;
};

/** Pro templates shown in the showcase (metadata only; sources are not in this repo). */
export const templates: ShowcaseTemplate[] = [
  {
    slug: "veyra",
    name: "Veyra",
    tagline: "Marketing site for a support platform",
    kind: "Marketing site",
  },
  {
    slug: "wrenly",
    name: "Wrenly",
    tagline: "Product analytics SaaS app",
    kind: "SaaS app",
  },
  {
    slug: "northfold",
    name: "Northfold",
    tagline: "Storefront for an everyday gear brand",
    kind: "Storefront",
  },
  {
    slug: "kestrel",
    name: "Kestrel",
    tagline: "Site for an independent design studio",
    kind: "Agency site",
  },
  {
    slug: "tessera",
    name: "Tessera",
    tagline: "Commercial real estate brokerage",
    kind: "Real estate",
  },
  {
    slug: "routely",
    name: "Routely",
    tagline: "Delivery software marketing site",
    kind: "Marketing site",
  },
  {
    slug: "pearl",
    name: "Pearl",
    tagline: "Dental clinic website",
    kind: "Healthcare",
  },
  {
    slug: "chairside",
    name: "Chairside",
    tagline: "Dental clinic admin app",
    kind: "SaaS app",
  },
  {
    slug: "sayso",
    name: "Sayso",
    tagline: "AI assistant builder app",
    kind: "SaaS app",
  },
  {
    slug: "tandem",
    name: "Tandem",
    tagline: "Project management app",
    kind: "SaaS app",
  },
  {
    slug: "finch",
    name: "Finch",
    tagline: "Personal finance dashboard",
    kind: "SaaS app",
  },
  {
    slug: "halden",
    name: "Halden",
    tagline: "Branding and packaging studio",
    kind: "Agency site",
  },
  {
    slug: "dispatch",
    name: "Dispatch",
    tagline: "News and magazine publication",
    kind: "Publication",
  },
  {
    slug: "ines",
    name: "Ines",
    tagline: "Personal portfolio for a designer",
    kind: "Portfolio",
  },
];

export const showcaseBlocks = [
  { name: "hero-13", title: "Aurora blur-in hero" },
  { name: "kanban-01", title: "Kanban board" },
  { name: "pricing-08", title: "Pricing with currency" },
  { name: "mail-01", title: "Mail client" },
  { name: "dashboard-01", title: "Analytics dashboard" },
  { name: "bento-01", title: "Product bento" },
  { name: "chart-sankey-01", title: "Customer journey Sankey" },
  { name: "testimonials-07", title: "Scrolling reviews" },
  { name: "pos-01", title: "Cashier screen" },
  { name: "details-01", title: "Order details" },
  { name: "cta-11", title: "Spotlight CTA" },
  { name: "billing-01", title: "Billing overview" },
  { name: "chart-sunburst-01", title: "Two-ring sunburst" },
  { name: "settings-07", title: "Members and roles" },
  { name: "reviews-01", title: "Reviews with distribution" },
  { name: "sign-in-06", title: "Passkey sign-in" },
];

export type Release = {
  version: string;
  date: string;
  title: string;
  kind: "Components" | "Pro" | "Templates";
  items: string[];
};

export const releases: Release[] = [
  {
    version: "1.4",
    date: "2026-10-05",
    title: "Form, typography and twelve new components",
    kind: "Components",
    items: [
      "Form with sections, rows and server-side validation errors",
      "Typography: Heading, Text, Lead, Code, Blockquote, List and a Prose wrapper",
      "Calendar and date pickers gain month and year dropdowns (captionLayout)",
      "New: Toolbar, Tree, Stepper, Rating, Timeline, Description List, Progress Circle, Empty, Input Group and Scroll Area",
      "26 new guides: CLI and registry, theming, dark mode, accessibility, forms, routing, Pro licensing and more",
      "llms.txt, llms-full.txt and a Markdown version of every page for AI tools",
    ],
  },
  {
    version: "Pro 3.0",
    date: "2026-10-05",
    title: "Accounts, checkout and team seats",
    kind: "Pro",
    items: [
      "Sign in with an email link or GitHub, and buy Pro or Team through checkout",
      "Account page with your license key, one-click key rotation and setup snippet",
      "Team licenses: invite up to 9 teammates, each with a personal key",
      "Vector thumbnails for all 88 block groups",
    ],
  },
  {
    version: "Pro 2.8",
    date: "2026-10-03",
    title: "UI kits, full pages and AI",
    kind: "Pro",
    items: [
      "86 new blocks: the catalog reaches 400",
      "UI kits: pagination, toggle groups, grid lists, navbars, QR codes, one-time codes, calendars, colors, selects, switches and meters",
      "Complete about, careers, contact, pricing, blog and changelog pages",
      "AI: chat, prompt inputs, assistants, playground, agents, image generation, voice, AI search and settings",
    ],
  },
  {
    version: "Templates 1.5",
    date: "2026-10-02",
    title: "Six more templates",
    kind: "Templates",
    items: [
      "Strata (documentation), Olea (restaurant and bakery), Wayfare (hotel booking)",
      "Meridian (online courses), Brisk (CRM with expenses and contracts), Overture (design conference)",
      "Twenty templates in total, grouped as websites, apps and content",
    ],
  },
  {
    version: "Pro 2.6",
    date: "2026-10-01",
    title: "Charts and commerce expansion",
    kind: "Pro",
    items: [
      "13 new chart blocks: scatter, Sankey, sunburst, radar, funnel and composed charts",
      "Invoices, wishlists, reviews and category previews for storefronts",
      "Order success, summary and history refreshed",
    ],
  },
  {
    version: "Pro 2.5",
    date: "2026-09-30",
    title: "Application UI, round two",
    kind: "Pro",
    items: [
      "Alerts, theme switchers, email, billing, point of sale and detail pages",
      "Kanban, audit log, API keys, members and setup wizard blocks",
      "Passkey sign-in and a sign-up with live password rules",
    ],
  },
  {
    version: "Pro 2.4",
    date: "2026-09-29",
    title: "Ninety marketing blocks",
    kind: "Pro",
    items: [
      "New groups: error pages, waitlists, bento grids and content",
      "Eight new heroes, six pricing sections and five testimonial layouts",
      "Footers, FAQs, logo clouds, stats, newsletters, contact and team",
    ],
  },
  {
    version: "Templates 1.4",
    date: "2026-09-27",
    title: "Six new templates",
    kind: "Templates",
    items: [
      "Sayso (AI assistant builder), Tandem (project management), Finch (finance)",
      "Halden (studio site), Dispatch (publication), Ines (portfolio)",
    ],
  },
  {
    version: "0.0.34",
    date: "2026-09-24",
    title: "Theming and docs polish",
    kind: "Components",
    items: [
      "Status tokens for success, warning and info across every component",
      "Props tables and copy-to-clipboard on every docs example",
    ],
  },
];
