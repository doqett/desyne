"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "@/components/ui/link";

export default function AlertRichContent() {
  return (
    <Alert color="danger" showIcon className="max-w-md">
      <AlertTitle>We couldn't import 3 rows</AlertTitle>
      <AlertDescription>
        <ul className="list-disc space-y-0.5 pl-4">
          <li>Row 14: “email” is not a valid address.</li>
          <li>Row 27: “plan” must be Free, Pro or Team.</li>
          <li>Row 31: “seats” must be a whole number.</li>
        </ul>
        <p className="mt-2">
          Fix the file and upload it again, or{" "}
          <Link href="#" className="text-sm">
            download an error report
          </Link>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
}
