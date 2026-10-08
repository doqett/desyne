"use client";

import { BookOpenIcon } from "lucide-react";
import { SearchField } from "@/components/ui/search-field";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "Getting started",
    pages: ["Introduction", "Installation", "Theming", "Dark mode"],
  },
  {
    label: "Components",
    pages: ["Button", "Dialog", "Select", "Sidebar", "Tabs", "Tooltip"],
  },
  { label: "Guides", pages: ["Forms", "Routing", "Server components"] },
];

export default function SidebarRecipeDocs() {
  return (
    <div
      data-sidebar-contained
      className="relative h-[480px] w-full overflow-hidden rounded-lg border"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar>
          <SidebarHeader className="gap-3">
            <div className="flex items-center gap-2 px-2 pt-1 font-semibold text-sm">
              <BookOpenIcon className="size-4" /> Acme Docs
            </div>
            <SearchField aria-label="Search docs" size="sm" shortcut="⌘K" />
          </SidebarHeader>
          <SidebarContent>
            {sections.map((section) => (
              <SidebarGroup key={section.label} className="py-1">
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarMenu className="gap-0.5">
                  {section.pages.map((page) => (
                    <SidebarMenuItem key={page}>
                      <SidebarMenuButton
                        size="sm"
                        href="#"
                        isActive={page === "Sidebar"}
                      >
                        <span>{page}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="text-muted-foreground text-sm">Components</span>
          </header>
          <article className="grid content-start gap-2 p-6">
            <h2 className="font-semibold text-xl tracking-tight">Sidebar</h2>
            <p className="max-w-prose text-muted-foreground text-sm">
              A collapsible app sidebar. The navigation scrolls on its own while
              the header with search stays in place.
            </p>
          </article>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
