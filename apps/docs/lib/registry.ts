import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

/** Repo root (docs runs with cwd = apps/docs). */
export const repoRoot = resolve(process.cwd(), "../..");

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; type: string; target?: string }[];
  cssVars?: Record<string, Record<string, string>>;
  css?: Record<string, unknown>;
}

let cache: RegistryItem[] | undefined;

export function getRegistryItems(): RegistryItem[] {
  cache ??= JSON.parse(
    readFileSync(join(repoRoot, "registry.json"), "utf8"),
  ).items;
  return cache ?? [];
}

export function getRegistryItem(name: string) {
  return getRegistryItems().find((item) => item.name === name);
}

export function readRepoFile(path: string) {
  return readFileSync(join(repoRoot, path), "utf8");
}
