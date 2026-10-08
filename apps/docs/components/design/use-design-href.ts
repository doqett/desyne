"use client";

import { useCallback } from "react";
import { encodeDesign } from "@/lib/design";
import { proUrl } from "@/lib/site";
import { isCustomDesign, useDesign } from "@/lib/use-design";

/**
 * Docs and Pro are separate origins with separate storage: links to Pro carry
 * the chosen design as `?design=` so Pro previews pick it up.
 */
export function useDesignHref() {
  const [design] = useDesign();
  const encoded = isCustomDesign(design) ? encodeDesign(design) : null;
  return useCallback(
    (href: string) => {
      if (!encoded || !href.startsWith(proUrl)) return href;
      const url = new URL(href);
      url.searchParams.set("design", encoded);
      return url.toString();
    },
    [encoded],
  );
}
