import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/*
 * No "use client": every part renders a plain element, so the whole type
 * system works in server components (articles, docs, marketing pages).
 */

export const headingVariants = tv({
  base: "scroll-m-20 text-balance font-(family-name:--font-heading) font-(weight:--heading-weight) text-foreground",
  variants: {
    size: {
      display:
        "text-4xl leading-[1.05] tracking-(--heading-tracking) sm:text-5xl",
      xl: "text-3xl leading-tight tracking-(--heading-tracking) sm:text-4xl",
      lg: "text-2xl leading-snug tracking-(--heading-tracking)",
      md: "text-xl leading-snug tracking-(--heading-tracking)",
      sm: "text-lg leading-snug",
      xs: "text-base leading-normal",
    },
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = NonNullable<VariantProps<typeof headingVariants>["size"]>;

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs",
};

export interface HeadingProps extends React.ComponentProps<"h2"> {
  /** Document outline level: renders `<h1>`…`<h6>`. Default 2. */
  level?: HeadingLevel;
  /** Visual size, independent of `level`. Defaults to the level's size. */
  size?: HeadingSize;
}

/** A heading whose semantic level and visual size are set separately. */
export function Heading({
  level = 2,
  size,
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      data-slot="heading"
      className={headingVariants({
        size: size ?? defaultSize[level],
        className,
      })}
      {...props}
    />
  );
}

export const textVariants = tv({
  base: "text-pretty",
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-6",
      md: "text-base leading-7",
      lg: "text-lg leading-8",
    },
    tone: {
      /** Primary reading color. */
      default: "text-foreground",
      /** Slightly softer body copy (secondary paragraphs, card text). */
      subtle: "text-foreground/80",
      /** Captions, metadata, helper text. Still meets 4.5:1 contrast. */
      muted: "text-muted-foreground",
      brand: "text-brand",
      danger: "text-destructive",
      success: "text-success",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** Element to render. Default `p`. */
  as?: "p" | "span" | "div" | "strong" | "em" | "small";
}

/** Body text with a size, tone and weight from the type scale. */
export function Text({
  as: Tag = "p",
  size,
  tone,
  weight,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      data-slot="text"
      className={textVariants({ size, tone, weight, className })}
      {...props}
    />
  );
}

/** Larger intro paragraph under a page title. */
export function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="lead"
      className={cn(
        "text-pretty text-lg text-muted-foreground leading-relaxed sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

/** Fine print: legal notes, timestamps, footnotes. Renders `<small>`. */
export function Small({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="small"
      className={cn("text-muted-foreground text-xs leading-5", className)}
      {...props}
    />
  );
}

/** Inline code: identifiers, file names, short commands. */
export function Code({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="code"
      className={cn(
        "rounded-sm border border-border/60 bg-muted px-[0.35em] py-[0.1em] font-mono text-[0.875em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export interface BlockquoteProps extends React.ComponentProps<"blockquote"> {
  /** Attribution shown under the quote ("Ada Lovelace, 1843"). */
  attribution?: React.ReactNode;
}

/** An extended quotation, with an optional attribution line. */
export function Blockquote({
  attribution,
  className,
  children,
  ...props
}: BlockquoteProps) {
  const quote = (
    <blockquote
      data-slot="blockquote"
      className={cn(
        "border-brand border-l-2 pl-4 text-foreground/80 text-lg leading-relaxed",
        !attribution && className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
  if (!attribution) return quote;
  return (
    <figure
      data-slot="blockquote-figure"
      className={cn("flex flex-col gap-3", className)}
    >
      {quote}
      <figcaption className="pl-4.5 text-muted-foreground text-sm">
        — {attribution}
      </figcaption>
    </figure>
  );
}

const listVariants = tv({
  base: "pl-6 text-foreground [&>li]:pl-1 marker:text-muted-foreground",
  variants: {
    marker: {
      disc: "list-disc",
      decimal: "list-decimal",
      none: "list-none pl-0 [&>li]:pl-0",
    },
    spacing: {
      sm: "flex flex-col gap-1",
      md: "flex flex-col gap-2",
    },
  },
  defaultVariants: { spacing: "md" },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Renders `<ol>` with numbers instead of `<ul>` with bullets. */
  ordered?: boolean;
  /** Overrides the marker. `none` keeps list semantics without bullets. */
  marker?: "disc" | "decimal" | "none";
  spacing?: "sm" | "md";
  /** First number of an ordered list. */
  start?: number;
}

/** Bulleted or numbered list. Put `<li>` elements inside. */
export function List({
  ordered,
  marker,
  spacing,
  className,
  ...props
}: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      data-slot="list"
      // Safari drops list semantics when list-style is none; restore it.
      role={marker === "none" ? "list" : undefined}
      className={listVariants({
        marker: marker ?? (ordered ? "decimal" : "disc"),
        spacing,
        className,
      })}
      {...props}
    />
  );
}

/**
 * Styles for raw HTML / MDX content. Every rule targets descendants, so
 * Markdown output needs no classes of its own. Sizes are in `em`, so `size`
 * scales the whole article.
 */
export const proseVariants = tv({
  base: [
    "text-foreground/90 leading-7 [&>:first-child]:mt-0 [&>:last-child]:mb-0",
    // Headings
    "[&_h1]:mt-0 [&_h1]:mb-[0.8em] [&_h1]:text-balance [&_h1]:font-(family-name:--font-heading) [&_h1]:font-(weight:--heading-weight) [&_h1]:text-[2.25em] [&_h1]:text-foreground [&_h1]:leading-[1.15] [&_h1]:tracking-(--heading-tracking)",
    "[&_h2]:mt-[2em] [&_h2]:mb-[0.7em] [&_h2]:scroll-m-20 [&_h2]:text-balance [&_h2]:font-(family-name:--font-heading) [&_h2]:font-(weight:--heading-weight) [&_h2]:text-[1.5em] [&_h2]:text-foreground [&_h2]:leading-[1.3] [&_h2]:tracking-(--heading-tracking)",
    "[&_h3]:mt-[1.7em] [&_h3]:mb-[0.6em] [&_h3]:scroll-m-20 [&_h3]:font-(family-name:--font-heading) [&_h3]:font-(weight:--heading-weight) [&_h3]:text-[1.25em] [&_h3]:text-foreground [&_h3]:leading-[1.4]",
    "[&_h4]:mt-[1.5em] [&_h4]:mb-[0.5em] [&_h4]:scroll-m-20 [&_h4]:font-(family-name:--font-heading) [&_h4]:font-(weight:--heading-weight) [&_h4]:text-[1em] [&_h4]:text-foreground",
    "[&_:is(h1,h2,h3,h4)+*]:mt-0",
    // Text
    "[&_p]:my-[1.25em] [&_p]:text-pretty",
    "[&_strong]:font-semibold [&_strong]:text-foreground",
    "[&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-brand",
    // Lists
    "[&_ul]:my-[1.25em] [&_ul]:list-disc [&_ul]:pl-[1.625em] [&_ol]:my-[1.25em] [&_ol]:list-decimal [&_ol]:pl-[1.625em]",
    "[&_li]:my-[0.5em] [&_li]:pl-[0.375em] [&_li::marker]:text-muted-foreground [&_li>:is(ul,ol)]:my-[0.5em] [&_li>p]:my-[0.5em]",
    // Code
    "[&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:border [&_:not(pre)>code]:border-border/60 [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-[0.35em] [&_:not(pre)>code]:py-[0.1em] [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.875em] [&_:not(pre)>code]:text-foreground",
    "[&_pre]:my-[1.5em] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[0.875em] [&_pre]:leading-relaxed",
    // Quotes and rules
    "[&_blockquote]:my-[1.5em] [&_blockquote]:border-brand [&_blockquote]:border-l-2 [&_blockquote]:pl-[1em] [&_blockquote]:text-foreground/80 [&_blockquote>p]:my-[0.5em]",
    "[&_hr]:my-[2.5em] [&_hr]:border-border",
    // Tables
    "[&_table]:my-[1.75em] [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.875em]",
    "[&_th]:border-b [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground",
    "[&_td]:border-b [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_tbody_tr:last-child>td]:border-b-0",
    // Media
    "[&_img]:my-[1.75em] [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img]:border",
    "[&_figure]:my-[1.75em] [&_figure_img]:my-0 [&_figcaption]:mt-[0.75em] [&_figcaption]:text-center [&_figcaption]:text-[0.875em] [&_figcaption]:text-muted-foreground",
    "[&_kbd]:rounded-sm [&_kbd]:border [&_kbd]:bg-muted [&_kbd]:px-[0.35em] [&_kbd]:font-mono [&_kbd]:text-[0.8em]",
  ],
  variants: {
    size: {
      sm: "text-sm leading-6",
      md: "text-base leading-7",
      lg: "text-lg leading-8",
    },
  },
  defaultVariants: { size: "md" },
});

export interface ProseProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof proseVariants> {}

/**
 * Typography for content you don't control the markup of: MDX, CMS HTML,
 * rendered Markdown. Limit the line length with `max-w-prose` or similar.
 */
export function Prose({ size, className, ...props }: ProseProps) {
  return (
    <div
      data-slot="prose"
      className={proseVariants({ size, className })}
      {...props}
    />
  );
}
