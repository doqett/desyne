"use client";

import { BellIcon, CommandIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";

export default function SearchFieldRecipeHeader() {
  const searchRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        searchRef.current?.querySelector("input")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="flex w-full max-w-2xl items-center gap-3 rounded-xl border bg-card px-3 py-2">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <CommandIcon className="size-3.5" />
        </span>
        <span className="hidden sm:inline">Acme</span>
      </div>
      <search ref={searchRef} className="mx-auto w-full max-w-sm">
        <SearchField
          aria-label="Search projects, people and docs"
          placeholder="Search…"
          variant="filled"
          size="sm"
          shortcut="/"
        />
      </search>
      <Button size="icon-sm" variant="ghost" aria-label="Notifications">
        <BellIcon />
      </Button>
      <Avatar size="sm" fallback="JL" colorful alt="Jordan Lee" />
    </header>
  );
}
