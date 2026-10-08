"use client";

import {
  BookOpenIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  MessagesSquareIcon,
} from "lucide-react";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

export default function ListBoxLinks() {
  return (
    <ListBox aria-label="Resources" className="w-full max-w-60">
      <ListBoxItem href="/docs" textValue="Documentation">
        <BookOpenIcon />
        Documentation
      </ListBoxItem>
      <ListBoxItem href="/docs/components" textValue="Components">
        <LayoutGridIcon />
        Components
      </ListBoxItem>
      <ListBoxItem
        href="https://github.com/adobe/react-spectrum/discussions"
        target="_blank"
        textValue="Community"
      >
        <MessagesSquareIcon />
        Community
      </ListBoxItem>
      <ListBoxItem
        href="https://react-spectrum.adobe.com/react-aria/"
        target="_blank"
        textValue="React Aria"
      >
        <LifeBuoyIcon />
        React Aria
      </ListBoxItem>
    </ListBox>
  );
}
