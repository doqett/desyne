import { Step, Steps } from "fumadocs-ui/components/steps";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentGrid } from "./component-grid";
import { ComponentLinks } from "./component-links";
import { ComponentPreview } from "./component-preview";
import { DocsPre } from "./docs/code-block";
import {
  Callout,
  Card,
  Cards,
  createHeading,
  Tab,
  Tabs,
  TypeTable,
} from "./docs/mdx-parts";
import { InstallTabs } from "./install-tabs";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: DocsPre,
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    Callout,
    Card,
    Cards,
    ComponentPreview,
    ComponentGrid,
    ComponentLinks,
    InstallTabs,
    TypeTable,
    Tabs,
    Tab,
    Steps,
    Step,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
