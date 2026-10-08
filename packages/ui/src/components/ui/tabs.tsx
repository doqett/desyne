"use client";

import {
  createContext,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  composeRenderProps,
  SelectionIndicator,
  TabList as TabListPrimitive,
  type TabListProps as TabListPrimitiveProps,
  TabPanel as TabPanelPrimitive,
  type TabPanelProps,
  Tab as TabPrimitive,
  type TabProps,
  Tabs as TabsPrimitive,
  type TabsProps as TabsPrimitiveProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/primitive";
import { cn } from "@/lib/utils";

type TabsVariant = "line" | "segmented" | "enclosed";
type TabsSize = "sm" | "md";

const TabsStyleContext = createContext<{
  variant: TabsVariant;
  size: TabsSize;
  orientation: "horizontal" | "vertical";
}>({ variant: "line", size: "md", orientation: "horizontal" });

const tabsStyles = tv({
  slots: {
    list: [
      "relative flex data-[orientation=horizontal]:min-w-0 data-[orientation=horizontal]:max-w-full data-[orientation=vertical]:flex-col",
      // Only when the tabs don't fit: scroll horizontally, never vertically.
      "data-overflowing:overflow-x-auto data-overflowing:overflow-y-hidden data-overflowing:overscroll-x-contain data-overflowing:[scrollbar-width:thin]",
    ],
    tab: [
      "relative inline-flex cursor-default select-none items-center justify-center gap-1.5 whitespace-nowrap font-(weight:--button-weight) text-muted-foreground outline-none transition-colors",
      "data-hovered:text-foreground data-selected:text-foreground",
      "data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25 data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    indicator:
      "absolute transition-[translate,width,height] duration-200 ease-out motion-reduce:transition-none",
  },
  variants: {
    variant: {
      line: {
        // While scrolling, pb-px keeps the indicator inside the scroll area; pt/-mt leave room for the focus ring.
        list: "gap-5 border-b data-overflowing:-mt-[3px] data-overflowing:pt-[3px] data-overflowing:pb-px data-[orientation=vertical]:gap-0 data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
        tab: "rounded-sm pt-1 pb-2.5 data-selected:text-brand group-data-[orientation=vertical]/tabs:justify-start group-data-[orientation=vertical]/tabs:py-2 group-data-[orientation=vertical]/tabs:pr-4",
        indicator:
          "inset-x-0 -bottom-px h-0.5 rounded-full bg-brand group-data-[orientation=vertical]/tabs:inset-x-auto group-data-[orientation=vertical]/tabs:inset-y-0 group-data-[orientation=vertical]/tabs:-right-px group-data-[orientation=vertical]/tabs:bottom-auto group-data-[orientation=vertical]/tabs:h-full group-data-[orientation=vertical]/tabs:w-0.5",
      },
      segmented: {
        list: "w-fit gap-0.5 rounded-[calc(var(--radius-control)+2px)] bg-muted p-0.5",
        tab: "rounded-(--radius-control) px-(--control-px-md) data-selected:shadow-none",
        indicator:
          "inset-0 -z-0 rounded-(--radius-control) bg-card shadow-(--shadow-control) dark:bg-input/40",
      },
      enclosed: {
        list: "gap-1 border-b data-overflowing:-mt-[3px] data-overflowing:pt-[3px] data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
        tab: "-mb-px rounded-t-(--radius-control) border border-transparent bg-muted/60 px-3.5 data-hovered:bg-muted data-selected:border-border data-selected:border-b-background data-selected:bg-background",
        indicator: "hidden",
      },
    },
    size: {
      sm: { tab: "text-xs", list: "" },
      md: { tab: "text-sm" },
    },
  },
  compoundVariants: [
    {
      variant: "segmented",
      size: "sm",
      class: { tab: "h-(--control-h-xs) px-(--control-px-sm)" },
    },
    { variant: "segmented", size: "md", class: { tab: "h-(--control-h-sm)" } },
    { variant: "enclosed", size: "sm", class: { tab: "h-7" } },
    { variant: "enclosed", size: "md", class: { tab: "h-9" } },
  ],
});

export interface TabsProps extends TabsPrimitiveProps {
  /** `line` (underline, default), `segmented` (pill track) or `enclosed` (folder tabs). */
  variant?: TabsVariant;
  size?: TabsSize;
}

export function Tabs({
  className,
  variant = "line",
  size = "md",
  ...props
}: TabsProps) {
  const orientation = props.orientation ?? "horizontal";
  return (
    <TabsStyleContext.Provider value={{ variant, size, orientation }}>
      <TabsPrimitive
        data-slot="tabs"
        {...props}
        className={composeTailwindRenderProps(
          className,
          "group/tabs flex gap-4 data-[orientation=horizontal]:flex-col",
        )}
      />
    </TabsStyleContext.Provider>
  );
}

export interface TabListProps<T extends object>
  extends TabListPrimitiveProps<T> {
  /** Hide the scrollbar when the tabs overflow. They still scroll with touch, trackpad, Shift+wheel and the arrow keys. */
  hideScrollbar?: boolean;
  ref?: Ref<HTMLDivElement>;
}

/** Scrolls the list horizontally, if needed, so the selected tab is fully visible. */
function scrollSelectedTabIntoView(list: HTMLElement, animate: boolean) {
  const tab = list.querySelector<HTMLElement>(
    '[role="tab"][aria-selected="true"]',
  );
  if (!tab) return;
  const listRect = list.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const inset = 16;
  const delta =
    tabRect.left < listRect.left
      ? tabRect.left - listRect.left - inset
      : tabRect.right > listRect.right
        ? tabRect.right - listRect.right + inset
        : 0;
  if (delta === 0) return;
  const smooth =
    animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  list.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
}

/** Tracks whether a horizontal tab list is wider than its box, and keeps the selected tab in view. */
function useTabListOverflow(enabled: boolean) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (!element || !enabled || typeof ResizeObserver === "undefined") {
      setOverflowing(false);
      return;
    }
    const update = () =>
      setOverflowing(element.scrollWidth > element.clientWidth + 1);
    const resizeObserver = new ResizeObserver(update);
    const observe = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(element);
      for (const child of element.children) resizeObserver.observe(child);
    };
    const mutationObserver = new MutationObserver((records) => {
      if (records.some((r) => r.type === "childList")) {
        observe();
        update();
      }
      if (records.some((r) => r.type === "attributes"))
        scrollSelectedTabIntoView(element, true);
    });
    observe();
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributeFilter: ["aria-selected"],
    });
    update();
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [element, enabled]);

  useEffect(() => {
    if (element && overflowing) scrollSelectedTabIntoView(element, false);
  }, [element, overflowing]);

  return { setElement, overflowing };
}

