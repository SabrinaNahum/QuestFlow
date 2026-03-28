import { AppShell } from "@/components/app-shell";
import { DiscoverPage } from "@/components/discover-page";

export default function HomePage() {
  return (
    <AppShell activePath="/">
      <DiscoverPage />
    </AppShell>
  );
}
