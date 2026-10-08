"use client";

import {
  type ComponentProps,
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

/*
 * Native scrolling with thin, themed scrollbars — CSS only (`scrollbar-width`,
 * `scrollbar-color`, plus `::-webkit-scrollbar` for older WebKit). The optional
 * fade masks the edges that have more content beyond them.
 */
export const scrollAreaVariants = tv({
  base: [
    "relative min-h-0 min-w-0 overscroll-contain rounded-[inherit] outline-none",
    "focus-visible:ring-(length:--ring-width) focus-visible:ring-ring/25",
    "[&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-track]:bg-transparent",
    "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:bg-clip-padding",
    "[&::-webkit-scrollbar]:size-2.5",
  ],
  variants: {
    orientation: {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    },
    scrollbar: {
      /** Always-visible thin scrollbar. */
      thin: "[scrollbar-color:var(--scroll-thumb)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:bg-(--scroll-thumb)",
      /** Thin scrollbar that appears while the area is hovered or focused. */
      hover:
        "[scrollbar-color:transparent_transparent] [scrollbar-width:thin] hover:[scrollbar-color:var(--scroll-thumb)_transparent] focus-visible:[scrollbar-color:var(--scroll-thumb)_transparent] hover:[&::-webkit-scrollbar-thumb]:bg-(--scroll-thumb)",
      /** No scrollbar; still scrolls with wheel, touch and keyboard. */
      hidden: "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    },
  },
  defaultVariants: { orientation: "vertical", scrollbar: "thin" },
});

export interface ScrollAreaProps
  extends ComponentProps<"div">,
    VariantProps<typeof scrollAreaVariants> {
  /**
   * Fade out the edges that have more content beyond them. `true` uses 24px;
   * pass a number for a custom size in px.
   */
  fade?: boolean | number;
}

type Edges = { start: boolean; end: boolean; left: boolean; right: boolean };

export function ScrollArea({
  className,
  orientation = "vertical",
  scrollbar,
  fade = false,
  style,
  onScroll,
  tabIndex = 0,
  children,
  ref: forwardedRef,
  ...props
}: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );
  const [edges, setEdges] = useState<Edges>({
    start: false,
    end: false,
    left: false,
    right: false,
  });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || !fade) return;
    const x = Math.abs(el.scrollLeft); // RTL reports negative values
    const next = {
      start: el.scrollTop > 1,
      end: el.scrollTop + el.clientHeight < el.scrollHeight - 1,
      left: x > 1,
      right: x + el.clientWidth < el.scrollWidth - 1,
    };
    setEdges((prev) =>
      prev.start === next.start &&
      prev.end === next.end &&
      prev.left === next.left &&
      prev.right === next.right
        ? prev
        : next,
    );
  }, [fade]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fade) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => ro.disconnect();
  }, [fade, measure]);

  const size = typeof fade === "number" ? fade : 24;
  const px = (on: boolean) => `${on ? size : 0}px`;
  const vertical = orientation !== "horizontal";
  const horizontal = orientation !== "vertical";
  const masks = [
    vertical &&
      `linear-gradient(to bottom, transparent, #000 ${px(edges.start)}, #000 calc(100% - ${px(edges.end)}), transparent)`,
    horizontal &&
      `linear-gradient(to right, transparent, #000 ${px(edges.left)}, #000 calc(100% - ${px(edges.right)}), transparent)`,
  ].filter(Boolean) as string[];
  const maskStyle: CSSProperties | undefined = fade
    ? {
        maskImage: masks.join(", "),
        maskComposite: masks.length > 1 ? "intersect" : undefined,
        WebkitMaskComposite: masks.length > 1 ? "source-in" : undefined,
      }
    : undefined;

  return (
    <div
      ref={setRef}
      data-slot="scroll-area"
      data-orientation={orientation}
      tabIndex={tabIndex}
      onScroll={(e) => {
        measure();
        onScroll?.(e);
      }}
      className={cn(
        "[--scroll-thumb:color-mix(in_oklab,var(--muted-foreground)_35%,transparent)]",
        scrollAreaVariants({ orientation, scrollbar }),
        className,
      )}
      style={{ ...maskStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
