/**
 * Generates registry.json from packages/ui/src/registry.ts.
 * npm dependencies and registry dependencies are inferred from each file's imports.
 * Run: bun run registry:build
 */
import { readFileSync, writeFileSync } from "node:fs";
import { densityKeys, structuralKeys } from "../packages/ui/src/lib/design";
import { blocks, components, libs } from "../packages/ui/src/registry";

const NS = "@desyne";
const UI = "packages/ui/src";
const IGNORE = new Set(["react", "react-dom"]);

/** Structural tokens ship with `primitive` (its cssVars); components that read them depend on it. */
const TOKEN_RE = new RegExp(
  `--(${[...structuralKeys, ...densityKeys].join("|")})\\b`,
);

function analyze(path: string) {
  const src = readFileSync(path, "utf8");
  const deps = new Set<string>();
  const reg = new Set<string>();
  if (path.includes("/components/ui/") && TOKEN_RE.test(src))
    reg.add(`${NS}/primitive`);
  for (const [, spec] of src.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (spec.startsWith("./"))
      reg.add(`${NS}/${spec.slice(2).replace(/\.tsx?$/, "")}`);
    else if (spec.startsWith("@/components/ui/"))
      reg.add(`${NS}/${spec.split("/").pop()}`);
    else if (spec === "@/lib/utils") reg.add("utils");
    else if (spec.startsWith("@/lib/"))
      reg.add(`${NS}/${spec.split("/").pop()}`);
    else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
      const pkg = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0];
      if (!IGNORE.has(pkg)) deps.add(pkg);
    }
  }
  return {
    ...(deps.size ? { dependencies: [...deps].sort() } : {}),
    ...(reg.size ? { registryDependencies: [...reg].sort() } : {}),
  };
}

const items = [
  ...libs.map((l) => ({
    name: l.name,
    type: "registry:lib",
    title: l.name,
    description: l.description,
    ...analyze(`${UI}/${l.file}`),
    files: [{ path: `${UI}/${l.file}`, type: "registry:lib" }],
    ...l.extra,
  })),
  ...components.map((c) => {
    const path = `${UI}/components/ui/${c.name}.tsx`;
    return {
      name: c.name,
      type: "registry:ui",
      title: c.title,
      description: c.description,
      categories: [c.category.toLowerCase()],
      ...analyze(path),
      files: [{ path, type: "registry:ui" }],
      ...c.extra,
    };
  }),
  ...blocks.map((b) => ({
    name: b.name,
    type: "registry:block",
    title: b.title,
    description: b.description,
    ...analyze(b.file),
    files: [{ path: b.file, type: "registry:page", target: b.target }],
  })),
];

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "desyne",
  homepage: "https://desyne.dev",
  items,
};

writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
console.log(`registry.json: ${items.length} items`);
