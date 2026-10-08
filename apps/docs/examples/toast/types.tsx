"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onPress={() => toast("Draft saved")}>
        Default
      </Button>
      <Button variant="outline" onPress={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.info("A new version is available")}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.warning("You're using 92% of your storage")}
      >
        Warning
      </Button>
      <Button variant="outline" onPress={() => toast.error("Payment failed")}>
        Error
      </Button>
    </div>
  );
}
