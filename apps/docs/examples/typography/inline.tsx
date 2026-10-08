import { Code, Small, Text } from "@/components/ui/typography";

export default function TypographyInline() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Text>
        Run <Code>npx shadcn@latest add @desyne/typography</Code>, then import{" "}
        <Code>Heading</Code> and <Code>Text</Code> wherever you'd reach for a
        raw <Code>&lt;h2&gt;</Code> or <Code>&lt;p&gt;</Code>. Press{" "}
        <kbd className="rounded-sm border bg-muted px-1 font-mono text-[0.8em]">
          ⌘K
        </kbd>{" "}
        to search the docs.
      </Text>
      <Text size="sm" tone="muted">
        Prices exclude VAT.{" "}
        <Text as="strong" size="sm" weight="semibold" tone="default">
          Annual plans save 20%.
        </Text>
      </Text>
      <Small>
        © 2026 Wrenly Inc. Wrenly is a registered trademark. Terms apply.
      </Small>
    </div>
  );
}
