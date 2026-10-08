import { Blockquote, Heading, List } from "@/components/ui/typography";

export default function TypographyQuoteAndList() {
  return (
    <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <Heading level={3} size="xs">
          Before you launch
        </Heading>
        <List ordered>
          <li>Point your domain at the new deploy.</li>
          <li>Invite your team and assign roles.</li>
          <li>Turn on two-factor authentication.</li>
        </List>
        <Heading level={3} size="xs" className="mt-2">
          Included in Pro
        </Heading>
        <List spacing="sm">
          <li>Unlimited projects</li>
          <li>Audit log with 1-year retention</li>
          <li>SAML single sign-on</li>
        </List>
      </div>
      <Blockquote attribution="Priya Raman, Head of Design at Northwind">
        We replaced three internal libraries with one. New hires ship their
        first screen in a day instead of a week.
      </Blockquote>
    </div>
  );
}
