import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const LANG_LABELS: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  txt: "Text",
  plaintext: "Text",
  text: "Text",
};

export function languageLabel(lang?: string) {
  if (!lang) return "Code";
  return LANG_LABELS[lang] ?? lang;
}

function Caption({ title, lang }: { title?: ReactNode; lang?: string }) {
  const isFile = typeof title === "string" && title.length > 0;
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="truncate">{isFile ? title : languageLabel(lang)}</span>
      {isFile && lang && (
        <span className="rounded-[4px] border border-white/10 px-1 text-[0.625rem] text-white/45 uppercase tracking-wider">
          {lang}
        </span>
      )}
    </span>
  );
}

/**
 * The docs code frame: a dark panel in both themes (like the registry panels
 * on the landing and Pro pages) with a filename / language bar and copy.
 */
export function DocsPre({
  title,
  children,
  className,
  ...props
}: ComponentProps<"pre"> & {
  title?: string;
  icon?: string;
  allowCopy?: boolean | "true" | "false";
  "data-language"?: string;
}) {
  const lang = props["data-language"];
  return (
    <div className="ds-code dark not-prose">
      <CodeBlock
        {...props}
        title={<Caption title={title} lang={lang} />}
        icon={undefined}
        className={cn(className)}
      >
        <Pre>{children}</Pre>
      </CodeBlock>
    </div>
  );
}

/** Server-highlighted block for generated code (previews, install steps). */
export function DocsCode({
  code,
  lang,
  title,
  className,
  viewportClassName,
  bare = false,
}: {
  code: string;
  lang: string;
  title?: string;
  className?: string;
  viewportClassName?: string;
  /** Drop the caption bar (when the parent already has one). */
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        "ds-code dark not-prose",
        bare && "ds-code-bare",
        className,
      )}
    >
      <ServerCodeBlock
        lang={lang}
        code={code}
        codeblock={{
          title: bare ? undefined : <Caption title={title} lang={lang} />,
          allowCopy: !bare,
          viewportProps: viewportClassName
            ? { className: viewportClassName }
            : undefined,
        }}
      />
    </div>
  );
}
