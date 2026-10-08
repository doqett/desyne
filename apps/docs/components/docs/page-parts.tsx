"use client";

import { useDocsPage } from "fumadocs-ui/layouts/docs/page";
import { useFooterItems } from "fumadocs-ui/utils/use-footer-items";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** `<main>` + `<article>` for a docs page (replaces the Fumadocs container). */
export function DocsArticle({
  className,
  ...props
}: ComponentProps<"article">) {
  const { full } = useDocsPage();
  return (
    <main
      id="ds-main"
      data-layout-main=""
      className="grid min-w-0 justify-items-center overflow-x-clip [grid-area:main]"
    >
      <article
        id="nd-page"
        data-layout-content=""
        data-full={full}
        {...props}
        className={cn(
          "flex w-full min-w-0 max-w-[880px] flex-col px-5 pt-8 pb-16 sm:px-8 md:pt-10 lg:px-12 lg:pt-12",
          full && "max-w-[1240px]",
          className,
        )}
      />
    </main>
  );
}

const normalize = (url: string) =>
  url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;

/** Previous / next cards at the end of every page. */
export function PageFooterNav() {
  const items = useFooterItems().filter((i) => i.url.startsWith("/docs"));
  const pathname = normalize(usePathname());
  const idx = items.findIndex((i) => normalize(i.url) === pathname);
  if (idx === -1) return null;
  const prev = items[idx - 1];
  const next = items[idx + 1];
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <PagerCard href={prev.url} title={prev.name} dir="prev" />
      ) : (
        <span className="max-sm:hidden" />
      )}
      {next && <PagerCard href={next.url} title={next.name} dir="next" />}
    </nav>
  );
}

function PagerCard({
  href,
  title,
  dir,
}: {
  href: string;
  title: React.ReactNode;
  dir: "prev" | "next";
}) {
  const Icon = dir === "prev" ? ArrowLeftIcon : ArrowRightIcon;
  return (
    <Link
      href={href}
      rel={dir}
      className={cn(
        "group relative flex flex-col gap-1.5 rounded-xl border bg-card px-4 py-3.5 outline-none transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/40",
        dir === "next" && "items-end text-end sm:col-start-2",
      )}
    >
      <span className="flex items-center gap-1.5 font-medium text-[0.75rem] text-muted-foreground">
        {dir === "prev" && (
          <Icon className="size-3 transition-transform group-hover:-translate-x-0.5" />
        )}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && (
          <Icon className="size-3 transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
      <span className="font-medium text-[0.95rem] tracking-[-0.01em]">
        {title}
      </span>
    </Link>
  );
}
