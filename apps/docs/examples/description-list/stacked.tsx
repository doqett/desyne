import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

export default function DescriptionListStacked() {
  return (
    <DescriptionList layout="stacked" className="w-full max-w-xs">
      <DescriptionTerm>Shipping address</DescriptionTerm>
      <DescriptionDetails>
        Rosa Delgado
        <br />
        218 Kent Avenue, Apt 4B
        <br />
        Brooklyn, NY 11249
      </DescriptionDetails>
      <DescriptionTerm>Delivery method</DescriptionTerm>
      <DescriptionDetails>Express · 1–2 business days</DescriptionDetails>
      <DescriptionTerm>Payment</DescriptionTerm>
      <DescriptionDetails>Mastercard ending 8812</DescriptionDetails>
    </DescriptionList>
  );
}
