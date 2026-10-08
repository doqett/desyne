"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const files = [
  {
    id: "page",
    name: "page.tsx",
    code: "export default function Page() {\n  return <h1>Hello, world</h1>;\n}",
  },
  {
    id: "layout",
    name: "layout.tsx",
    code: 'export default function Layout({ children }) {\n  return <html lang="en"><body>{children}</body></html>;\n}',
  },
  {
    id: "css",
    name: "globals.css",
    code: '@import "tailwindcss";\n\nbody {\n  font-family: var(--font-sans);\n}',
  },
];

export default function TabsEnclosed() {
  return (
    <Tabs variant="enclosed" className="w-full max-w-md gap-0">
      <TabList aria-label="Open files">
        {files.map((f) => (
          <Tab key={f.id} id={f.id} className="font-mono text-xs">
            {f.name}
          </Tab>
        ))}
      </TabList>
      {files.map((f) => (
        <TabPanel
          key={f.id}
          id={f.id}
          className="rounded-t-none border border-t-0 bg-background p-4"
        >
          <pre className="overflow-x-auto font-mono text-foreground text-xs leading-relaxed">
            {f.code}
          </pre>
        </TabPanel>
      ))}
    </Tabs>
  );
}
