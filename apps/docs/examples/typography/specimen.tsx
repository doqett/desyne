import { Code, Heading, Small, Text } from "@/components/ui/typography";

/** Compact type specimen (used as the component grid thumbnail). */
export default function TypographySpecimen() {
  return (
    <div className="flex w-full max-w-sm items-center gap-6">
      <span
        aria-hidden
        className="font-semibold text-7xl leading-none tracking-tight"
      >
        Aa
      </span>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Small className="font-medium text-brand uppercase tracking-wider">
          Inter · 6 sizes
        </Small>
        <Heading level={3} size="md">
          Display and headings
        </Heading>
        <Text size="sm" tone="muted">
          Body, lead and <Code>code</Code> styles
        </Text>
      </div>
    </div>
  );
}
