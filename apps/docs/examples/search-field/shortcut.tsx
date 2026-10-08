"use client";

import { useEffect, useRef } from "react";
import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldShortcut() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        ref.current?.querySelector("input")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div ref={ref} className="flex w-full max-w-xs flex-col gap-2">
      <SearchField aria-label="Search" shortcut="⌘K" />
      <p className="text-muted-foreground text-xs">
        Press ⌘K (or Ctrl K) anywhere on the page to focus the field.
      </p>
    </div>
  );
}
