import { ScrollArea } from "@/components/ui/scroll-area";

const terms = [
  [
    "1. Acceptance",
    "By creating an account you agree to these terms and to our privacy policy. If you use the service on behalf of a company, you confirm you can bind it to these terms.",
  ],
  [
    "2. Your account",
    "Keep your password secure and tell us right away about any unauthorized use. You're responsible for activity under your account.",
  ],
  [
    "3. Billing",
    "Paid plans renew automatically each month or year. You can cancel at any time; access continues until the end of the current period.",
  ],
  [
    "4. Your content",
    "You own what you upload. You give us permission to host and process it only to run the service for you.",
  ],
  [
    "5. Acceptable use",
    "Don't use the service to break the law, send spam, or interfere with other customers. We may suspend accounts that do.",
  ],
  [
    "6. Termination",
    "You can close your account from settings. We'll keep an export of your data available for 30 days.",
  ],
];

export default function ScrollAreaFade() {
  return (
    // The mask fades everything on the scroll element, so the border lives on a wrapper.
    <div className="w-full max-w-md rounded-lg border bg-card">
      <ScrollArea fade aria-label="Terms of service" className="h-60">
        <div className="flex flex-col gap-4 p-4 text-sm leading-relaxed">
          {terms.map(([title, body]) => (
            <section key={title}>
              <h4 className="font-medium">{title}</h4>
              <p className="mt-1 text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
