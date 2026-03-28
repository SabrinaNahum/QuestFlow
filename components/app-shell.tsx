import type { ReactNode } from "react";
import Link from "next/link";
import { Compass, PlusSquare, UserRound } from "lucide-react";

import { WalletButton } from "@/components/wallet-button";

const navItems = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/publish", label: "Publish", icon: PlusSquare },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function AppShell({
  children,
  activePath
}: {
  children: ReactNode;
  activePath: string;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-28 pt-4 sm:px-6">
      <header className="glass-panel gradient-stroke sticky top-4 z-20 rounded-[28px] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent via-primary to-success shadow-glow">
              <span className="text-lg font-semibold text-white">QF</span>
            </div>
            <div>
              <p className="text-sm text-white/60">Base Mini App</p>
              <h1 className="text-lg font-semibold tracking-wide">QuestFlow</h1>
            </div>
          </Link>
          <WalletButton />
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <nav className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-full border border-white/10 bg-[#0d1328]/85 p-2 backdrop-blur-xl sm:w-full">
        <div className="grid grid-cols-3 gap-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = activePath === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-center gap-2 rounded-full px-3 py-3 text-sm transition ${
                  active
                    ? "bg-white text-[#0b1020] shadow-pill"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
