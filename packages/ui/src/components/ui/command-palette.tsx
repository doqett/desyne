"use client";

import { SearchIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Autocomplete,
  Dialog,
  Input,
  Menu,
  type MenuProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
  SearchField,
  useFilter,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { overlayStyles } from "./dialog";
import { MenuItem, MenuSection, MenuSeparator, MenuShortcut } from "./menu";

export interface CommandPaletteProps<T extends object>
  extends Omit<ModalOverlayProps, "children" | "className">,
    Pick<MenuProps<T>, "items" | "onAction" | "disabledKeys"> {
  children: MenuProps<T>["children"];
  placeholder?: string;
  emptyMessage?: ReactNode;
  className?: string;
  "aria-label"?: string;
  /**
   * Close the palette after a command's action fires. Set `false` to keep it
   * open, e.g. for multi-step commands.
   * @default true
   */
  closeOnAction?: boolean;
}

/**
 * ⌘K-style command menu: a modal with a search input that filters a menu.
 * Control it with `isOpen` / `onOpenChange`, or wrap in `DialogTrigger`.
 */
export function CommandPalette<T extends object>({
  children,
  items,
  onAction,
  disabledKeys,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
  className,
  "aria-label": ariaLabel = "Command palette",
  isDismissable = true,
  closeOnAction = true,
  ...props
}: CommandPaletteProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    <ModalOverlay
      data-slot="command-palette-overlay"
      isDismissable={isDismissable}
      {...props}
      className={cn(
        overlayStyles,
        "flex items-start justify-center p-4 pt-[15vh]",
      )}
    >
      <Modal
        data-slot="command-palette"
        className={cn(
          "w-full max-w-lg overflow-hidden rounded-(--radius-overlay) border-(length:--border-width) bg-popover text-popover-foreground shadow-lg data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:fade-out-0 data-exiting:zoom-out-95 data-entering:animate-in data-exiting:animate-out",
          className,
        )}
      >
        <Dialog aria-label={ariaLabel} className="outline-none">
          {({ close }) => (
            <Autocomplete filter={contains}>
              <SearchField
                aria-label="Search commands"
                autoFocus
                className="flex items-center gap-2 border-b px-3"
              >
                <SearchIcon
                  aria-hidden
                  className="size-4 shrink-0 opacity-50"
                />
                <Input
                  placeholder={placeholder}
                  className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
                />
              </SearchField>
              <Menu
                items={items}
                onAction={(key, value) => {
                  onAction?.(key, value);
                  if (closeOnAction) close();
                }}
                disabledKeys={disabledKeys}
                renderEmptyState={() => (
                  <div className="py-6 text-center text-muted-foreground text-sm">
                    {emptyMessage}
                  </div>
                )}
                className="max-h-80 scroll-py-1 overflow-y-auto p-1 outline-none"
              >
                {children}
              </Menu>
            </Autocomplete>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export {
  MenuItem as CommandItem,
  MenuSection as CommandSection,
  MenuSeparator as CommandSeparator,
  MenuShortcut as CommandShortcut,
};
