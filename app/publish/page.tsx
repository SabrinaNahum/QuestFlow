import { AppShell } from "@/components/app-shell";
import { PublishForm } from "@/components/publish-form";

export default function PublishPage() {
  return (
    <AppShell activePath="/publish">
      <div className="pb-10 pt-6">
        <div className="mb-4">
          <p className="text-sm text-white/55">Launch a new incentive</p>
          <h2 className="mt-1 text-3xl font-semibold">Publish</h2>
        </div>
        <PublishForm />
      </div>
    </AppShell>
  );
}