export function TabList<T extends object>({
  className,
  hideScrollbar = false,
  ref,
  ...props
}: TabListProps<T>) {
  const { variant, size, orientation } = useContext(TabsStyleContext);
  const { setElement, overflowing } = useTabListOverflow(
    orientation === "horizontal",
  );
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setElement(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, setElement],
  );
  return (
    <TabListPrimitive
      data-slot="tab-list"
      data-overflowing={overflowing || undefined}
      {...props}
      ref={mergedRef}
      className={composeTailwindRenderProps(
        className,
        cn(
          tabsStyles({ variant, size }).list(),
          hideScrollbar &&
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        ),
      )}
    />
  );
}

export function Tab({ className, children, ...props }: TabProps) {
  const { variant, size } = useContext(TabsStyleContext);
  const styles = tabsStyles({ variant, size });
  return (
    <TabPrimitive
      data-slot="tab"
      {...props}
      className={composeTailwindRenderProps(className, styles.tab())}
    >
      {composeRenderProps(children, (children) => (
        <>
          <SelectionIndicator className={styles.indicator()} />
          <span className="relative z-[1] inline-flex items-center gap-1.5">
            {children}
          </span>
        </>
      ))}
    </TabPrimitive>
  );
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return (
    <TabPanelPrimitive
      data-slot="tab-panel"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "flex-1 rounded-md text-sm outline-none data-focus-visible:ring-(length:--ring-width) data-focus-visible:ring-ring/25",
      )}
    />
  );
}
