import { CopyIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list";

export default function DescriptionListRecipeDetailCard() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader separator>
        <CardTitle>Deployment dpl_8fK2a</CardTitle>
        <CardDescription>
          Production · triggered by a push to main
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DescriptionList divided size="sm">
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge size="sm" variant="dot" color="success">
              Ready
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Commit</DescriptionTerm>
          <DescriptionDetails className="flex items-center gap-1.5">
            <code className="font-mono text-xs">a41c9e2</code>
            <span className="truncate text-muted-foreground">
              Fix timezone offset in invoice dates
            </span>
          </DescriptionDetails>
          <DescriptionTerm>Domain</DescriptionTerm>
          <DescriptionDetails className="flex items-center gap-1.5">
            app.harborpine.co
            <CopyIcon aria-hidden className="size-3.5 text-muted-foreground" />
          </DescriptionDetails>
          <DescriptionTerm>Build time</DescriptionTerm>
          <DescriptionDetails className="tabular-nums">48s</DescriptionDetails>
          <DescriptionTerm>Created</DescriptionTerm>
          <DescriptionDetails>Oct 4, 2026 at 10:12 AM</DescriptionDetails>
        </DescriptionList>
      </CardContent>
    </Card>
  );
}
