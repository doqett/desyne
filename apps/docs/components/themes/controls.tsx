"use client";

import { CheckIcon, InfoIcon, PipetteIcon } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Select, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  type BaseId,
  type BrandId,
  bases,
  brands,
  type Density,
  type Design,
  designForStyle,
  designToCssVars,
  type FontId,
  fonts,
  type Mode,
  resolveBrand,
  type StyleId,
  styles,
} from "@/lib/design";
import { cn } from "@/lib/utils";
import { contrast, hexToOklch, oklchToHex } from "./color";
import { applyPreviewDesign, fontStack } from "./fonts";

const styleIds = Object.keys(styles) as StyleId[];
const baseIds = Object.keys(bases) as BaseId[];
const brandIds = Object.keys(brands) as BrandId[];
const fontIds = Object.keys(fonts) as FontId[];
const radiusPresets = [0, 0.25, 0.5, 0.625, 0.875, 1, 1.25];
const densityIds: Density[] = ["compact", "default", "comfortable"];

export const isPresetBrand = (brand: string): brand is BrandId =>
  Object.hasOwn(brands, brand);

export function brandLabel(brand: string) {
  return isPresetBrand(brand) ? brands[brand].label : "Custom";
}

const fmt = (n: number) => String(Number(n.toFixed(3)));

