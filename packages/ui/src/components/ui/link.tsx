"use client";

import { ArrowUpRightIcon } from "lucide-react";
import {
  composeRenderProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const linkVariants = tv({
  base: "inline-flex cursor-pointer items-center gap-0.5 rounded-xs underline-offset-4 outline-none transition-colors data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  variants: {
    variant: {
      default:
        "font-medium text-brand data-hovered:text-brand/80 data-hovered:underline",
      subtle: "text-muted-foreground data-hovered:text-foreground",
      underline:
        "text-foreground underline decoration-foreground/30 data-hovered:decoration-foreground",
      /** Legacy name */
      muted: "text-muted-foreground data-hovered:text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface LinkProps
  extends LinkPrimitiveProps,
    VariantProps<typeof linkVariants> {
  /** Shows an arrow and opens in a new tab. */
  isExternal?: boolean;
}

export function Link({
  className,
  variant,
  isExternal,
  children,
  ...props
}: LinkProps) {
  return (
    <LinkPrimitive
      data-slot="link"
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
      className={composeRenderProps(className, (className) =>
        linkVariants({ variant, className }),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          {isExternal && (
            <ArrowUpRightIcon aria-hidden className="size-3.5 opacity-70" />
          )}
        </>
      ))}
    </LinkPrimitive>
  );
}
