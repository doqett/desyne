"use client";

import { CheckIcon, CopyIcon, TerminalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PmCommand } from "@/components/docs/pm-command";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { type Design, designToCss, encodeDesign, fonts } from "@/lib/design";
import { fontImports } from "./font-imports";

/** Install dialog content: shadcn CLI command or the raw CSS. */
export function InstallDialogContent({ design }: { design: Design }) {
  const [origin, setOrigin] = useState("https://desyne.dev");
  useEffect(() => setOrigin(window.location.origin), []);
  const url = `${origin}/r/themes/${encodeDesign(design)}.json`;
  const css = designToCss(design);
  const fontUrl =
    design.font !== "inter" ? fontImports[design.font] : undefined;

  return (
    <DialogContent size="lg">
      <DialogHeader>
        <DialogTitle>Install this theme</DialogTitle>
        <DialogDescription>
          Styles are only tokens, so components you've already installed pick
          the theme up automatically. No reinstall needed.
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultSelectedKey="cli" className="mt-4 min-w-0">
        <TabList aria-label="Install method">
          <Tab id="cli">
            <TerminalIcon /> CLI
          </Tab>
          <Tab id="css">CSS</Tab>
        </TabList>
        <TabPanel id="cli" className="grid min-w-0 gap-3 text-sm">
          <PmCommand args={`shadcn@latest add ${url}`} />
          <p className="text-muted-foreground">
            The shadcn CLI writes the variables into your global CSS:{" "}
            <code className="font-mono text-[0.8em] text-foreground">
              :root
            </code>{" "}
            for light,{" "}
            <code className="font-mono text-[0.8em] text-foreground">
              .dark
            </code>{" "}
            for dark and the font stack into{" "}
            <code className="font-mono text-[0.8em] text-foreground">
              @theme inline
            </code>
            .
            {fontUrl &&
              ` It also adds an @import for ${fonts[design.font].label} from Google Fonts.`}
          </p>
        </TabPanel>
        <TabPanel id="css" className="grid min-w-0 gap-3 text-sm">
          <p className="text-muted-foreground">
            Replace the Desyne variables in your global CSS with these.
            {fontUrl && (
              <>
                {" "}
                Load {fonts[design.font].label} too, e.g. with{" "}
                <code className="font-mono text-[0.8em] text-foreground">
                  next/font
                </code>{" "}
                or the import below.
              </>
            )}
          </p>
          <CodePanel
            title="globals.css"
            code={fontUrl ? `@import url("${fontUrl}");\n\n${css}` : css}
          />
        </TabPanel>
      </Tabs>
    </DialogContent>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="ds-code dark not-prose min-w-0 overflow-hidden rounded-xl border bg-(--ds-code-surface) text-foreground">
      <div className="flex h-10 items-center gap-2 border-b ps-3.5 pe-1.5">
        <span className="font-mono text-[0.75rem] text-muted-foreground">
          {title}
        </span>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy CSS"}
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="ms-auto inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-white/[0.08] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-success" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto px-4 py-3.5 font-mono text-[0.75rem] leading-5 text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
