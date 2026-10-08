"use client";

import type * as React from "react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const avatarVariants = tv({
  base: "relative inline-flex shrink-0 select-none",
  variants: {
    size: {
      xs: "size-5 text-[0.55rem]",
      sm: "size-6 text-[0.625rem]",
      md: "size-8 text-xs",
      lg: "size-10 text-sm",
      xl: "size-14 text-lg",
    },
    shape: { circle: "rounded-full", square: "rounded-md" },
  },
  defaultVariants: { size: "md", shape: "circle" },
});

/** Soft palettes for fallback initials, picked deterministically from the name. */
const palettes = [
  "bg-[oklch(0.93_0.05_277)] text-[oklch(0.42_0.17_277)] dark:bg-[oklch(0.33_0.08_277)] dark:text-[oklch(0.88_0.07_277)]",
  "bg-[oklch(0.93_0.05_185)] text-[oklch(0.42_0.09_185)] dark:bg-[oklch(0.33_0.06_185)] dark:text-[oklch(0.88_0.06_185)]",
  "bg-[oklch(0.94_0.06_75)] text-[oklch(0.45_0.11_60)] dark:bg-[oklch(0.35_0.07_70)] dark:text-[oklch(0.9_0.08_75)]",
  "bg-[oklch(0.93_0.05_350)] text-[oklch(0.45_0.16_350)] dark:bg-[oklch(0.34_0.08_350)] dark:text-[oklch(0.88_0.07_350)]",
  "bg-[oklch(0.93_0.05_235)] text-[oklch(0.43_0.12_240)] dark:bg-[oklch(0.33_0.07_240)] dark:text-[oklch(0.88_0.06_235)]",
  "bg-[oklch(0.93_0.06_150)] text-[oklch(0.42_0.11_150)] dark:bg-[oklch(0.33_0.07_150)] dark:text-[oklch(0.88_0.07_150)]",
];

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++)
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

const statusColors = {
  online: "bg-success",
  busy: "bg-destructive",
  away: "bg-warning",
  offline: "bg-muted-foreground/50",
} as const;

export interface AvatarProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Shown while the image loads or if it fails — usually initials. */
  fallback?: ReactNode;
  /** Tint the fallback with a color derived from `alt` (or the fallback text). */
  colorful?: boolean;
  /** Presence dot in the corner. */
  status?: keyof typeof statusColors;
}

type Status = "loading" | "loaded" | "error";

/** Set by `AvatarGroup` so children without their own `size` match it. */
const AvatarGroupContext = createContext<{ size?: AvatarProps["size"] }>({});

const fallbackBase =
  "flex size-full items-center justify-center overflow-hidden font-medium";

export function Avatar({
  src,
  alt = "",
  fallback,
  size,
  shape,
  colorful,
  status,
  className,
  ...props
}: AvatarProps) {
  const group = useContext(AvatarGroupContext);
  const resolvedSize = size ?? group.size;
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<{ src?: string; value: Status }>({
    src,
    value: "loading",
  });
  const current: Status = state.src === src ? state.value : "loading";

  // The image may finish (or fail) before hydration, when React's onLoad/onError can't fire.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete)
      setState({ src, value: img.naturalWidth > 0 ? "loaded" : "error" });
  }, [src]);

  const seed = alt || (typeof fallback === "string" ? fallback : "");
  const tint =
    colorful && seed
      ? palettes[hash(seed) % palettes.length]
      : "bg-muted text-muted-foreground";
  const radius = shape === "square" ? "rounded-md" : "rounded-full";

  return (
    <span
      data-slot="avatar"
      className={avatarVariants({ size: resolvedSize, shape, className })}
      {...props}
    >
      <span className={cn("relative size-full overflow-hidden", radius)}>
        {current !== "loaded" &&
          (alt && (!src || current === "error") ? (
            <span
              role="img"
              aria-label={alt}
              className={cn(fallbackBase, tint)}
            >
              {fallback}
            </span>
          ) : (
            <span aria-hidden className={cn(fallbackBase, tint)}>
              {fallback}
            </span>
          ))}
        {src && current !== "error" && (
          // biome-ignore lint/performance/noImgElement: framework-agnostic component
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={() => setState({ src, value: "loaded" })}
            onError={() => setState({ src, value: "error" })}
            className={cn(
              "aspect-square size-full object-cover",
              current !== "loaded" && "absolute inset-0 opacity-0",
            )}
          />
        )}
      </span>
      {status && (
        <span
          role="img"
          aria-label={status}
          className={cn(
            "absolute right-0 bottom-0 size-[28%] min-w-2 min-h-2 rounded-full ring-2 ring-background",
            statusColors[status],
          )}
        />
      )}
    </span>
  );
}

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Show at most this many children, then a "+N" avatar. */
  max?: number;
  /** Size of the "+N" avatar and of every child that doesn't set its own `size`. */
  size?: AvatarProps["size"];
}

export function AvatarGroup({
  className,
  children,
  max,
  size = "md",
  ...props
}: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visible = max ? items.slice(0, max) : items;
  const rest = max ? items.length - max : 0;
  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <div
        data-slot="avatar-group"
        className={cn(
          "flex -space-x-2 *:data-[slot=avatar]:rounded-full *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
          className,
        )}
        {...props}
      >
        {visible}
        {rest > 0 && (
          <Avatar
            size={size}
            fallback={`+${rest}`}
            aria-label={`${rest} more`}
          />
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
}
