"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="soft" color="info" showIcon>
        <AlertTitle>Soft</AlertTitle>
        <AlertDescription>
          The default. A tinted surface for most in-page messages.
        </AlertDescription>
      </Alert>
      <Alert variant="outline" color="info" showIcon>
        <AlertTitle>Outline</AlertTitle>
        <AlertDescription>
          A card surface where only the icon carries the color.
        </AlertDescription>
      </Alert>
      <Alert variant="accent" color="info" showIcon>
        <AlertTitle>Accent</AlertTitle>
        <AlertDescription>
          A colored bar on the leading edge, for dense or neutral layouts.
        </AlertDescription>
      </Alert>
      <Alert variant="solid" color="info" showIcon>
        <AlertTitle>Solid</AlertTitle>
        <AlertDescription>
          Full color, for banners and messages that must stand out.
        </AlertDescription>
      </Alert>
    </div>
  );
}
