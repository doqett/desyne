import {
  applyDesign,
  type Design,
  type FontId,
  fonts,
  type Mode,
} from "@/lib/design";
import { resolveFontStack } from "@/lib/design-fonts";

/*
 * Font stacks for the theme builder. The web fonts themselves are loaded once
 * in the root layout (`@/lib/design-fonts`); this maps design.ts's family
 * names onto the self-hosted ones.
 */

/** The font stacks to use on this page. */
export function fontStack(id: FontId) {
  const preset = fonts[id] ?? fonts.inter;
  const sans = resolveFontStack(preset.sans);
  const heading = preset.heading ? resolveFontStack(preset.heading) : sans;
  return { sans, heading };
}

/** `applyDesign` plus the self-hosted font stacks. Returns the cleanup. */
export function applyPreviewDesign(
  el: HTMLElement,
  design: Design,
  mode: Mode,
) {
  const cleanup = applyDesign(el, design, mode);
  const stack = fontStack(design.font);
  el.style.setProperty("--font-sans", stack.sans);
  el.style.setProperty("--font-heading", stack.heading);
  return cleanup;
}
