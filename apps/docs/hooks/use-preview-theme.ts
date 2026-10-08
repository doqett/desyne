"use client";

import { useEffect, useState } from "react";

/** Whether the site (the <html> element) is currently in dark mode. */
export function useSiteDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/**
 * A preview's theme: follows the site theme, can be flipped locally, and
 * resets to the site theme whenever the global theme changes.
 */
export function usePreviewDark() {
  const site = useSiteDark();
  const [override, setOverride] = useState<boolean>();
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on every site theme change
  useEffect(() => setOverride(undefined), [site]);
  const dark = override ?? site;
  return [dark, () => setOverride(!dark)] as const;
}
