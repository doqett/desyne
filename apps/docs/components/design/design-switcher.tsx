"use client";

import { ArrowRightIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button as AriaButton, DialogTrigger } from "react-aria-components";
import { Popover, PopoverDialog } from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import {
  type BaseId,
  type BrandId,
  bases,
  brands,
  type Design,
  designForStyle,
  resolveBrand,
  type StyleId,
  styles,
} from "@/lib/design";
import {
  adoptDesignFromUrl,
  isCustomDesign,
  setDesign,
  useDesign,
} from "@/lib/use-design";
import { useSiteDark } from "./design-canvas";

const styleIds = Object.keys(styles) as StyleId[];
const brandIds = Object.keys(brands) as BrandId[];
const baseIds = Object.keys(bases) as BaseId[];
/** Quick radius presets in rem, labelled in px. */
const radii = [0, 0.25, 0.5, 0.625, 0.875, 1];

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 focus-visible:ring-offset-popover";

function brandColor(design: Design, dark: boolean) {
  return resolveBrand(design.brand, bases[design.base])[dark ? "dark" : "light"]
    .brand;
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a labelled group of toggle buttons, not a form fieldset
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <span className="font-medium text-[0.75rem] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Swatch({
  label,
  color,
  selected,
  onSelect,
  split,
}: {
  label: string;
  color: string;
  selected: boolean;
  onSelect: () => void;
  /** Two-tone swatch (the `contrast` brand: ink in light, white in dark). */
  split?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      title={label}
      onClick={onSelect}
      className={cn(
        "relative size-6 shrink-0 rounded-full ring-1 ring-black/10 ring-inset transition-transform hover:scale-110 dark:ring-white/15",
        selected && "ring-2 ring-foreground ring-offset-2 ring-offset-popover",
        focusRing,
      )}
      style={{
        background: split
          ? "linear-gradient(135deg, oklch(0.2 0 0) 50%, oklch(0.97 0 0) 50%)"
          : color,
      }}
    />
  );
}

function Choice({
  selected,
  onSelect,
  children,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onSelect}
      className={cn(
        "h-7 rounded-md border bg-background px-2 text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground",
        selected &&
          "border-foreground/70 bg-accent font-medium text-foreground",
        focusRing,
      )}
    >
      {children}
    </button>
  );
}

/** The panel: style, brand, base, radius, reset and a link to the builder. */
function DesignPanel({ builderHref }: { builderHref: string }) {
  const [design] = useDesign();
  const dark = useSiteDark();
  const custom = isCustomDesign(design);
  const update = (patch: Partial<Design>) => setDesign({ ...design, ...patch });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-medium text-sm">Preview design</p>
        <p className="mt-1 text-[0.75rem] text-muted-foreground leading-relaxed">
          Restyles the component previews only. The site and the code you copy
          stay the same.
        </p>
      </div>
      <Section label="Style">
        <div className="grid grid-cols-4 gap-1">
          {styleIds.map((id) => (
            <Choice
              key={id}
              selected={design.style === id}
              onSelect={() =>
                setDesign(
                  designForStyle(id, {
                    base: design.base,
                    brand: design.brand,
                  }),
                )
              }
            >
              {styles[id].label}
            </Choice>
          ))}
        </div>
      </Section>
      <Section label="Brand">
        <div className="flex flex-wrap gap-2">
          {brandIds.map((id) => (
            <Swatch
              key={id}
              label={brands[id].label}
              split={id === "contrast"}
              color={brandColor({ ...design, brand: id }, dark)}
              selected={design.brand === id}
              onSelect={() => update({ brand: id })}
            />
          ))}
        </div>
      </Section>
      <Section label="Base">
        <div className="flex flex-wrap gap-2">
          {baseIds.map((id) => (
            <Swatch
              key={id}
              label={bases[id].label}
              color={bases[id].swatch}
              selected={design.base === id}
              onSelect={() => update({ base: id })}
            />
          ))}
        </div>
      </Section>
      <Section label="Radius">
        <div className="grid grid-cols-6 gap-1">
          {radii.map((r) => (
            <Choice
              key={r}
              label={`${r * 16}px radius`}
              selected={design.radius === r}
              onSelect={() => update({ radius: r })}
            >
              {r * 16}
            </Choice>
          ))}
        </div>
      </Section>
      <div className="-mx-4 -mb-4 flex items-center justify-between gap-2 border-t bg-muted/40 px-4 py-2.5">
        <button
          type="button"
          disabled={!custom}
          onClick={() => setDesign(null)}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-md px-1.5 text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
            focusRing,
          )}
        >
          <RotateCcwIcon className="size-3.5" />
          Reset to default
        </button>
        <Link
          href={builderHref}
          className={cn(
            "inline-flex h-7 items-center gap-1 rounded-md px-1.5 font-medium text-[0.75rem] text-foreground hover:underline",
            focusRing,
          )}
        >
          Open theme builder
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

/**
 * Compact header control: the current brand + style, opening a popover to change
 * the design every component preview renders in. `?design=` in the URL (links
 * from Pro or the builder) is adopted on load.
 */
export function DesignSwitcher({
  className,
  alwaysShowLabel,
}: {
  className?: string;
  /** Keep the style name on small screens (the mobile drawer). */
  alwaysShowLabel?: boolean;
}) {
  const [design] = useDesign();
  const dark = useSiteDark();
  const custom = isCustomDesign(design);
  useEffect(() => adoptDesignFromUrl(), []);

  return (
    <DialogTrigger>
      <AriaButton
        aria-label={`Preview design: ${styles[design.style].label}`}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[0.8125rem] text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground data-focus-visible:ring-[3px] data-focus-visible:ring-ring/40 data-pressed:bg-accent",
          className,
        )}
      >
        <span
          aria-hidden
          className="size-3.5 shrink-0 ring-1 ring-black/10 ring-inset dark:ring-white/15"
          style={{
            background: brandColor(design, dark),
            borderRadius: `${Math.min(design.radius * 0.6, 0.4375)}rem`,
          }}
        />
        <span className={alwaysShowLabel ? undefined : "max-sm:hidden"}>
          {styles[design.style].label}
        </span>
        {custom && (
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
        )}
      </AriaButton>
      <Popover placement="bottom end" className="w-80">
        <PopoverDialog aria-label="Preview design" className="w-full p-4">
          <DesignPanel builderHref="/themes" />
        </PopoverDialog>
      </Popover>
    </DialogTrigger>
  );
}
