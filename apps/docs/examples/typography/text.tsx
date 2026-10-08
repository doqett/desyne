import { Text } from "@/components/ui/typography";

export default function TypographyText() {
  return (
    <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <Text
          size="xs"
          tone="muted"
          weight="medium"
          className="uppercase tracking-wider"
        >
          Sizes
        </Text>
        <Text size="lg">lg — Intro copy and roomy layouts.</Text>
        <Text size="md">md — The default for reading.</Text>
        <Text size="sm">sm — Dense UI, cards and tables.</Text>
        <Text size="xs">xs — Captions and footnotes.</Text>
      </div>
      <div className="flex flex-col gap-3">
        <Text
          size="xs"
          tone="muted"
          weight="medium"
          className="uppercase tracking-wider"
        >
          Tones
        </Text>
        <Text>default — Primary reading color.</Text>
        <Text tone="subtle">subtle — Softer body copy.</Text>
        <Text tone="muted">muted — Metadata and helper text.</Text>
        <Text tone="brand" weight="medium">
          brand — Emphasis that matches links.
        </Text>
        <Text tone="danger" weight="medium">
          danger — Something went wrong.
        </Text>
        <Text tone="success" weight="medium">
          success — Saved and synced.
        </Text>
      </div>
    </div>
  );
}
