import { Example } from "@/examples/__index__";
import { exampleSources } from "@/examples/__sources__";
import { DocsCode } from "./docs/code-block";
import { PreviewTabs } from "./preview-tabs";

interface ComponentPreviewProps {
  /** Example key, e.g. "button/demo" → examples/button/demo.tsx */
  name: string;
  className?: string;
  align?: "center" | "start";
}

export async function ComponentPreview({
  name,
  className,
  align,
}: ComponentPreviewProps) {
  const source = exampleSources[name];
  if (source === undefined)
    throw new Error(`Unknown example "${name}". Add examples/${name}.tsx.`);
  return (
    <PreviewTabs
      preview={<Example name={name} />}
      source={source}
      filename={`${name.split("/").pop()}.tsx`}
      align={align}
      className={className}
      code={
        <DocsCode
          lang="tsx"
          code={source}
          bare
          viewportClassName="max-h-[32rem]"
        />
      }
    />
  );
}
