"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastUpdate() {
  async function sync() {
    const id = toast.loading("Syncing contacts…");
    await new Promise((r) => setTimeout(r, 1200));
    toast.loading("Merging duplicates…", { id });
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Contacts synced", {
      id,
      description: "342 contacts imported, 12 duplicates merged.",
    });
  }

  return (
    <Button variant="outline" onPress={sync}>
      Sync contacts
    </Button>
  );
}
