import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

/** Compact description list used as the component grid thumbnail. */
export default function DescriptionListThumb() {
  return (
    <DescriptionList divided className="w-full max-w-xs">
      <DescriptionTerm>Invoice</DescriptionTerm>
      <DescriptionDetails className="font-mono text-[0.8125rem]">
        INV-2041
      </DescriptionDetails>
      <DescriptionTerm>Due</DescriptionTerm>
      <DescriptionDetails>Oct 31, 2026</DescriptionDetails>
      <DescriptionTerm>Amount</DescriptionTerm>
      <DescriptionDetails className="font-medium tabular-nums">
        $4,280.00
      </DescriptionDetails>
    </DescriptionList>
  );
}
