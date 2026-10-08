import { Code, Heading, Lead, Small, Text } from "@/components/ui/typography";

export default function TypographyDemo() {
  return (
    <article className="flex w-full max-w-xl flex-col gap-4">
      <Small className="font-medium text-brand uppercase tracking-wider">
        Engineering
      </Small>
      <Heading level={1}>Shipping a design system people actually use</Heading>
      <Lead>
        Components are the easy part. Adoption comes from docs, defaults and a
        migration path that respects the code teams already have.
      </Lead>
      <Text tone="subtle">
        We started by auditing every button in the product and found 41
        variations. Six months later there are three, all imported from{" "}
        <Code>@/components/ui/button</Code>, and nobody had to stop shipping to
        get there.
      </Text>
      <Small>Maya Chen · 6 min read · Updated March 12</Small>
    </article>
  );
}
