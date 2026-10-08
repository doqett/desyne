"use client";

import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders `children` only once the placeholder comes within `rootMargin` of
 * the viewport. Pair it with `lazy()`/`next/dynamic` children so their code
 * stays out of the initial bundle. `className` sizes the placeholder (and
 * the Suspense fallback) to the mounted content's height, so nothing shifts.
 */
export function LazyMount({
  children,
  className,
  rootMargin = "300px 0px",
}: {
  children: ReactNode;
  /** Height of the placeholder, ideally per breakpoint. */
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const placeholder = (
    <div
      ref={visible ? undefined : ref}
      aria-hidden
      className={cn("rounded-2xl", className)}
    />
  );

  if (!visible) return placeholder;
  return <Suspense fallback={placeholder}>{children}</Suspense>;
}
