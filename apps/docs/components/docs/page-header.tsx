import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { PageLinks } from "@/lib/docs-tree";
import { gitConfig } from "@/lib/shared";

function Cross({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 11 11"
      className={`pointer-events-none absolute size-[11px] text-foreground/35 ${className ?? ""}`}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Hairline that bleeds to the column edges, with crosses on the content edges. */
export function RailRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`relative h-px ${className ?? ""}`}>
      <span className="-inset-x-[100vw] absolute inset-y-0 bg-border" />
      <Cross className="-top-[5px] -left-[5px]" />
      <Cross className="-top-[5px] -right-[5px]" />
    </div>
  );
}

const pill =
  "inline-flex h-7 items-center gap-1 rounded-full border bg-card px-2.5 font-medium text-[0.75rem] text-muted-foreground outline-none transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40";

export function ComponentPills({ links }: { links: PageLinks }) {
  const sourceHref = links.source
    ? `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/packages/ui/src/components/ui/${links.source}.tsx`
    : undefined;
  const items = [
    links.aria && {
      label: "React Aria",
      href: `https://react-aria.adobe.com/${links.aria}`,
    },
    links.docs,
    sourceHref && { label: "Source", href: sourceHref },
  ].filter(Boolean) as { label: string; href: string }[];
  return items.map((l) => (
    <a
      key={l.label}
      href={l.href}
      target="_blank"
      rel="noreferrer"
      className={pill}
    >
      {l.label}
      <ArrowUpRightIcon aria-hidden className="size-3 opacity-60" />
    </a>
  ));
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="relative isolate mb-10">
      <div
        aria-hidden
        className="ds-header-grid -z-10 pointer-events-none absolute -inset-x-5 -top-8 bottom-0 sm:-inset-x-8 md:-top-10 lg:-inset-x-12 lg:-top-12"
      />
      <h1 className="text-balance font-semibold text-[2.125rem] leading-[1.08] tracking-[-0.035em] sm:text-[2.5rem]">
        {title}
      </h1>
      {description && (
        <p className="mt-3.5 max-w-[62ch] text-pretty text-[1.0625rem] text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-6 flex flex-wrap items-center gap-2">{actions}</div>
      )}
      <RailRule className="mt-8" />
    </header>
  );
}
