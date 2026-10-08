import { Prose } from "@/components/ui/typography";

export default function TypographyProse() {
  return (
    <Prose className="w-full max-w-prose">
      <h1>Migrating to the new billing API</h1>
      <p>
        The v2 billing API replaces per-seat line items with{" "}
        <strong>usage records</strong>. Existing subscriptions keep working
        until <a href="#timeline">June 30</a>, but new features only ship on v2.
      </p>
      <h2 id="timeline">Timeline</h2>
      <ol>
        <li>
          <strong>Now:</strong> v2 is available behind the{" "}
          <code>billing_v2</code> flag.
        </li>
        <li>
          <strong>April 15:</strong> new workspaces default to v2.
        </li>
        <li>
          <strong>June 30:</strong> v1 endpoints return <code>410 Gone</code>.
        </li>
      </ol>
      <h2>Updating your client</h2>
      <p>Swap the subscription item call for a usage record:</p>
      <pre>
        <code>{`await billing.usage.create({
  subscription: "sub_42",
  quantity: seats.length,
  timestamp: Date.now(),
});`}</code>
      </pre>
      <blockquote>
        <p>
          Usage records are idempotent per timestamp, so retries never double
          charge.
        </p>
      </blockquote>
      <h3>Field changes</h3>
      <table>
        <thead>
          <tr>
            <th>v1 field</th>
            <th>v2 field</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>seats</code>
            </td>
            <td>
              <code>quantity</code>
            </td>
            <td>Now reported, not set.</td>
          </tr>
          <tr>
            <td>
              <code>plan</code>
            </td>
            <td>
              <code>price</code>
            </td>
            <td>Prices are versioned.</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>Webhooks keep the same signatures.</li>
        <li>
          Invoices show usage per day.
          <ul>
            <li>Totals are unchanged.</li>
          </ul>
        </li>
      </ul>
      <hr />
      <p>
        Questions? Reply to the migration email or open a ticket from{" "}
        <a href="#support">Settings → Support</a>.
      </p>
    </Prose>
  );
}
