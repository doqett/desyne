"use client";

import * as Primitive from "fumadocs-core/toc";
import { TOCScrollArea, useTOCItems } from "fumadocs-ui/components/toc";
import { ArrowUpRightIcon } from "lucide-react";
import { proUrl, stats } from "@/lib/site";

function indent(depth: number) {
  if (depth <= 2) return "0.75rem";
  if (depth === 3) return "1.5rem";
  return "2.25rem";
}

function ProTeaser() {
  return (
    <a
      href={`${proUrl}/blocks`}
      target="_blank"
      rel="noreferrer"
      className="group relative mt-6 block shrink-0 overflow-hidden rounded-xl border bg-card p-4 outline-none transition-colors hover:border-foreground/20 focus-visible:ring-[3px] focus-visible:ring-ring/40"
    >
      <div
        aria-hidden
        className="ds-toc-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <p className="relative font-semibold text-[0.9rem] leading-snug tracking-[-0.01em]">
        {stats.blocks} blocks.{" "}
        <span className="text-muted-foreground/80">
          {stats.templates} templates.
        </span>
      </p>
      <p className="relative mt-1 text-[0.75rem] text-muted-foreground leading-relaxed">
        Built from these components, ready to paste.
      </p>
      <span className="relative mt-3 inline-flex items-center gap-1 font-medium text-[0.75rem] text-foreground">
        Browse blocks
        <ArrowUpRightIcon className="size-3 opacity-60 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
      </span>
    </a>
  );
}

/** Right-hand "On this page" rail with an indigo active indicator. */
export function DocsTOC() {
  const items = useTOCItems();
  if (items.length === 0)
    return (
      <div
        id="nd-toc-placeholder"
        className="hidden xl:layout:[--fd-toc-width:272px]"
      />
    );
  return (
    <div
      id="nd-toc"
      className="sticky top-(--fd-docs-row-1) flex h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] w-(--fd-toc-width) flex-col border-s ps-6 pe-6 pt-12 pb-6 [grid-area:toc] max-xl:hidden xl:layout:[--fd-toc-width:272px]"
    >
      <p
        id="toc-title"
        className="font-medium text-[0.8125rem] text-muted-foreground"
      >
        On this page
      </p>
      <TOCScrollArea className="mt-2 py-2">
        <nav aria-labelledby="toc-title">
          <ul className="flex flex-col border-s">
            {items.map((item) => (
              <li key={item.url}>
                <Primitive.TOCItem
                  href={item.url}
                  className="-ms-px block border-s border-transparent py-[0.3125rem] pe-1 text-[0.8125rem] text-muted-foreground leading-5 outline-none transition-colors wrap-anywhere hover:text-foreground focus-visible:text-foreground focus-visible:underline data-[active=true]:border-brand data-[active=true]:text-foreground"
                  style={{ paddingInlineStart: indent(item.depth) }}
                >
                  {item.title}
                </Primitive.TOCItem>
              </li>
            ))}
          </ul>
        </nav>
      </TOCScrollArea>
      <ProTeaser />
    </div>
  );
}
