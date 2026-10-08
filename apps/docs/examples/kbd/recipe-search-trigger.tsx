"use client";

import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdRecipeSearchTrigger() {
  const [opened, setOpened] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpened((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground"
        onPress={() => setOpened((n) => n + 1)}
      >
        <SearchIcon /> Search docs…
        <KbdGroup className="ml-auto">
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      </Button>
      <p
        className="text-center text-muted-foreground text-xs"
        aria-live="polite"
      >
        {opened === 0
          ? "Press ⌘K or Ctrl+K anywhere on the page."
          : `Search opened ${opened} ${opened === 1 ? "time" : "times"}.`}
      </p>
    </div>
  );
}
