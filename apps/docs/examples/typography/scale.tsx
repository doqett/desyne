import { Heading, Text } from "@/components/ui/typography";

const sizes = [
  ["display", "48px / 1.05", "Hero titles, marketing"],
  ["xl", "36px / 1.25", "Page titles (h1)"],
  ["lg", "24px / 1.375", "Section titles (h2)"],
  ["md", "20px / 1.375", "Card and subsection titles (h3)"],
  ["sm", "18px / 1.375", "Small groups (h4)"],
  ["xs", "16px / 1.5", "Inline headings (h5, h6)"],
] as const;

export default function TypographyScale() {
  return (
    <div className="flex w-full max-w-2xl flex-col divide-y">
      {sizes.map(([size, metrics, use]) => (
        <div
          key={size}
          className="grid items-baseline gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
        >
          <div className="flex flex-col">
            <Text as="span" size="sm" weight="medium">
              {size}
            </Text>
            <Text as="span" size="xs" tone="muted" className="tabular-nums">
              {metrics}
            </Text>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <Heading level={3} size={size} className="truncate">
              Quarterly planning
            </Heading>
            <Text as="span" size="xs" tone="muted">
              {use}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
