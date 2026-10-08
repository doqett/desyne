"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  type Design,
  decodeDesign,
  defaultDesign,
  designStorageKey,
  encodeDesign,
} from "@/lib/design";

/**
 * The design (style, base, brand, radius, density, font) chosen in the theme
 * builder, shared by every preview on the site. Stored in localStorage as an
 * encoded string, synced across components and tabs. `?design=<encoded>` in
 * the URL wins on first load (shared links, Pro previews).
 */
const EVENT = "ds-design-change";
let cached: { raw: string | null; design: Design } | null = null;

function read(): Design {
  if (typeof window === "undefined") return defaultDesign;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(designStorageKey);
  } catch {}
  if (!cached || cached.raw !== raw)
    cached = { raw, design: raw ? decodeDesign(raw) : defaultDesign };
  return cached.design;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === designStorageKey) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setDesign(design: Partial<Design> | null) {
  try {
    if (design) localStorage.setItem(designStorageKey, encodeDesign(design));
    else localStorage.removeItem(designStorageKey);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Reads `?design=` once and persists it, so shared links apply site-wide. */
export function adoptDesignFromUrl() {
  if (typeof window === "undefined") return;
  const raw = new URLSearchParams(window.location.search).get("design");
  if (raw) setDesign(decodeDesign(raw));
}

export function useDesign(): [Design, (d: Partial<Design> | null) => void] {
  const design = useSyncExternalStore(subscribe, read, () => defaultDesign);
  const update = useCallback((d: Partial<Design> | null) => setDesign(d), []);
  return [design, update];
}

/** True when the stored design differs from the library default. */
export function isCustomDesign(design: Design) {
  return encodeDesign(design) !== encodeDesign(defaultDesign);
}
