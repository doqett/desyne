import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Matches the fumadocs HomeLayout header width. */
export const container =
  "mx-auto w-full max-w-(--fd-layout-width) px-5 sm:px-10";

/**
 * A full-width band with hairline rails on the container edges and small
 * crosses where the rails meet the top border — the marketing signature.
 */
export function Band({
  children,
  className,
  inner,
  id,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative border-t",
        muted && "bg-muted/35 dark:bg-muted/15",
        className,
      )}
    >
      <div className={cn(container, "relative")}>
        <span
          aria-hidden
          className="-top-px pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-border sm:block"
        />
        <span
          aria-hidden
          className="-top-px pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-border sm:block"
        />
        <Cross className="-top-[5px] left-[11px] hidden sm:block" />
        <Cross className="-top-[5px] right-[11px] hidden sm:block" />
        <div className={cn("relative py-16 sm:py-20", inner)}>{children}</div>
      </div>
    </section>
  );
}

function Cross({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 11 11"
      className={cn(
        "pointer-events-none absolute size-[11px] text-foreground/35",
        className,
      )}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "max-w-3xl text-balance font-semibold tracking-[-0.035em]",
        Tag === "h1"
          ? "text-4xl leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
          : "text-3xl leading-[1.1] sm:text-[2.6rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Dims part of a heading so the punchline stands out. */
export function Dim({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground/70">{children}</span>;
}

const isExternal = (href: string) => href.startsWith("http");

export function CTA({
  href,
  children,
  tone = "solid",
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  tone?: "solid" | "outline" | "ghost" | "brand";
}) {
  const Icon = isExternal(href) ? ArrowUpRightIcon : ArrowRightIcon;
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg px-4 font-medium text-sm outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
        tone === "solid" &&
          "bg-foreground text-background hover:bg-foreground/85",
        tone === "brand" && "bg-brand text-brand-foreground hover:bg-brand/90",
        tone === "outline" && "border bg-background shadow-xs hover:bg-muted",
        tone === "ghost" && "hover:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
      <Icon className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Small mono pill used for counts, versions and labels. */
export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border bg-background px-2 font-mono text-[0.6875rem] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Page opener for the inner marketing pages. */
export function PageHero({
  title,
  lead,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="home-grid -z-10 absolute inset-0 opacity-70"
      />
      <div className={cn(container, "relative pt-14 pb-12 sm:pt-20 sm:pb-16")}>
        <Heading as="h1">{title}</Heading>
        {lead && <Lead>{lead}</Lead>}
        {children}
      </div>
    </section>
  );
}
