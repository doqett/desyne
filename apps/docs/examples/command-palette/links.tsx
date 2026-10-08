"use client";

import {
  BookOpenIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  LifeBuoyIcon,
  NewspaperIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandItem,
  CommandPalette,
  CommandSection,
} from "@/components/ui/command-palette";

export default function CommandPaletteLinks() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Open resources
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        placeholder="Jump to a resource…"
      >
        <CommandSection title="On this page">
          <CommandItem textValue="Accessibility" href="#accessibility">
            <LifeBuoyIcon /> Accessibility
          </CommandItem>
          <CommandItem textValue="API reference" href="#api-reference">
            <BookOpenIcon /> API reference
          </CommandItem>
        </CommandSection>
        <CommandSection title="External">
          <CommandItem
            textValue="React Aria Autocomplete"
            href="https://react-spectrum.adobe.com/react-aria/Autocomplete.html"
            target="_blank"
          >
            <NewspaperIcon /> React Aria Autocomplete
            <ExternalLinkIcon className="ml-auto" />
          </CommandItem>
          <CommandItem
            textValue="React Spectrum on GitHub"
            href="https://github.com/adobe/react-spectrum"
            target="_blank"
          >
            <GitBranchIcon /> React Spectrum on GitHub
            <ExternalLinkIcon className="ml-auto" />
          </CommandItem>
        </CommandSection>
      </CommandPalette>
    </>
  );
}
