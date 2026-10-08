"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  DownloadIcon,
  LinkIcon,
  MoonIcon,
  RotateCcwIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { usePreviewDark } from "@/hooks/use-preview-theme";
import {
  bases,
  type Design,
  decodeDesign,
  defaultDesign,
  designStorageKey,
  encodeDesign,
  fonts,
  styles,
} from "@/lib/design";
import { setDesign as applyToSite, useDesign } from "@/lib/use-design";
import { cn } from "@/lib/utils";
import { brandLabel, ThemeControls } from "./controls";
import { InstallDialogContent } from "./install-dialog";
import { ThemePreview } from "./preview";

const same = (a: Design, b: Design) => encodeDesign(a) === encodeDesign(b);

/** Initial design: `?design=` wins, then the design applied to the site. */
function initialDesign(): Design {
  const raw = new URLSearchParams(window.location.search).get("design");
  if (raw) return decodeDesign(raw);
  try {
    const stored = localStorage.getItem(designStorageKey);
    if (stored) return decodeDesign(stored);
  } catch {}
  return defaultDesign;
}

/** The /themes page body: top bar, control panel and live preview. */
export function ThemeBuilder() {
  const [design, setDesign] = useState<Design>(defaultDesign);
  const [ready, setReady] = useState(false);
  const [dark, toggleDark] = usePreviewDark();
  const [siteDesign] = useDesign();
  const [panelOpen, setPanelOpen] = useState(false);
  const mode = dark ? "dark" : "light";

  useEffect(() => {
    setDesign(initialDesign());
    setReady(true);
  }, []);

  // Keep the address bar shareable without adding history entries.
  const first = useRef(true);
  useEffect(() => {
    if (!ready) return;
    if (first.current) {
      first.current = false;
      if (!new URLSearchParams(window.location.search).has("design")) return;
    }
    const url = new URL(window.location.href);
    if (same(design, defaultDesign)) url.searchParams.delete("design");
    else url.searchParams.set("design", encodeDesign(design));
    window.history.replaceState(window.history.state, "", url);
  }, [design, ready]);

  const applied = same(design, siteDesign);
  const siteCustom = !same(siteDesign, defaultDesign);
  const isDefault = same(design, defaultDesign);

  const share = async () => {
    const url = new URL("/themes", window.location.origin);
    url.searchParams.set("design", encodeDesign(design));
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success("Link copied", {
        description: "Anyone with the link sees this theme.",
      });
    } catch {
      toast.error("Couldn't copy the link", { description: url.toString() });
    }
  };

  const summary = `${styles[design.style].label} · ${bases[design.base].label} · ${brandLabel(design.brand)} · ${fonts[design.font].label}`;

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4 px-4 pt-8 pb-5 sm:px-6 sm:pt-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="font-semibold text-3xl tracking-[-0.035em] sm:text-4xl">
            Themes
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground text-sm sm:text-base">
            Pick a style, then tune color, radius, density and type. Every
            component reads the same tokens, so one theme restyles the whole
            library.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={dark ? "Preview in light mode" : "Preview in dark mode"}
            onPress={toggleDark}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            variant="outline"
            isDisabled={isDefault}
            onPress={() => setDesign(defaultDesign)}
          >
            <RotateCcwIcon /> Reset
          </Button>
          <Button variant="outline" onPress={share}>
            <LinkIcon /> Share
          </Button>
          {applied && siteCustom ? (
            <div className="flex items-center">
              <span className="inline-flex h-(--control-h-md) items-center gap-1.5 rounded-s-(--radius-control) border border-e-0 border-success/40 bg-success/10 px-3 font-medium text-sm text-success">
                <CheckIcon className="size-4" /> Applied
              </span>
              <Button
                variant="outline"
                className="rounded-s-none"
                onPress={() => {
                  applyToSite(null);
                  toast("Site theme reset", {
                    description: "Docs and Pro previews use the default again.",
                  });
                }}
              >
                <XIcon /> Remove
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onPress={() => {
                applyToSite(isDefault ? null : design);
                toast.success("Applied to the site", {
                  description:
                    "Component previews in the docs and Pro now use this theme.",
                });
              }}
            >
              <SparklesIcon /> Apply to site
            </Button>
          )}
          <DialogTrigger>
            <Button color="brand">
              <DownloadIcon /> Install
            </Button>
            <InstallDialogContent design={design} />
          </DialogTrigger>
        </div>
      </div>

      {/* Builder */}
      <div className="border-t bg-muted/35 dark:bg-muted/15">
        <div className="mx-auto grid w-full max-w-[1480px] gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
          <aside className="min-w-0 lg:sticky lg:top-[72px] lg:self-start">
            <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
              <button
                type="button"
                aria-expanded={panelOpen}
                aria-controls="theme-controls"
                onClick={() => setPanelOpen((o) => !o)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 lg:hidden"
              >
                <SlidersHorizontalIcon className="size-4 text-muted-foreground" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-sm">Customize</span>
                  <span className="block truncate text-muted-foreground text-xs">
                    {summary}
                  </span>
                </span>
                <ChevronDownIcon
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    panelOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                id="theme-controls"
                className={cn(
                  "border-t lg:block lg:max-h-[calc(100dvh-88px)] lg:overflow-y-auto lg:overscroll-contain lg:border-t-0 lg:[scrollbar-width:thin]",
                  !panelOpen && "hidden",
                )}
              >
                <ThemeControls
                  design={design}
                  mode={mode}
                  onChange={setDesign}
                />
              </div>
            </div>
          </aside>
          <ThemePreview design={design} mode={mode} />
        </div>
      </div>
    </div>
  );
}
