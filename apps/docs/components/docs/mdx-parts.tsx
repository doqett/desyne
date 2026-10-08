import { Tab as FdTab, Tabs as FdTabs } from "fumadocs-ui/components/tabs";
import { TypeTable as FdTypeTable } from "fumadocs-ui/components/type-table";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Headings: hash anchor on hover ---------- */

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function createHeading(Tag: HeadingTag) {
  return function Heading({
    id,
    children,
    className,
    ...props
  }: ComponentProps<HeadingTag>) {
    if (!id)
      return (
        <Tag className={className} {...props}>
          {children}
        </Tag>
      );
    return (
      <Tag id={id} className={cn("ds-heading group/h", className)} {...props}>
        <a href={`#${id}`} data-card="" className="ds-heading-link">
          {children}
          <span aria-hidden className="ds-hash">
            #
          </span>
        </a>
      </Tag>
    );
  };
}

/* ---------- Callouts ---------- */

type CalloutType =
  | "info"
  | "note"
  | "tip"
  | "idea"
  | "warn"
  | "warning"
  | "error"
  | "success";

const tones = {
  info: { tone: "var(--brand)", Icon: InfoIcon, label: "Note" },
  idea: { tone: "var(--brand)", Icon: LightbulbIcon, label: "Tip" },
  warning: {
    tone: "var(--warning)",
    Icon: TriangleAlertIcon,
    label: "Warning",
  },
  error: {
    tone: "var(--destructive)",
    Icon: CircleAlertIcon,
    label: "Important",
  },
  success: { tone: "var(--success)", Icon: CircleCheckIcon, label: "Success" },
};

function resolveTone(type: CalloutType = "info") {
  if (type === "warn") return tones.warning;
  if (type === "tip" || type === "idea") return tones.idea;
  if (type === "note") return tones.info;
  return tones[type] ?? tones.info;
}

export function Callout({
  type,
  title,
  icon,
  children,
  className,
}: {
  type?: CalloutType;
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const { tone, Icon, label } = resolveTone(type);
  return (
    <div
      role="note"
      aria-label={typeof title === "string" ? undefined : label}
      className={cn("ds-callout", className)}
      style={{ "--callout": tone } as React.CSSProperties}
    >
      <span aria-hidden className="ds-callout-icon">
        {icon ?? <Icon />}
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="ds-callout-title">{title}</p>}
        <div className="ds-callout-body prose-no-margin">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Cards ---------- */

export function Cards({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("not-prose my-6 grid gap-3 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

export function Card({
  title,
  description,
  icon,
  href,
  external,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const isExternal = external ?? /^https?:/.test(href ?? "");
  const body = (
    <>
      {icon && (
        <span className="mb-3 inline-flex size-8 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-xs transition-colors group-hover:text-brand [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex items-center gap-1.5 font-medium text-[0.9375rem] tracking-[-0.01em]">
        {title}
        {href &&
          (isExternal ? (
            <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          ) : (
            <ArrowRightIcon className="size-3.5 text-muted-foreground opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
          ))}
      </span>
      {description && (
        <span className="mt-1 block text-[0.8125rem] text-muted-foreground leading-relaxed">
          {description}
        </span>
      )}
      {children && (
        <span className="mt-1 block text-[0.8125rem] text-muted-foreground leading-relaxed">
          {children}
        </span>
      )}
    </>
  );
  const cls = cn(
    "group relative block rounded-xl border bg-card p-4 outline-none transition-[border-color,box-shadow]",
    href &&
      "hover:border-foreground/20 hover:shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/40",
    className,
  );
  if (!href) return <div className={cls}>{body}</div>;
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-card=""
      className={cls}
    >
      {body}
    </a>
  ) : (
    <Link href={href} data-card="" className={cls}>
      {body}
    </Link>
  );
}

/* ---------- Tabs ---------- */

export function Tabs({ className, ...props }: ComponentProps<typeof FdTabs>) {
  return (
    <FdTabs
      {...props}
      className={cn(
        "ds-tabs",
        typeof className === "string" ? className : undefined,
      )}
    />
  );
}

export const Tab = FdTab;

/* ---------- Props tables ---------- */

export function TypeTable({
  className,
  ...props
}: ComponentProps<typeof FdTypeTable>) {
  return <FdTypeTable {...props} className={cn("ds-typetable", className)} />;
}
