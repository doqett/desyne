import { Step, Steps } from "fumadocs-ui/components/steps";
import Link from "next/link";
import {
  getRegistryItem,
  getRegistryItems,
  readRepoFile,
} from "@/lib/registry";
import { ThemeInstallHint } from "./design/theme-install-hint";
import { DocsCode } from "./docs/code-block";
import { Tab, Tabs } from "./docs/mdx-parts";
import { PmCommand } from "./docs/pm-command";

const NS = "@desyne/";

function StepTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-medium text-fd-foreground">{children}</p>;
}

/** CLI + manual installation for a registry item, generated from registry.json. */
export function InstallTabs({ name }: { name: string }) {
  const item = getRegistryItem(name);
  if (!item) throw new Error(`Unknown registry item "${name}"`);
  const pages = new Set(
    getRegistryItems()
      .filter((i) => i.type === "registry:ui")
      .map((i) => i.name),
  );
  const deps = item.dependencies ?? [];
  const regDeps = (item.registryDependencies ?? [])
    .filter((d) => d.startsWith(NS))
    .map((d) => d.slice(NS.length));
  const file = item.files[0];
  const target = file.target ?? `components/ui/${file.path.split("/").pop()}`;
  const hasCss = Boolean(item.css || item.cssVars);

  return (
    <Tabs items={["CLI", "Manual"]}>
      <Tab value="CLI">
        <PmCommand args={`shadcn@latest add ${NS}${name}`} />
        <p className="mt-3 text-fd-muted-foreground text-sm">
          The CLI installs dependencies and any other components this one uses.
        </p>
        <ThemeInstallHint className="mt-3" />
      </Tab>
      <Tab value="Manual">
        <Steps>
          {deps.length > 0 && (
            <Step>
              <StepTitle>Install the dependencies</StepTitle>
              <PmCommand kind="add" args={deps.join(" ")} />
            </Step>
          )}
          {regDeps.length > 0 && (
            <Step>
              <StepTitle>Add the components it builds on</StepTitle>
              <p className="flex flex-wrap gap-1.5 text-sm">
                {regDeps.map((dep) =>
                  pages.has(dep) ? (
                    <Link
                      key={dep}
                      href={`/docs/components/${dep}`}
                      className="rounded-md border px-2 py-0.5 font-mono text-xs no-underline hover:bg-fd-accent"
                    >
                      {dep}
                    </Link>
                  ) : (
                    <code
                      key={dep}
                      className="rounded-md border px-2 py-0.5 text-xs"
                    >
                      {dep === "primitive" ? "lib/primitive" : dep}
                    </code>
                  ),
                )}
              </p>
            </Step>
          )}
          <Step>
            <StepTitle>
              Copy the source into <code>{target}</code>
            </StepTitle>
            <DocsCode
              lang="tsx"
              title={target}
              code={readRepoFile(file.path)}
              viewportClassName="max-h-96"
            />
          </Step>
          {hasCss && (
            <Step>
              <StepTitle>Add the CSS it needs</StepTitle>
              <p className="text-fd-muted-foreground text-sm">
                Add the variables and keyframes from this item&apos;s{" "}
                <code>cssVars</code> / <code>css</code> entries in the registry
                to your global CSS.
              </p>
            </Step>
          )}
          <Step>
            <StepTitle>Update the import paths to match your project</StepTitle>
          </Step>
        </Steps>
      </Tab>
    </Tabs>
  );
}
