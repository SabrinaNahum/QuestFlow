import { AppShell } from "@/components/app-shell";
import { ProfilePage } from "@/components/profile-page";

export default function ProfileRoute() {
  return (
    <AppShell activePath="/profile">
      <ProfilePage />
    </AppShell>
  );
}
