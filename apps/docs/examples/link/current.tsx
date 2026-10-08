"use client";

import { Link } from "@/components/ui/link";

const pages = ["Overview", "Changelog", "Pricing", "Docs"];

export default function LinkCurrent() {
  return (
    <nav aria-label="Product">
      <ul className="flex flex-wrap items-center gap-5 text-sm">
        {pages.map((page) => (
          <li key={page}>
            <Link
              href="#"
              variant="subtle"
              aria-current={page === "Pricing" ? "page" : undefined}
              className="data-current:font-medium data-current:text-foreground"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
