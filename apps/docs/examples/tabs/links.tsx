"use client";

import { useState } from "react";
import { RouterProvider } from "react-aria-components";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const routes = [
  { href: "#overview", label: "Overview" },
  { href: "#activity", label: "Activity" },
  { href: "#members", label: "Members" },
];

export default function TabsLinks() {
  // Stand-in for your router. In Next.js use `useRouter().push` and `usePathname()`.
  const [pathname, setPathname] = useState("#overview");

  return (
    <RouterProvider navigate={setPathname}>
      <Tabs selectedKey={pathname} className="w-full max-w-md">
        <TabList aria-label="Team">
          {routes.map((r) => (
            <Tab key={r.href} id={r.href} href={r.href}>
              {r.label}
            </Tab>
          ))}
        </TabList>
        {routes.map((r) => (
          <TabPanel key={r.href} id={r.href} className="text-muted-foreground">
            Rendered for <code className="text-foreground">{r.href}</code>.
          </TabPanel>
        ))}
      </Tabs>
    </RouterProvider>
  );
}
