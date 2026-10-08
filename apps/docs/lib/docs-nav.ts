import { gitConfig } from "./shared";
import { proUrl } from "./site";

export type HeaderLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Path prefixes that mark this link as the current section. */
  match?: (pathname: string) => boolean;
};

const isComponents = (p: string) => p.startsWith("/docs/components");

/** Primary links in the site header, shared by the docs and its drawer. */
export const headerLinks: HeaderLink[] = [
  {
    label: "Docs",
    href: "/docs",
    match: (p) => p.startsWith("/docs") && !isComponents(p),
  },
  { label: "Components", href: "/docs/components", match: isComponents },
  {
    label: "Themes",
    href: "/themes",
    match: (p) => p.startsWith("/themes"),
  },
  { label: "Showcase", href: "/showcase" },
  { label: "Changelog", href: "/changelog" },
  { label: "Pro", href: proUrl, external: true },
  { label: "Pricing", href: `${proUrl}/pricing`, external: true },
];

export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/** Components added in the latest release; the sidebar marks them "New". */
export const newComponents = new Set([
  "form",
  "typography",
  "toolbar",
  "tree",
  "stepper",
  "rating",
  "timeline",
  "description-list",
  "progress-circle",
  "empty",
  "input-group",
  "scroll-area",
]);

export function isNewPage(url: string) {
  const m = url.match(/^\/docs\/components\/([^/]+)$/);
  return m ? newComponents.has(m[1]) : false;
}
