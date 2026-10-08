"use client";

import { PanelLeftIcon } from "lucide-react";
import * as React from "react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  Dialog,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { overlayStyles } from "./dialog";
import { Separator } from "./separator";
import { sheetVariants } from "./sheet";
import { Tooltip, TooltipTrigger } from "./tooltip";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_SHORTCUT = "b";
const MOBILE_QUERY = "(max-width: 767px)";

type Collapsible = "offcanvas" | "icon" | "none";

interface SidebarContextValue {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a <SidebarProvider />");
  return context;
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (openProp === undefined) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [openProp, onOpenChange],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((o) => !o);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: Collapsible;
  /**
   * Close the mobile sheet when a link inside it is pressed (any `<a href>`,
   * including `SidebarMenuButton` links and menu items with `href`). Clicks that
   * open a new tab or window (modifier keys, `target="_blank"`, `download`) keep it open.
   * @default true
   */
  closeOnNavigate?: boolean;
}

function isSameTabNavigation(event: React.MouseEvent) {
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return false;
  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!anchor) return false;
  const target = anchor.getAttribute("target");
  if (target && target !== "_self") return false;
  return !anchor.hasAttribute("download");
}

/**
 * Tip: to render a sidebar inside a bounded box (e.g. a preview), give an ancestor
 * `data-sidebar-contained` and `relative` — the sidebar then uses absolute positioning.
 */
export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  closeOnNavigate = true,
  className,
  style,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <ModalOverlay
        isDismissable
        isOpen={openMobile}
        onOpenChange={setOpenMobile}
        className={overlayStyles}
      >
        <Modal
          data-slot="sidebar"
          data-mobile="true"
          data-side={side}
          className={sheetVariants({
            side,
            className: cn(
              "w-(--sidebar-width) gap-0 bg-sidebar p-0 text-sidebar-foreground sm:max-w-none",
              className,
            ),
          })}
          style={style}
        >
          <Dialog
            aria-label="Sidebar"
            className="flex h-full w-full flex-col outline-none"
            // Capture phase: React Aria links stop the click from bubbling.
            onClickCapture={(event) => {
              if (closeOnNavigate && isSameTabNavigation(event))
                setOpenMobile(false);
            }}
          >
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* Reserves space in the layout. */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          "in-data-sidebar-contained:absolute in-data-sidebar-contained:h-full",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        style={style}
        {...props}
      >
        <div
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onPress,
  children,
  ...props
}: ButtonProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle sidebar"
      className={className}
      onPress={(e) => {
        onPress?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelLeftIcon aria-hidden />}
    </Button>
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full min-w-0 flex-1 flex-col bg-background",
        // Inset variant: matched through the wrapper, so it works whether the sidebar comes before or after (side="right").
        "md:group-has-[[data-slot=sidebar][data-variant=inset]]/sidebar-wrapper:m-2 md:group-has-[[data-slot=sidebar][data-variant=inset]]/sidebar-wrapper:rounded-xl md:group-has-[[data-slot=sidebar][data-variant=inset]]/sidebar-wrapper:border md:group-has-[[data-slot=sidebar][data-variant=inset]]/sidebar-wrapper:border-sidebar-border md:group-has-[[data-slot=sidebar][data-variant=inset]]/sidebar-wrapper:shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
        "md:group-has-[[data-slot=sidebar][data-variant=inset][data-side=left][data-state=expanded]]/sidebar-wrapper:ml-0 md:group-has-[[data-slot=sidebar][data-variant=inset][data-side=right][data-state=expanded]]/sidebar-wrapper:mr-0",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-[0.7rem] text-sidebar-foreground/60 uppercase tracking-wide outline-hidden transition-[margin,opacity] duration-200 ease-linear",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 [&>svg]:size-4 [&>svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

export const sidebarMenuButtonVariants = tv({
  base: [
    "peer/menu-button flex w-full cursor-default items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]",
    "text-sidebar-foreground/80 data-hovered:bg-sidebar-foreground/5 data-hovered:text-sidebar-foreground data-pressed:bg-sidebar-foreground/10 data-focus-visible:ring-2",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:shadow-[0_1px_2px_rgb(0_0_0/0.06)] data-[active=true]:ring-1 data-[active=true]:ring-sidebar-border data-[active=true]:text-sidebar-accent-foreground data-[active=true]:[&>svg]:text-sidebar-primary",
    "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  ],
  variants: {
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
    },
  },
  defaultVariants: { size: "default" },
});

type MenuButtonBase = VariantProps<typeof sidebarMenuButtonVariants> & {
  isActive?: boolean;
  /** Shown as a tooltip when the sidebar is collapsed to icons. */
  tooltip?: string;
  className?: string;
};

export type SidebarMenuButtonProps =
  | (MenuButtonBase & Omit<LinkPrimitiveProps, "className"> & { href: string })
  | (MenuButtonBase &
      Omit<ButtonPrimitiveProps, "className"> & { href?: undefined });

export function SidebarMenuButton({
  isActive = false,
  tooltip,
  size,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const shared = {
    "data-slot": "sidebar-menu-button",
    "data-active": isActive,
    className: sidebarMenuButtonVariants({ size, className }),
  };
  const element =
    props.href !== undefined ? (
      <LinkPrimitive
        {...shared}
        aria-current={isActive ? "page" : undefined}
        {...(props as LinkPrimitiveProps)}
      />
    ) : (
      <ButtonPrimitive {...shared} {...(props as ButtonPrimitiveProps)} />
    );
  if (!tooltip) return element;
  return (
    <TooltipTrigger isDisabled={state !== "collapsed" || isMobile}>
      {element}
      <Tooltip placement="right">{tooltip}</Tooltip>
    </TooltipTrigger>
  );
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn(
        "pointer-events-none absolute top-1.5 right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
