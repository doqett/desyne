import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

export default function DescriptionListSizes() {
  return (
    <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
      <DescriptionList size="sm" divided>
        <DescriptionTerm>Region</DescriptionTerm>
        <DescriptionDetails>eu-west-1</DescriptionDetails>
        <DescriptionTerm>Runtime</DescriptionTerm>
        <DescriptionDetails>Node.js 22</DescriptionDetails>
        <DescriptionTerm>Memory</DescriptionTerm>
        <DescriptionDetails>1024 MB</DescriptionDetails>
      </DescriptionList>
      <DescriptionList size="md" divided>
        <DescriptionTerm>Region</DescriptionTerm>
        <DescriptionDetails>eu-west-1</DescriptionDetails>
        <DescriptionTerm>Runtime</DescriptionTerm>
        <DescriptionDetails>Node.js 22</DescriptionDetails>
        <DescriptionTerm>Memory</DescriptionTerm>
        <DescriptionDetails>1024 MB</DescriptionDetails>
      </DescriptionList>
    </div>
  );
}
