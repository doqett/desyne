"use client";

import { SidebarTrigger } from "fumadocs-ui/components/sidebar/base";
import {
  FullSearchTrigger,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { ArrowUpRightIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesignSwitcher } from "@/components/design/design-switcher";
import { useDesignHref } from "@/components/design/use-design-href";
import { Logo } from "@/components/logo";
import { githubUrl, headerLinks } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className={cn("size-4", className)}
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

const iconButton =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40";

/**
 * The docs header. Mirrors the landing header (logo, section links, search,
 * theme, GitHub) and spans the full docs grid, so the two read as one site.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const designHref = useDesignHref();
  return (
    <header
      id="ds-header"
      className="sticky top-0 z-40 h-(--ds-header-height) border-b bg-background/80 backdrop-blur-lg backdrop-saturate-150"
    >
      <div className="mx-auto flex h-full w-full max-w-(--fd-layout-width) items-center gap-4 px-4 md:px-5">
        <Link
          href="/"
          aria-label="Desyne home"
          className="-mx-1 rounded-md px-1 py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <Logo />
        </Link>
        <span aria-hidden className="hidden h-5 w-px bg-border md:block" />
        <nav aria-label="Main" className="hidden h-full items-center md:flex">
          <ul className="flex h-full items-center">
            {headerLinks.map((l, i) => {
              const active = l.match?.(pathname) ?? false;
              return (
                <li
                  key={l.label}
                  className={cn("h-full", i > 1 && "hidden lg:block")}
                >
                  <Link
                    href={designHref(l.href)}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer" : undefined}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-full items-center gap-0.5 px-2.5 text-[0.84rem] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline",
                      active &&
                        "font-medium text-foreground after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand",
                    )}
                  >
                    {l.label}
                    {l.external && (
                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-3 opacity-50"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1.5">
          <FullSearchTrigger
            hideIfDisabled
            className="hidden h-8 w-52 rounded-full bg-muted/50 ps-3 pe-1.5 text-[0.8125rem] hover:bg-muted md:inline-flex lg:w-60 [&_kbd]:rounded-full [&_kbd]:font-mono [&_kbd]:text-[0.7rem]"
          />
          <SearchTrigger
            hideIfDisabled
            className={cn(iconButton, "md:hidden [&_svg]:size-4")}
          />
          <DesignSwitcher className="hidden md:inline-flex" />
          <ThemeSwitch className="hidden md:inline-flex" />
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Desyne on GitHub"
            className={iconButton}
          >
            <GitHubIcon />
          </a>
          <SidebarTrigger className={cn(iconButton, "md:hidden")}>
            <MenuIcon className="size-[1.1rem]" />
          </SidebarTrigger>
        </div>
      </div>
    </header>
  );
}
