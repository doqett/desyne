/**
 * Marks a component page's external links (React Aria docs, library docs,
 * source). The page header reads these props from the MDX and renders them
 * as pills next to the page actions, so the tag itself renders nothing.
 */
export function ComponentLinks(_props: {
  /** React Aria doc page, e.g. "Button" */
  aria?: string;
  /** External library docs */
  docs?: { label: string; href: string };
  /** Registry name, links to the source file */
  source: string;
}) {
  return null;
}
