"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

/** The slides currently selected: 0-based `from`/`to` (a range when several share a snap). */
export interface CarouselSelection {
  from: number;
  to: number;
  total: number;
}

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  /**
   * Accessible name for the carousel region. Used when neither `aria-label`
   * nor `aria-labelledby` is passed. Defaults to "Carousel".
   */
  label?: string;
  /**
   * Announce the selected slide in a polite live region when it changes.
   * Turn it off while auto-rotating, or when you render your own live counter.
   * Defaults to `true`.
   */
  announce?: boolean;
  /** Accessible name of each slide. Defaults to "2 of 5". `index` is 0-based. */
  formatSlideLabel?: (index: number, total: number) => string;
  /** Live-region text. Defaults to "Slide 2 of 5" or "Slides 2 to 4 of 6". */
  formatAnnouncement?: (selection: CarouselSelection) => string;
}

interface CarouselContextValue
  extends Omit<CarouselProps, "orientation" | "label"> {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  /** Slide elements as Embla sees them, updated on init and reInit. */
  slideNodes: HTMLElement[];
  /** `id` of the slide track, referenced by the buttons' `aria-controls`. */
  contentId: string;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const defaultSlideLabel = (index: number, total: number) =>
  `${index + 1} of ${total}`;

const defaultAnnouncement = ({ from, to, total }: CarouselSelection) =>
  from === to
    ? `Slide ${from + 1} of ${total}`
    : `Slides ${from + 1} to ${to + 1} of ${total}`;

function getSelection(api: NonNullable<CarouselApi>): CarouselSelection {
  const total = api.slideNodes().length;
  const snap = api.selectedScrollSnap();
  let slides: number[] | undefined;
  try {
    // Maps each snap to the slides it shows (several when grouped).
    slides = api.internalEngine().slideRegistry[snap];
  } catch {
    slides = undefined;
  }
  if (!slides?.length) return { from: snap, to: snap, total };
  return { from: slides[0], to: slides[slides.length - 1], total };
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  label = "Carousel",
  announce = true,
  formatSlideLabel = defaultSlideLabel,
  formatAnnouncement = defaultAnnouncement,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [slideNodes, setSlideNodes] = React.useState<HTMLElement[]>([]);
  const [announcement, setAnnouncement] = React.useState("");
  const contentId = React.useId();

  const formatAnnouncementRef = React.useRef(formatAnnouncement);
  formatAnnouncementRef.current = formatAnnouncement;

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.defaultPrevented || isEditable(event.target)) return;
      let prevKey = "ArrowUp";
      let nextKey = "ArrowDown";
      if (orientation === "horizontal") {
        const rtl =
          opts?.direction === "rtl" ||
          (opts?.direction === undefined &&
            getComputedStyle(event.currentTarget).direction === "rtl");
        prevKey = rtl ? "ArrowRight" : "ArrowLeft";
        nextKey = rtl ? "ArrowLeft" : "ArrowRight";
      }
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    },
    [orientation, opts?.direction, scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    const onInit = (api: CarouselApi) => {
      if (api) setSlideNodes(api.slideNodes());
    };
    // Only announce changes, not the initial slide.
    const onAnnounce = (api: CarouselApi) => {
      if (api)
        setAnnouncement(formatAnnouncementRef.current(getSelection(api)));
    };
    onSelect(api);
    onInit(api);
    api.on("reInit", onSelect);
    api.on("reInit", onInit);
    api.on("select", onSelect);
    api.on("select", onAnnounce);
    return () => {
      api.off("select", onSelect);
      api.off("select", onAnnounce);
      api.off("reInit", onSelect);
      api.off("reInit", onInit);
    };
  }, [api, onSelect]);

  const hasName = props["aria-label"] != null || props["aria-labelledby"];

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        slideNodes,
        contentId,
        announce,
        formatSlideLabel,
        formatAnnouncement,
      }}
    >
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        aria-roledescription="carousel"
        aria-label={hasName ? undefined : label}
        data-slot="carousel"
        data-orientation={orientation}
        {...props}
      >
        {children}
        {announce && (
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
            data-slot="carousel-announcer"
          >
            {announcement}
          </div>
        )}
      </section>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  id,
  ...props
}: React.ComponentProps<"div">) {
  const { carouselRef, orientation, contentId } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        id={id ?? contentId}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  const { orientation, slideNodes, formatSlideLabel } = useCarousel();
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const setRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      setNode(el);
      if (typeof ref === "function") return ref(el);
      if (ref) ref.current = el;
    },
    [ref],
  );
  const index = node ? slideNodes.indexOf(node) : -1;
  const hasName = props["aria-label"] != null || props["aria-labelledby"];
  return (
    // biome-ignore lint/a11y/useSemanticElements: WAI-ARIA carousel slide pattern
    <div
      ref={setRef}
      role="group"
      aria-roledescription="slide"
      aria-label={
        hasName || index < 0 || !formatSlideLabel
          ? undefined
          : formatSlideLabel(index, slideNodes.length)
      }
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: ButtonProps) {
  const { orientation, scrollPrev, canScrollPrev, contentId } = useCarousel();
  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      aria-label="Previous slide"
      aria-controls={contentId}
      isDisabled={!canScrollPrev}
      onPress={scrollPrev}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowLeftIcon aria-hidden />
    </Button>
  );
}

export function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: ButtonProps) {
  const { orientation, scrollNext, canScrollNext, contentId } = useCarousel();
  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      aria-label="Next slide"
      aria-controls={contentId}
      isDisabled={!canScrollNext}
      onPress={scrollNext}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ArrowRightIcon aria-hidden />
    </Button>
  );
}

export type { CarouselApi };
