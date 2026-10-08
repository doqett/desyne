import Link from "next/link";
import { copyright, nav } from "@/lib/site";
import { Logo } from "../logo";
import { container } from "./primitives";

const columns = [
  { title: "Library", links: nav.product },
  { title: "Pro", links: nav.pro },
  { title: "Company", links: [...nav.company, ...nav.legal] },
  {
    title: "Resources",
    links: [
      { label: "Accessibility", href: "/docs/accessibility" },
      { label: "CLI & registry", href: "/docs/cli" },
      { label: "AI & llms.txt", href: "/docs/ai" },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div
        className={`${container} grid grid-cols-2 gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]`}
      >
        <div className="col-span-2 max-w-xs md:col-span-1">
          <Logo />
          <p className="mt-3 text-muted-foreground text-sm">
            Accessible React components on React Aria and shadcn tokens, plus
            Pro blocks and templates that turn them into products.
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="font-medium text-muted-foreground text-sm">
              {c.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div
        className={`${container} flex flex-wrap justify-between gap-2 border-t py-5 text-muted-foreground text-xs`}
      >
        <span>{copyright}</span>
        <span>Built with its own components.</span>
      </div>
    </footer>
  );
}
