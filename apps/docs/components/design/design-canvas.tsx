"use client";

import {
  type ComponentProps,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { UNSAFE_PortalProvider } from "react-aria";
import { applyDesign, type Design, designToCssVars } from "@/lib/design";
import { resolveFontStack } from "@/lib/design-fonts";
import { isCustomDesign, useDesign } from "@/lib/use-design";

function subscribeDark(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => mo.disconnect();
}

/** Whether the site (<html>) is in dark mode; follows next-themes' class. */
export function useSiteDark() {
  return useSyncExternalStore(
    subscribeDark,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

/** `applyDesign` plus self-hosted font stacks (next/font renames families). */
export function applyDesignWithFonts(
  el: HTMLElement,
  design: Design,
  mode: "light" | "dark",
) {
  const cleanup = applyDesign(el, design, mode);
  const vars = designToCssVars(design);
  el.style.setProperty(
    "--font-sans",
    resolveFontStack(vars.theme["font-sans"]),
  );
  el.style.setProperty(
    "--font-heading",
    resolveFontStack(vars.light["font-heading"]),
  );
  return cleanup;
}

/** The design chosen in the switcher / theme builder, or null for the default. */
export function useCustomDesign() {
  const [design] = useDesign();
  return isCustomDesign(design) ? design : null;
}

interface DesignCanvasProps extends ComponentProps<"div"> {
  /**
   * Render overlays (popovers, menus, dialogs) opened inside the canvas into a
   * body-level container carrying the same design, so they match the preview
   * without being clipped by the frame.
   */
  overlays?: boolean;
}

/**
 * A preview surface that renders in the design chosen by the visitor. With the
 * default design nothing is applied (no inline variables at all).
 */
export function DesignCanvas({
  overlays = false,
  children,
  ...props
}: DesignCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const design = useCustomDesign();
  const dark = useSiteDark();
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const custom = design !== null;

  useEffect(() => {
    if (!overlays || !custom) return;
    const el = document.createElement("div");
    el.dataset.vfDesignPortal = "";
    document.body.append(el);
    setPortal(el);
    return () => {
      el.remove();
      setPortal(null);
    };
  }, [overlays, custom]);

  useEffect(() => {
    if (!design) return;
    const mode = dark ? "dark" : "light";
    const targets = [ref.current, portal].filter(
      (el): el is HTMLElement => el !== null,
    );
    const cleanups = targets.map((el) =>
      applyDesignWithFonts(el, design, mode),
    );
    return () => {
      for (const c of cleanups) c();
    };
  }, [design, dark, portal]);

  const canvas = (
    <div ref={ref} data-design={design ? "" : undefined} {...props}>
      {children}
    </div>
  );
  if (!overlays) return canvas;
  return (
    <UNSAFE_PortalProvider getContainer={portal ? () => portal : null}>
      {canvas}
    </UNSAFE_PortalProvider>
  );
}
