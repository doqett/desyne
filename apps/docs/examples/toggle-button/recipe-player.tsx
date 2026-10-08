"use client";

import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  Repeat1Icon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonRecipePlayer() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border bg-card p-3">
      <div className="size-11 shrink-0 rounded-md bg-linear-to-br from-brand/80 to-primary/60" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">Midnight Drive</p>
        <p className="truncate text-muted-foreground text-xs">
          Lumen Avenue · Night Transit
        </p>
      </div>
      <ToggleButton
        size="sm"
        aria-label="Add to liked songs"
        className="data-selected:bg-transparent data-selected:text-brand data-selected:[&_svg]:fill-current"
      >
        <HeartIcon />
      </ToggleButton>
      <div className="flex items-center">
        <ToggleButton size="sm" aria-label="Shuffle">
          <ShuffleIcon />
        </ToggleButton>
        <Button variant="ghost" size="icon-sm" aria-label="Previous track">
          <SkipBackIcon />
        </Button>
        <ToggleButton size="sm" aria-label="Play" defaultSelected>
          {({ isSelected }) => (isSelected ? <PauseIcon /> : <PlayIcon />)}
        </ToggleButton>
        <Button variant="ghost" size="icon-sm" aria-label="Next track">
          <SkipForwardIcon />
        </Button>
        <ToggleButton size="sm" aria-label="Repeat track">
          <Repeat1Icon />
        </ToggleButton>
      </div>
    </div>
  );
}
