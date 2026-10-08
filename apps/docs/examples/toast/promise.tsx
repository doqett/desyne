"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

function deploy(shouldFail: boolean) {
  return new Promise<{ url: string }>((resolve, reject) =>
    setTimeout(
      () =>
        shouldFail
          ? reject(new Error("Build exited with code 1"))
          : resolve({ url: "acme-web.vercel.app" }),
      2000,
    ),
  );
}

export default function ToastPromise() {
  const run = (shouldFail: boolean) =>
    toast.promise(deploy(shouldFail), {
      loading: "Deploying acme-web…",
      success: (data) => `Deployed to ${data.url}`,
      error: (err: Error) => `Deploy failed: ${err.message}`,
    });

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onPress={() => run(false)}>
        Deploy
      </Button>
      <Button variant="outline" onPress={() => run(true)}>
        Deploy (fails)
      </Button>
    </div>
  );
}
