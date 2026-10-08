"use client";

import { lazy } from "react";
import { LazyMount } from "@/components/lazy-mount";

/*
 * Below-the-fold landing demos. Each one is code-split and mounted only when
 * it scrolls near the viewport, so the hero hydrates without their JS. The
 * placeholder heights match the rendered demos at each breakpoint.
 */

const RecipeWall = lazy(() =>
  import("./recipe-wall").then((m) => ({ default: m.RecipeWall })),
);
const KeyboardLab = lazy(() =>
  import("./keyboard-lab").then((m) => ({ default: m.KeyboardLab })),
);
const ExhibitWall = lazy(() =>
  import("@/components/home/exhibit-wall").then((m) => ({
    default: m.ExhibitWall,
  })),
);

export function LazyRecipeWall({
  sources,
}: {
  sources: Record<string, string>;
}) {
  return (
    <LazyMount className="h-[1785px] md:h-[1729px] lg:h-[903px]">
      <RecipeWall sources={sources} />
    </LazyMount>
  );
}

export function LazyKeyboardLab() {
  return (
    <LazyMount className="h-[713px] md:h-[565px] lg:h-[316px] xl:h-[296px]">
      <KeyboardLab />
    </LazyMount>
  );
}

export function LazyExhibitWall() {
  return (
    <LazyMount className="h-[1651px] md:h-[1002px] lg:h-[675px]">
      <ExhibitWall />
    </LazyMount>
  );
}
