import { Heading, Text } from "@/components/ui/typography";

export default function TypographyLevels() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      <section className="flex flex-col gap-2 rounded-xl border bg-card p-5">
        {/* An h2 in the outline, sized for a compact card. */}
        <Heading level={2} size="sm">
          Billing
        </Heading>
        <Text size="sm" tone="muted">
          Rendered as <code>&lt;h2&gt;</code> with the <code>sm</code> size, so
          the card stays compact without skipping a level in the outline.
        </Text>
      </section>
      <section className="flex flex-col gap-2 rounded-xl border bg-card p-5">
        <Heading level={3} size="display" className="text-brand">
          99.98%
        </Heading>
        <Text size="sm" tone="muted">
          Rendered as <code>&lt;h3&gt;</code> with the <code>display</code>{" "}
          size: a big number that's still a small heading.
        </Text>
      </section>
    </div>
  );
}
