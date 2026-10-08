import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

export default function DescriptionListDemo() {
  return (
    <DescriptionList divided className="w-full max-w-lg">
      <DescriptionTerm>Customer</DescriptionTerm>
      <DescriptionDetails>Harbor & Pine Studio</DescriptionDetails>
      <DescriptionTerm>Invoice</DescriptionTerm>
      <DescriptionDetails className="font-mono text-[0.8125rem]">
        INV-2041
      </DescriptionDetails>
      <DescriptionTerm>Issued</DescriptionTerm>
      <DescriptionDetails>October 1, 2026</DescriptionDetails>
      <DescriptionTerm>Due</DescriptionTerm>
      <DescriptionDetails>October 31, 2026 · Net 30</DescriptionDetails>
      <DescriptionTerm>Amount</DescriptionTerm>
      <DescriptionDetails className="font-medium tabular-nums">
        $4,280.00
      </DescriptionDetails>
    </DescriptionList>
  );
}
