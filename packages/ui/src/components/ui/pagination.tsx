"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";
import {
  Button as ButtonPrimitive,
  Link,
  type LinkProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationSize = "sm" | "md";

function itemClass(
  isActive: boolean | undefined,
  size: PaginationSize,
  className?: string,
) {
  return buttonVariants({
    variant: isActive ? "outline" : "ghost",
    color: isActive ? "primary" : "neutral",
    size: size === "sm" ? "icon-sm" : "icon",
    className: cn(
      "min-w-fit px-2 tabular-nums",
      isActive && "border-primary",
      className,
    ),
  });
}

export interface PaginationLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  isActive?: boolean;
  size?: PaginationSize | "default" | "icon";
}

export function PaginationLink({
  className,
  isActive,
  size = "md",
  ...props
}: PaginationLinkProps) {
  const s: PaginationSize = size === "sm" ? "sm" : "md";
  return (
    <Link
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      {...props}
      className={itemClass(isActive, s, className)}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon aria-hidden />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon aria-hidden />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-(--control-h-md) items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}

/** Page numbers with ellipses, e.g. [1, "…", 4, 5, 6, "…", 10]. */
export function getPageRange(
  page: number,
  pageCount: number,
  siblings = 1,
): (number | "ellipsis")[] {
  const total = siblings * 2 + 5;
  if (pageCount <= total)
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  const start = Math.max(page - siblings, 2);
  const end = Math.min(page + siblings, pageCount - 1);
  const range: (number | "ellipsis")[] = [1];
  if (start > 2) range.push("ellipsis");
  for (let i = start; i <= end; i++) range.push(i);
  if (end < pageCount - 1) range.push("ellipsis");
  range.push(pageCount);
  return range;
}

export interface PaginatorProps
  extends Omit<React.ComponentProps<"nav">, "onChange"> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblings?: number;
  size?: PaginationSize;
  /** Show "Page 3 of 10" instead of numbers (compact). */
  simple?: boolean;
}

/** Complete, controlled pagination with automatic ellipses. */
export function Paginator({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  size = "md",
  simple,
  className,
  ...props
}: PaginatorProps) {
  const navSize = size === "sm" ? "icon-sm" : "icon";
  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size={navSize}
            aria-label="Previous page"
            isDisabled={page <= 1}
            onPress={() => onPageChange(page - 1)}
          >
            <ChevronLeftIcon aria-hidden />
          </Button>
        </PaginationItem>
        {simple ? (
          <PaginationItem className="px-2 text-muted-foreground text-sm tabular-nums">
            Page <span className="font-medium text-foreground">{page}</span> of{" "}
            {pageCount}
          </PaginationItem>
        ) : (
          getPageRange(page, pageCount, siblings).map((p, i) =>
            p === "ellipsis" ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: at most two ellipses, position is stable
              <PaginationItem key={`e${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <ButtonPrimitive
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  onPress={() => onPageChange(p)}
                  className={itemClass(p === page, size)}
                >
                  {p}
                </ButtonPrimitive>
              </PaginationItem>
            ),
          )
        )}
        <PaginationItem>
          <Button
            variant="ghost"
            size={navSize}
            aria-label="Next page"
            isDisabled={page >= pageCount}
            onPress={() => onPageChange(page + 1)}
          >
            <ChevronRightIcon aria-hidden />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
