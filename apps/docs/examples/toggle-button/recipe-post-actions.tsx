"use client";

import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";

export default function ToggleButtonRecipePostActions() {
  const [liked, setLiked] = useState(false);
  const likes = 128 + (liked ? 1 : 0);
  return (
    <article className="w-full max-w-md rounded-xl border bg-card p-4">
      <header className="flex items-center gap-3">
        <Avatar alt="Maya Chen" fallback="MC" colorful />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm">Maya Chen</p>
          <p className="text-muted-foreground text-xs">2 hours ago</p>
        </div>
      </header>
      <p className="mt-3 text-sm leading-relaxed">
        Shipped the new onboarding checklist today. Activation is up 14% in the
        first week — huge thanks to everyone who tested the drafts.
      </p>
      <div className="-ml-2 mt-3 flex items-center gap-1">
        <ToggleButton
          size="sm"
          isSelected={liked}
          onChange={setLiked}
          aria-label={`Like, ${likes} likes`}
          className="tabular-nums data-selected:bg-destructive/10 data-selected:text-destructive data-selected:[&_svg]:fill-current"
        >
          <HeartIcon /> {likes}
        </ToggleButton>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MessageCircleIcon /> 24
        </Button>
        <ToggleButton
          size="sm"
          aria-label="Save post"
          className="ml-auto data-selected:bg-transparent data-selected:text-brand data-selected:[&_svg]:fill-current"
        >
          <BookmarkIcon />
        </ToggleButton>
      </div>
    </article>
  );
}