/** The builder's control panel. Every change produces a new design. */
export function ThemeControls({
  design,
  mode,
  onChange,
}: {
  design: Design;
  mode: Mode;
  onChange: (design: Design) => void;
}) {
  const set = (patch: Partial<Design>) => onChange({ ...design, ...patch });

  return (
    <div className="divide-y">
      <Section
        title="Style"
        value={styles[design.style].label}
        hint="A style sets shape, borders, shadows and type. Picking one also resets radius, density and font to its defaults; base and brand are kept."
      >
        <AriaRadioGroup
          aria-label="Style"
          value={design.style}
          onChange={(v) =>
            onChange(
              designForStyle(v as StyleId, {
                base: design.base,
                brand: design.brand,
              }),
            )
          }
          className="grid grid-cols-2 gap-2"
        >
          {styleIds.map((id) => (
            <AriaRadio
              key={id}
              value={id}
              className={cn(
                "group relative flex cursor-default flex-col overflow-hidden rounded-lg border bg-card text-left outline-none transition-[border-color,box-shadow]",
                "data-hovered:border-foreground/25 data-focus-visible:ring-[3px] data-focus-visible:ring-ring/40",
                "data-selected:border-brand data-selected:ring-1 data-selected:ring-brand",
              )}
            >
              <StyleSample
                design={designForStyle(id, {
                  base: design.base,
                  brand: design.brand,
                })}
                mode={mode}
              />
              <span className="flex flex-col gap-0.5 border-t px-2.5 py-2">
                <span className="flex items-center justify-between font-medium text-[0.8125rem]">
                  {styles[id].label}
                  <CheckIcon
                    aria-hidden
                    className="size-3.5 text-brand opacity-0 group-data-selected:opacity-100"
                  />
                </span>
                <span className="text-[0.6875rem] text-muted-foreground leading-snug">
                  {styles[id].description}
                </span>
              </span>
            </AriaRadio>
          ))}
        </AriaRadioGroup>
      </Section>

      <Section title="Base color" value={bases[design.base].label}>
        <AriaRadioGroup
          aria-label="Base color"
          orientation="horizontal"
          value={design.base}
          onChange={(v) => set({ base: v as BaseId })}
          className="flex flex-wrap gap-1.5"
        >
          {baseIds.map((id) => (
            <SwatchRadio
              key={id}
              value={id}
              label={bases[id].label}
              outer={bases[id][mode].background}
              inner={bases[id].light["muted-foreground"]}
            />
          ))}
        </AriaRadioGroup>
      </Section>

      <Section title="Brand color" value={brandLabel(design.brand)}>
        <BrandControl design={design} mode={mode} onChange={set} />
      </Section>

      <Section title="Radius" value={`${fmt(design.radius)}rem`}>
        <Slider
          aria-label="Radius"
          showOutput={false}
          minValue={0}
          maxValue={1.25}
          step={0.025}
          value={design.radius}
          onChange={(v) => set({ radius: v as number })}
        />
        <ToggleButtonGroup
          aria-label="Radius presets"
          variant="segmented"
          size="xs"
          selectionMode="single"
          selectedKeys={
            radiusPresets.includes(design.radius) ? [String(design.radius)] : []
          }
          onSelectionChange={(keys) => {
            const k = [...keys][0];
            if (k !== undefined) set({ radius: Number(k) });
          }}
          className="mt-3 grid w-full grid-cols-7"
        >
          {radiusPresets.map((r) => (
            <ToggleButton
              key={r}
              id={String(r)}
              aria-label={`${r}rem`}
              className="px-0 font-mono text-[0.6875rem] tabular-nums"
            >
              {String(r).replace(/^0\./, ".")}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Section>

      <Section title="Density" value={capitalize(design.density)}>
        <ToggleButtonGroup
          aria-label="Density"
          variant="segmented"
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[design.density]}
          onSelectionChange={(keys) => {
            const k = [...keys][0];
            if (k) set({ density: k as Density });
          }}
          className="grid w-full grid-cols-3"
        >
          {densityIds.map((d) => (
            <ToggleButton key={d} id={d}>
              {capitalize(d)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Section>

      <Section title="Font" value={fonts[design.font].label}>
        <Select
          aria-label="Font"
          selectedKey={design.font}
          onSelectionChange={(k) => k && set({ font: k as FontId })}
        >
          {fontIds.map((id) => (
            <SelectItem key={id} id={id} textValue={fonts[id].label}>
              <span style={{ fontFamily: fontStack(id).heading }}>
                {fonts[id].label}
              </span>
            </SelectItem>
          ))}
        </Select>
      </Section>

      <Section title="Contrast" value="WCAG 2.1">
        <ContrastTable design={design} />
      </Section>
    </div>
  );
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

function Section({
  title,
  value,
  hint,
  children,
}: {
  title: string;
  value?: ReactNode;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-4 py-4">
      <header className="mb-3 flex items-center gap-2">
        <h3 className="font-medium text-[0.8125rem] text-muted-foreground">
          {title}
        </h3>
        {value && (
          <span className="ms-auto truncate text-[0.75rem] text-foreground/80">
            {value}
          </span>
        )}
      </header>
      {children}
      {hint && (
        <p className="mt-2.5 flex gap-1.5 text-[0.6875rem] text-muted-foreground leading-snug">
          <InfoIcon aria-hidden className="mt-px size-3 shrink-0" />
          {hint}
        </p>
      )}
    </section>
  );
}

/** A tiny component sample rendered in one style (non-interactive). */
function StyleSample({ design, mode }: { design: Design; mode: Mode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) applyPreviewDesign(ref.current, design, mode);
  }, [design, mode]);
  return (
    <div
      ref={ref}
      aria-hidden
      inert
      className={cn(
        "pointer-events-none flex flex-col gap-1.5 bg-background p-2.5 text-foreground",
        mode === "dark" && "dark",
      )}
    >
      <div className="flex items-center gap-1.5 rounded-(--radius-box) border-(length:--border-width) border-border bg-card p-1.5 shadow-(--shadow-box)">
        <span className="flex h-(--control-h-xs) min-w-0 flex-1 items-center rounded-(--radius-control) border-(length:--border-width) border-(--field-border) bg-(--field-bg) px-1.5 text-[0.625rem] text-muted-foreground shadow-(--field-shadow)">
          Email
        </span>
        <Button size="xs" color="brand" className="px-1.5 text-[0.625rem]">
          Join
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <Badge size="sm" color="brand">
          New
        </Badge>
        <span className="truncate font-(family-name:--font-heading) font-(weight:--heading-weight) text-[0.75rem] tracking-(--heading-tracking)">
          Aa Heading
        </span>
      </div>
    </div>
  );
}

function SwatchRadio({
  value,
  label,
  outer,
  inner,
}: {
  value: string;
  label: string;
  outer: string;
  inner: string;
}) {
  return (
    <AriaRadio
      value={value}
      aria-label={label}
      className="group relative flex size-8 cursor-default items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-card data-focus-visible:ring-2 data-focus-visible:ring-ring data-selected:ring-2 data-selected:ring-foreground/70"
    >
      <span
        title={label}
        className="flex size-7 items-center justify-center rounded-full border shadow-xs"
        style={{ background: outer }}
      >
        <span className="size-3.5 rounded-full" style={{ background: inner }} />
      </span>
    </AriaRadio>
  );
}

function BrandControl({
  design,
  mode,
  onChange,
}: {
  design: Design;
  mode: Mode;
  onChange: (patch: Partial<Design>) => void;
}) {
  const custom = !isPresetBrand(design.brand);
  const colors = resolveBrand(design.brand, bases[design.base]);
  const current = colors[mode];
  const hex = oklchToHex(colors.light.brand);
  const ratio = contrast(current["brand-foreground"], current.brand);

  return (
    <div className="grid gap-3">
      <AriaRadioGroup
        aria-label="Brand color"
        orientation="horizontal"
        value={custom ? null : design.brand}
        onChange={(v) => onChange({ brand: v })}
        className="grid grid-cols-5 gap-1.5 justify-items-center"
      >
        {brandIds.map((id) => {
          const c = resolveBrand(id, bases[design.base])[mode];
          return (
            <AriaRadio
              key={id}
              value={id}
              aria-label={brands[id].label}
              className="group flex size-9 cursor-default items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-card data-focus-visible:ring-2 data-focus-visible:ring-ring data-selected:ring-2 data-selected:ring-foreground/70"
            >
              <span
                title={brands[id].label}
                className="flex size-8 items-center justify-center rounded-full shadow-xs ring-1 ring-black/10 ring-inset dark:ring-white/15"
                style={{ background: c.brand, color: c["brand-foreground"] }}
              >
                <CheckIcon
                  aria-hidden
                  className="size-3.5 opacity-0 group-data-selected:opacity-100"
                />
              </span>
            </AriaRadio>
          );
        })}
      </AriaRadioGroup>
      <div className="flex items-center gap-2">
        <ColorPicker
          aria-label="Custom brand color"
          label="Custom"
          value={hex}
          onChange={(c) => {
            const v = hexToOklch(c.toString("hex"));
            if (v) onChange({ brand: v });
          }}
          className={cn(
            "h-8 shrink-0",
            custom && "border-brand ring-1 ring-brand",
          )}
        />
        <div
          className="flex h-8 min-w-0 flex-1 items-center justify-between gap-2 rounded-md px-2.5 text-xs"
          style={{
            background: current.brand,
            color: current["brand-foreground"],
          }}
        >
          <span className="truncate font-mono text-[0.6875rem]">
            {custom ? design.brand : hex}
          </span>
          <span className="shrink-0 font-medium tabular-nums">
            Aa {ratio ? `${ratio.toFixed(1)}:1` : ""}
          </span>
        </div>
      </div>
      {custom && (
        <p className="flex gap-1.5 text-[0.6875rem] text-muted-foreground leading-snug">
          <PipetteIcon aria-hidden className="mt-px size-3 shrink-0" />
          The dark-mode brand and the text on it are derived automatically.
        </p>
      )}
    </div>
  );
}

const checks = [
  { label: "Body text", fg: "foreground", bg: "background", min: 4.5 },
  { label: "Muted text", fg: "muted-foreground", bg: "background", min: 4.5 },
  { label: "Text on muted", fg: "foreground", bg: "muted", min: 4.5 },
  { label: "Brand text", fg: "brand", bg: "background", min: 4.5 },
  { label: "On brand", fg: "brand-foreground", bg: "brand", min: 4.5 },
] as const;

function ContrastTable({ design }: { design: Design }) {
  const rows = useMemo(() => {
    const vars = designToCssVars(design);
    const light = vars.light;
    const dark = { ...vars.light, ...vars.dark };
    return checks.map((c) => ({
      ...c,
      light: contrast(light[c.fg], light[c.bg]),
      dark: contrast(dark[c.fg], dark[c.bg]),
    }));
  }, [design]);

  return (
    <table className="w-full text-[0.75rem]">
      <thead>
        <tr className="text-muted-foreground">
          <th className="pb-1.5 text-left font-normal">Pair</th>
          <th className="pb-1.5 text-right font-normal">Light</th>
          <th className="pb-1.5 text-right font-normal">Dark</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="py-1 pr-2">{r.label}</td>
            <td className="py-1 text-right">
              <Ratio value={r.light} min={r.min} />
            </td>
            <td className="py-1 pl-1.5 text-right">
              <Ratio value={r.dark} min={r.min} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Ratio({ value, min }: { value: number | null; min: number }) {
  if (value === null) return <span className="text-muted-foreground">–</span>;
  const pass = value >= min;
  const large = !pass && value >= 3;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 font-mono text-[0.6875rem] tabular-nums",
        pass && "bg-success/10 text-success",
        large &&
          "bg-warning/15 text-[color-mix(in_oklab,var(--warning),black_40%)] dark:text-warning",
        !pass && !large && "bg-destructive/10 text-destructive",
      )}
      title={pass ? "Passes AA" : large ? "AA for large text only" : "Fails AA"}
    >
      {value.toFixed(1)}
      <span className="font-sans font-semibold text-[0.625rem]">
        {pass ? "AA" : large ? "Large" : "Fail"}
      </span>
    </span>
  );
}
