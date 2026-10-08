"use client";

import { Link } from "@/components/ui/link";

const columns = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  { title: "Company", links: ["About", "Customers", "Careers", "Press"] },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API status", "Community"],
  },
];

export default function LinkRecipeFooter() {
  return (
    <footer className="grid w-full max-w-2xl gap-8 rounded-lg border bg-card p-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {columns.map((col) => (
          <nav
            key={col.title}
            aria-label={col.title}
            className="grid content-start gap-3"
          >
            <h3 className="font-medium text-sm">{col.title}</h3>
            <ul className="grid gap-2 text-sm">
              {col.links.map((label) => (
                <li key={label}>
                  <Link href="#" variant="subtle">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-muted-foreground text-xs">
        <span>© 2026 Acme Inc.</span>
        <div className="flex gap-4">
          <Link href="#" variant="subtle">
            Privacy
          </Link>
          <Link href="#" variant="subtle">
            Terms
          </Link>
          <Link href="https://github.com" variant="subtle" isExternal>
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
