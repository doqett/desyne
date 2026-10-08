import { examples } from "@/examples/__index__";
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
  const example = examples[name];
  if (!example)
    throw new Error(`Unknown example "${name}". Add examples/${name}.tsx.`);
  const Example = example.component;
  return (
    <PreviewTabs
      preview={<Example />}
      source={example.source}
      filename={`${name.split("/").pop()}.tsx`}
      align={align}
      className={className}
      code={
        <DocsCode
          lang="tsx"
          code={example.source}
          bare
          viewportClassName="max-h-[32rem]"
        />
      }
    />
  );
}
