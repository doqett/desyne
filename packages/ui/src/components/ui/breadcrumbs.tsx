"use client";

import { ChevronRightIcon, SlashIcon } from "lucide-react";
import { createContext, type ReactNode, useContext } from "react";
import {
  Breadcrumb as BreadcrumbPrimitive,
  type BreadcrumbProps as BreadcrumbPrimitiveProps,
  Breadcrumbs as BreadcrumbsPrimitive,
  type BreadcrumbsProps as BreadcrumbsPrimitiveProps,
  composeRenderProps,
  Link,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

const SeparatorContext = createContext<"chevron" | "slash" | "dot">("chevron");

export interface BreadcrumbsProps<T extends object>
  extends BreadcrumbsPrimitiveProps<T> {
  separator?: "chevron" | "slash" | "dot";
  size?: "sm" | "md";
}

export function Breadcrumbs<T extends object>({
  className,
  separator = "chevron",
  size = "md",
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <SeparatorContext.Provider value={separator}>
      <BreadcrumbsPrimitive
        data-slot="breadcrumbs"
        {...props}
        className={cn(
          "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground",
          size === "sm" ? "text-xs" : "text-sm",
          className,
        )}
      />
    </SeparatorContext.Provider>
  );
}

export interface BreadcrumbProps extends BreadcrumbPrimitiveProps {
  href?: string;
  /** Icon before the label. */
  icon?: ReactNode;
  /**
   * Wrap the children in a React Aria `Link` (default). Set to `false` to render
   * them as-is, e.g. a menu trigger for collapsed levels. The separator is kept.
   */
  link?: boolean;
}

export function Breadcrumb({
  className,
  children,
  href,
  icon,
  link = true,
  ...props
}: BreadcrumbProps) {
  const separator = useContext(SeparatorContext);
  return (
    <BreadcrumbPrimitive
      data-slot="breadcrumb"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "inline-flex items-center gap-1.5",
      )}
    >
      {composeRenderProps(children, (children, { isCurrent }) => (
        <>
          {link ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-sm px-0.5 outline-none transition-colors data-current:font-medium data-current:text-foreground data-hovered:text-foreground data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:not-data-current:cursor-not-allowed data-disabled:not-data-current:opacity-50 [&_svg]:size-3.5"
            >
              {icon}
              {children}
            </Link>
          ) : (
            <>
              {icon}
              {children}
            </>
          )}
          {!isCurrent &&
            (separator === "chevron" ? (
              <ChevronRightIcon
                aria-hidden
                className="size-3.5 text-muted-foreground/70"
              />
            ) : separator === "slash" ? (
              <SlashIcon
                aria-hidden
                className="size-3 -rotate-[20deg] text-muted-foreground/60"
              />
            ) : (
              <span
                aria-hidden
                className="size-1 rounded-full bg-muted-foreground/50"
              />
            ))}
        </>
      ))}
    </BreadcrumbPrimitive>
  );
}
